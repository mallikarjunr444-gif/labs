"""
GitHub Disease Database Integration Service
Handles fetching medical guidance from GitHub-hosted JSON files
"""

import os
import requests
import logging
from typing import Dict, Optional
from functools import lru_cache

logger = logging.getLogger(__name__)

class GitHubDiseaseDatabase:
    """
    Fetches disease medical guidance from GitHub
    - Structured medical information
    - Healthcare recommendations
    - Clinical guidance
    """
    
    # Disease database URL from GitHub
    BASE_URL = "https://raw.githubusercontent.com/mallikarjunr444-gif/medicuslabs-disease-db/main/"
    
    # Supported diseases/conditions
    DISEASES = {
        "acne": "acne.json",
        "eczema": "eczema.json",
        "psoriasis": "psoriasis.json",
        "melanoma": "melanoma.json",
        "rosacea": "rosacea.json",
        "dermatitis": "dermatitis.json",
        "ringworm": "ringworm.json",
        "vitiligo": "vitiligo.json"
    }
    
    def __init__(self):
        self.session = requests.Session()
        self.cache_timeout = 3600  # Cache for 1 hour
    
    @lru_cache(maxsize=10)
    def fetch_disease_data(self, disease_name: str) -> Dict:
        """
        Fetch disease guidance from GitHub
        
        Returns:
            {
                "condition": "Acne",
                "severity_levels": [...],
                "symptoms": [...],
                "precautions": [...],
                "medicines": [...],
                "skincare_support": [...],
                "dermatologist_recommendation": "...",
                "home_care": [...]
            }
        """
        try:
            # Normalize disease name
            disease_key = disease_name.lower().strip()
            
            # Check if disease exists in our database
            if disease_key not in self.DISEASES:
                return self._get_default_response(disease_name)
            
            # Construct GitHub URL
            file_name = self.DISEASES[disease_key]
            url = f"{self.BASE_URL}{file_name}"
            
            logger.info(f"Fetching disease data from GitHub: {url}")
            
            # Fetch from GitHub
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                logger.info(f"Successfully fetched {disease_name} data from GitHub")
                
                return {
                    "status": "success",
                    "source": "GitHub Medical Database",
                    "data": data
                }
            else:
                logger.warning(f"Failed to fetch {disease_name} from GitHub (Status: {response.status_code})")
                return self._get_default_response(disease_name)
        
        except requests.exceptions.Timeout:
            logger.error(f"GitHub API timeout for {disease_name}")
            return self._get_timeout_response()
        
        except ValueError as e:
            logger.error(f"Invalid JSON response: {str(e)}")
            return self._get_default_response(disease_name)
        
        except Exception as e:
            logger.error(f"GitHub database fetch error: {str(e)}")
            return self._get_default_response(disease_name)
    
    def _get_default_response(self, disease_name: str) -> Dict:
        """
        Provide default medical guidance if GitHub fetch fails
        """
        default_data = {
            "acne": {
                "condition": "Acne",
                "severity_levels": ["Mild", "Moderate", "Severe"],
                "symptoms": [
                    "Blackheads and whiteheads",
                    "Pimples and pustules",
                    "Red or inflamed skin",
                    "Oily skin",
                    "Skin sensitivity"
                ],
                "precautions": [
                    "Avoid touching affected areas",
                    "Keep skin clean and dry",
                    "Use non-comedogenic products",
                    "Avoid excessive sun exposure",
                    "Manage stress levels",
                    "Don't squeeze or pick at blemishes"
                ],
                "medicines": [
                    "Benzoyl peroxide (topical)",
                    "Salicylic acid (topical)",
                    "Retinoids (topical or oral)",
                    "Antibiotics (topical or oral)",
                    "Hormonal treatments (for severe cases)"
                ],
                "skincare_support": [
                    "Use gentle cleanser twice daily",
                    "Apply acne treatment after cleansing",
                    "Use oil-free moisturizer",
                    "Apply sunscreen (SPF 30+) daily",
                    "Avoid heavy makeup",
                    "Wash makeup brushes regularly"
                ],
                "dermatologist_recommendation": "Recommended if acne is severe, persistent beyond 8 weeks, or causing scarring. A dermatologist can prescribe oral medications if topical treatments aren't effective.",
                "home_care": [
                    "Maintain consistent skincare routine",
                    "Stay hydrated (drink plenty of water)",
                    "Eat balanced diet with zinc-rich foods",
                    "Get adequate sleep",
                    "Exercise regularly",
                    "Manage stress through meditation or yoga"
                ]
            },
            "eczema": {
                "condition": "Eczema",
                "severity_levels": ["Mild", "Moderate", "Severe"],
                "symptoms": [
                    "Intense itching",
                    "Dry, sensitive skin",
                    "Red, inflamed patches",
                    "Cracked skin",
                    "Swelling",
                    "Skin infections (in severe cases)"
                ],
                "precautions": [
                    "Identify and avoid triggers",
                    "Keep skin moisturized",
                    "Use gentle, fragrance-free products",
                    "Avoid extreme temperatures",
                    "Reduce stress",
                    "Prevent skin infections"
                ],
                "medicines": [
                    "Topical corticosteroids",
                    "Topical calcineurin inhibitors",
                    "Antihistamines (for itching)",
                    "Oral corticosteroids (severe cases)",
                    "Biologic medications (severe cases)"
                ],
                "skincare_support": [
                    "Use fragrance-free cleanser",
                    "Apply moisturizer within 3 minutes of bathing",
                    "Take lukewarm (not hot) baths/showers",
                    "Use humidifier during dry seasons",
                    "Apply creams and ointments (not lotions)",
                    "Wear soft, breathable fabrics"
                ],
                "dermatologist_recommendation": "Recommended for diagnosis confirmation and treatment plan. Important for severe cases or if self-care isn't working.",
                "home_care": [
                    "Identify personal triggers (allergens, irritants)",
                    "Maintain consistent skincare routine",
                    "Stay hydrated",
                    "Use probiotics (may help gut health)",
                    "Practice stress-reduction techniques",
                    "Keep nails short to prevent damage from scratching"
                ]
            },
            "psoriasis": {
                "condition": "Psoriasis",
                "severity_levels": ["Mild (< 3% BSA)", "Moderate (3-10% BSA)", "Severe (> 10% BSA)"],
                "symptoms": [
                    "Red, scaly patches",
                    "White or silver scale buildup",
                    "Itching and burning",
                    "Thick, ridged nails",
                    "Joint pain",
                    "Dry skin"
                ],
                "precautions": [
                    "Manage stress and anxiety",
                    "Avoid skin injuries",
                    "Control infections",
                    "Limit alcohol consumption",
                    "Avoid cold weather trigger",
                    "Monitor for complications"
                ],
                "medicines": [
                    "Topical corticosteroids",
                    "Topical vitamin D analogs",
                    "Retinoids (topical)",
                    "Systemic medications (methotrexate, cyclosporine)",
                    "Biologic drugs (TNF inhibitors)",
                    "Phototherapy (UVB, PUVA)"
                ],
                "skincare_support": [
                    "Take warm (not hot) baths",
                    "Use fragrance-free moisturizer daily",
                    "Use scales removal products gently",
                    "Apply treatments before moisturizing",
                    "Protect skin from injury",
                    "Use humidifier"
                ],
                "dermatologist_recommendation": "Strongly recommended. Psoriasis requires professional diagnosis and ongoing monitoring. Treatment plans should be personalized.",
                "home_care": [
                    "Manage stress through meditation/yoga",
                    "Get adequate sun exposure (safe limits)",
                    "Maintain healthy diet and weight",
                    "Exercise regularly",
                    "Avoid smoking and excessive alcohol",
                    "Get sufficient sleep"
                ]
            },
            "melanoma": {
                "condition": "Melanoma",
                "severity_levels": ["Stage 0 (In situ)", "Stage I", "Stage II", "Stage III", "Stage IV"],
                "symptoms": [
                    "Asymmetrical mole",
                    "Irregular borders",
                    "Multiple colors in one lesion",
                    "Diameter > 6mm (pencil eraser size)",
                    "Changing size, shape, or color",
                    "Itching or bleeding"
                ],
                "precautions": [
                    "⚠️ URGENT: Seek dermatologist immediately",
                    "Protect from sun exposure",
                    "Use high SPF sunscreen daily",
                    "Avoid tanning beds",
                    "Perform monthly skin self-checks",
                    "Get annual skin check"
                ],
                "medicines": [
                    "Surgical excision (primary treatment)",
                    "Immunotherapy (pembrolizumab, nivolumab)",
                    "Targeted therapy (BRAF inhibitors)",
                    "Chemotherapy (advanced cases)",
                    "Radiation therapy (for specific cases)"
                ],
                "skincare_support": [
                    "Apply SPF 50+ sunscreen daily",
                    "Wear protective clothing (UV-blocking)",
                    "Use wide-brimmed hat and sunglasses",
                    "Seek shade during peak sun hours (10am-4pm)",
                    "Avoid sun exposure",
                    "Avoid tanning beds"
                ],
                "dermatologist_recommendation": "🚨 URGENT CONSULTATION REQUIRED. Melanoma is a serious form of skin cancer. Professional diagnosis and immediate treatment are critical. Early detection significantly improves outcomes.",
                "home_care": [
                    "Monitor moles monthly (ABCDE rule)",
                    "Take photos of suspicious moles",
                    "Document any changes",
                    "Maintain healthy immune system",
                    "Keep stress levels low",
                    "Get adequate sleep"
                ]
            },
            "rosacea": {
                "condition": "Rosacea",
                "severity_levels": ["Mild", "Moderate", "Severe"],
                "symptoms": [
                    "Facial redness or persistent flushing",
                    "Visible broken blood vessels (telangiectasia)",
                    "Pus-filled bumps resembling acne",
                    "Enlarged, bulbous nose (rhinophyma)",
                    "Eye irritation, dryness, or swollen eyelids"
                ],
                "precautions": [
                    "Avoid spicy foods and hot beverages",
                    "Limit alcohol consumption",
                    "Protect skin from wind and extreme sun",
                    "Use ultra-gentle, fragrance-free products",
                    "Avoid rubbing, scrubbing, or exfoliating facial skin"
                ],
                "medicines": [
                    "Metronidazole (topical gel)",
                    "Azelaic acid (topical cream)",
                    "Brimonidine gel (topical for flushing)",
                    "Doxycycline (oral antibiotic)",
                    "Ivermectin (topical cream)"
                ],
                "skincare_support": [
                    "Use physical/mineral sunscreen (SPF 30+) daily",
                    "Cleanse face gently with lukewarm water",
                    "Apply barrier-repairing moisturizer daily",
                    "Avoid products containing glycolic or salicylic acid"
                ],
                "dermatologist_recommendation": "Highly recommended. A dermatologist can prescribe targeted treatments to manage flares and prevent long-term skin thickening.",
                "home_care": [
                    "Keep a trigger diary to track flare-ups",
                    "Avoid hot showers and steam rooms",
                    "Adopt stress-reduction routines (meditation, breathing)",
                    "Wash pillowcases and linens regularly with gentle soap"
                ]
            },
            "dermatitis": {
                "condition": "Dermatitis",
                "severity_levels": ["Mild", "Moderate", "Severe"],
                "symptoms": [
                    "Itchy, dry, or cracked skin",
                    "Red rash, swelling, or bumps",
                    "Blisters that may ooze and crust over",
                    "Skin flaking, scaling, or thickening",
                    "Stinging, burning, or painful skin patches"
                ],
                "precautions": [
                    "Avoid contact with known allergens, metals, or harsh chemicals",
                    "Moisturize skin immediately after washing",
                    "Wear loose, soft, breathable cotton clothing",
                    "Avoid scratching to prevent secondary bacterial infections"
                ],
                "medicines": [
                    "Topical hydrocortisone or steroid creams",
                    "Antihistamines (oral for itching)",
                    "Topical calcineurin inhibitors (tacrolimus)",
                    "Antibiotic ointments (if skin is cracked and infected)"
                ],
                "skincare_support": [
                    "Wash with hypoallergenic, fragrance-free cleanser",
                    "Use thick ointments or barrier creams containing ceramides",
                    "Apply cool, wet compresses to soothe raw or itchy patches"
                ],
                "dermatologist_recommendation": "Recommended if the rash does not improve after 10-14 days of over-the-counter care, is painful, spreads, or shows signs of yellow crusting.",
                "home_care": [
                    "Use fragrance-free, dye-free laundry detergent",
                    "Limit baths or showers to under 10 minutes using lukewarm water",
                    "Run a home humidifier in dry seasons"
                ]
            },
            "ringworm": {
                "condition": "Ringworm",
                "severity_levels": ["Localized", "Spreading", "Severe/Infected"],
                "symptoms": [
                    "Itchy, circular rash with raised, red edges",
                    "Red, scaly skin inside the ring-shaped pattern",
                    "Bald, scaly patches on scalp (tinea capitis)",
                    "Cracked, peeling skin between toes (athlete's foot)"
                ],
                "precautions": [
                    "Keep the affected skin clean and dry",
                    "Avoid sharing clothing, towels, bedding, or hairbrushes",
                    "Wash athletic gear and sheets daily in hot water",
                    "Have household pets checked if they show signs of hair loss"
                ],
                "medicines": [
                    "Clotrimazole (topical antifungal)",
                    "Miconazole (topical antifungal)",
                    "Terbinafine (topical cream or oral tablets)",
                    "Ketoconazole (topical antifungal shampoo/cream)"
                ],
                "skincare_support": [
                    "Apply antifungal cream 1-2 inches beyond the visible border",
                    "Cleanse gently with mild soap and dry thoroughly",
                    "Use separate towels for the infected body parts"
                ],
                "dermatologist_recommendation": "Recommended if the infection covers a large area, affects the scalp or nails, or fails to clear after 2 weeks of OTC antifungal treatment.",
                "home_care": [
                    "Wash hands thoroughly after touching the affected area",
                    "Wear breathable cotton socks and underwear",
                    "Disinfect showers, bathrooms, and gym equipment regularly"
                ]
            },
            "vitiligo": {
                "condition": "Vitiligo",
                "severity_levels": ["Segmental (localized)", "Non-segmental (generalized)"],
                "symptoms": [
                    "Patchy loss of skin pigment (white patches)",
                    "Premature whitening/greying of scalp hair, eyelashes, or brows",
                    "Loss of color inside tissues lining the mouth and nose"
                ],
                "precautions": [
                    "Protect depigmented areas carefully from sunburn",
                    "Apply high SPF broad-spectrum sunscreen daily",
                    "Avoid skin trauma (cuts, friction, tattoos) to prevent new patches",
                    "Monitor for other autoimmune conditions (e.g., thyroid)"
                ],
                "medicines": [
                    "Topical corticosteroid creams (early stages)",
                    "Topical calcineurin inhibitors (tacrolimus)",
                    "Narrowband UVB phototherapy",
                    "Oral corticosteroids (to slow rapid depigmentation)"
                ],
                "skincare_support": [
                    "Apply broad-spectrum, water-resistant sunscreen daily",
                    "Use cosmetic cover-ups or self-tanners if desired",
                    "Keep skin moisturized to support the barrier"
                ],
                "dermatologist_recommendation": "Recommended to discuss modern repigmentation therapies, narrow-band light options, and slow down active pigment loss.",
                "home_care": [
                    "Connect with vitiligo support networks",
                    "Eat a balanced diet rich in natural antioxidants",
                    "Practice stress management to protect emotional well-being"
                ]
            }
        }
        
        # Get specific disease data or generic response
        disease_lower = disease_name.lower().strip()
        if "ringworm" in disease_lower:
            disease_lower = "ringworm"
        elif "vitiligo" in disease_lower:
            disease_lower = "vitiligo"
        elif "rosacea" in disease_lower:
            disease_lower = "rosacea"
        elif "dermatitis" in disease_lower:
            disease_lower = "dermatitis"
            
        if disease_lower in default_data:
            return {
                "status": "success",
                "source": "Default Medical Database",
                "data": default_data[disease_lower]
            }
        else:
            return {
                "status": "warning",
                "message": f"No specific guidance available for {disease_name}",
                "source": "Generic Response",
                "data": {
                    "condition": disease_name,
                    "severity_levels": ["Mild", "Moderate", "Severe"],
                    "symptoms": ["Consult dermatologist for specific symptoms"],
                    "precautions": ["Seek professional medical consultation"],
                    "medicines": ["Consult dermatologist for treatment options"],
                    "skincare_support": ["Use gentle, fragrance-free products"],
                    "dermatologist_recommendation": "Professional consultation strongly recommended",
                    "home_care": ["Maintain proper hygiene and skincare routine"]
                }
            }
    
    def _get_timeout_response(self) -> Dict:
        """Provide response when GitHub times out"""
        return {
            "status": "warning",
            "message": "GitHub database temporarily unavailable, using default guidance",
            "data": {
                "condition": "Unknown",
                "precautions": ["Consult a dermatologist for professional diagnosis"],
                "skincare_support": ["Use gentle, fragrance-free products"],
                "dermatologist_recommendation": "Professional consultation recommended"
            }
        }
    
    def get_all_diseases(self) -> Dict:
        """Get list of all available diseases"""
        return {
            "available_diseases": list(self.DISEASES.keys()),
            "count": len(self.DISEASES)
        }
    
    def search_disease(self, query: str) -> Dict:
        """Search for disease by name"""
        query_lower = query.lower().strip()
        
        # Exact match
        if query_lower in self.DISEASES:
            return self.fetch_disease_data(query_lower)
        
        # Partial match
        matches = [d for d in self.DISEASES.keys() if query_lower in d]
        
        if matches:
            # Return first match
            return self.fetch_disease_data(matches[0])
        
        # No match found
        return {
            "status": "error",
            "message": f"No disease found matching '{query}'",
            "suggestions": list(self.DISEASES.keys())
        }


# Create singleton instance
github_db = GitHubDiseaseDatabase()
