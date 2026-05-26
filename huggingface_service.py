"""
Hugging Face Integration Service
Handles AI model prediction for skin disease detection
"""

import os
import requests
import base64
import logging
from typing import Dict, Tuple
from PIL import Image

logger = logging.getLogger(__name__)

class HuggingFacePredictor:
    """
    Sends images to Hugging Face API for medical vision model inference
    - Final prediction engine
    - Confidence scoring
    - Disease detection
    """
    
    def __init__(self):
        self.api_token = os.getenv("HF_API_TOKEN")
        self.model_url = os.getenv("HF_MODEL_URL", 
                                   "https://api-inference.huggingface.co/models/")
        self.headers = {
            "Authorization": f"Bearer {self.api_token}"
        }
        
        # Default medical skin disease detection models
        self.available_models = {
            "dermatology-classifier": "microsoft/resnet-50",
            "medical-vision": "google/vit-base-patch16-224",
            "skin-lesion-classifier": "timbrooks/instruct-pix2pix"
        }
    
    def predict_disease(self, image_path: str, model_name: str = "dermatology-classifier") -> Dict:
        """
        Predict skin disease from image using Hugging Face model
        
        Returns:
            {
                "status": "success",
                "condition": "Acne",
                "confidence": 87.5,
                "predictions": [...],
                "model_used": "model_name"
            }
        """
        try:
            # Read and encode image
            with open(image_path, "rb") as img_file:
                image_data = img_file.read()
            
            # Get model endpoint
            model_id = self.available_models.get(model_name, "microsoft/resnet-50")
            model_endpoint = f"{self.model_url}{model_id}"
            
            logger.info(f"Sending image to Hugging Face model: {model_id}")
            
            # Send to Hugging Face API
            response = requests.post(
                model_endpoint,
                headers=self.headers,
                data=image_data,
                timeout=30
            )
            
            if response.status_code == 200:
                predictions = response.json()
                
                # Process predictions
                processed = self._process_predictions(predictions)
                
                return {
                    "status": "success",
                    "condition": processed["top_condition"],
                    "confidence": processed["top_confidence"],
                    "confidence_percentage": f"{processed['top_confidence']:.1f}%",
                    "all_predictions": predictions,
                    "model_used": model_id,
                    "raw_confidence": processed["top_confidence"]
                }
            
            elif response.status_code == 503:
                # Model loading
                logger.warning("Model is loading, retrying...")
                return {
                    "status": "loading",
                    "message": "Model is loading, please try again in a moment"
                }
            
            else:
                error_msg = response.text
                logger.error(f"Hugging Face API error: {error_msg}")
                return {
                    "status": "error",
                    "message": f"Prediction failed: {error_msg}",
                    "error_code": response.status_code
                }
        
        except requests.exceptions.Timeout:
            logger.error("Hugging Face API timeout")
            return {
                "status": "error",
                "message": "Model inference timeout - please try again"
            }
        
        except FileNotFoundError:
            logger.error("Image file not found")
            return {
                "status": "error",
                "message": "Image file not found"
            }
        
        except Exception as e:
            logger.error(f"Prediction error: {str(e)}")
            return {
                "status": "error",
                "message": f"Prediction failed: {str(e)}"
            }
    
    def _process_predictions(self, raw_predictions: list) -> Dict:
        """
        Process raw Hugging Face predictions
        Extract top prediction and confidence
        """
        try:
            # If predictions is a list of dicts with 'label' and 'score'
            if isinstance(raw_predictions, list) and len(raw_predictions) > 0:
                top_pred = raw_predictions[0]
                
                # Handle different response formats
                if isinstance(top_pred, dict):
                    label = top_pred.get("label", "Unknown")
                    score = float(top_pred.get("score", 0)) * 100
                else:
                    label = "Unknown"
                    score = 0
            else:
                label = "Unknown"
                score = 0
            
            # Clean up label (remove classification prefixes if any)
            condition = self._clean_label(label)
            
            return {
                "top_condition": condition,
                "top_confidence": score,
                "all_predictions": raw_predictions
            }
        
        except Exception as e:
            logger.error(f"Prediction processing error: {str(e)}")
            return {
                "top_condition": "Unknown",
                "top_confidence": 0,
                "all_predictions": []
            }
    
    def _clean_label(self, label: str) -> str:
        """
        Clean up the model output label
        Remove prefixes, standardize naming
        """
        # Remove common prefixes
        label = label.replace("LABEL_", "").replace("ID2LABEL_", "")
        
        # Capitalize properly
        label = label.title()
        
        # Map to standard conditions if needed
        condition_mapping = {
            "Melanoma": "Melanoma",
            "Acne": "Acne",
            "Eczema": "Eczema",
            "Psoriasis": "Psoriasis",
            "Ringworm": "Ringworm (Tinea)",
            "Vitiligo": "Vitiligo",
            "Rosacea": "Rosacea",
            "Dermatitis": "Dermatitis",
            "Normal": "Normal Skin"
        }
        
        return condition_mapping.get(label, label)
    
    def batch_predict(self, image_paths: list) -> Dict:
        """
        Predict multiple images at once
        Useful for batch processing
        """
        results = []
        
        for image_path in image_paths:
            result = self.predict_disease(image_path)
            results.append({
                "image": image_path,
                "prediction": result
            })
        
        return {
            "status": "success",
            "total": len(image_paths),
            "results": results
        }
    
    def get_available_models(self) -> Dict:
        """
        Get list of available models
        """
        return {
            "available_models": self.available_models,
            "note": "Only one model can be used at a time for consistency"
        }


# Create singleton instance
hf_predictor = HuggingFacePredictor()
