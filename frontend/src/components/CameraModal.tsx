import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, RefreshCw, Check, Image } from 'lucide-react';

type CameraModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
};

const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const initializedRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [cameraAvailable, setCameraAvailable] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      console.log('Stopping camera stream');
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      initializedRef.current = false;
    }
  }, []);

  const startCamera = useCallback(async () => {
    // Prevent multiple calls
    if (initializedRef.current) {
      console.log('Camera already initialized, skipping');
      return;
    }

    console.log('Starting camera...');
    initializedRef.current = true;
    setError(null);
    setCapturedImage(null);
    setCameraAvailable(true);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      };

      console.log('Requesting camera access...');
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = mediaStream;
      console.log('MediaStream created');

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          console.log('Video loaded:', videoRef.current?.videoWidth, 'x', videoRef.current?.videoHeight);
        };
        videoRef.current.onplay = () => {
          console.log('Video playing');
          setVideoPlaying(true);
        };
      }

      console.log('Camera started successfully');
    } catch (err: any) {
      console.error('Camera error:', err);
      initializedRef.current = false; // Allow retry
      setCameraAvailable(false);
      
      if (err.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera access or upload an image.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found. Please upload an image.');
      } else {
        setError('Unable to access camera. Please upload an image.');
      }
    }
  }, [facingMode]);

  // Start camera only when modal opens
  useEffect(() => {
    if (isOpen) {
      console.log('Modal opened, starting camera');
      startCamera();
    }

    return () => {
      // Only cleanup on unmount
      if (!isOpen) {
        console.log('Modal closed, cleaning up');
        stopStream();
      }
    };
  }, [isOpen]); // Only depend on isOpen

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current || isCapturing) return;

    const video = videoRef.current;
    
    console.log('Capture started - Video readyState:', video.readyState, 'Video dimensions:', video.videoWidth, 'x', video.videoHeight, 'Playing:', videoPlaying);

    // Ensure video has loaded a frame and is playing
    if (video.readyState < 2 || !videoPlaying) {
      console.error('Video not ready for capture - readyState:', video.readyState, 'playing:', videoPlaying);
      setError('Camera not ready. Please wait a moment and try again.');
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      console.error('Failed to get canvas context');
      setError('Unable to capture image. Please try again.');
      return;
    }

    const width = video.videoWidth || 1920;
    const height = video.videoHeight || 1080;

    canvas.width = width;
    canvas.height = height;
    
    setIsCapturing(true);

    try {
      // Clear canvas and draw video frame
      context.clearRect(0, 0, width, height);
      context.drawImage(video, 0, 0, width, height);

      // Verify canvas has content
      const imageData = context.getImageData(0, 0, width, height);
      const hasContent = imageData.data.some((value: number, index: number) => index % 4 === 3 && value > 0); // Check alpha channel

      if (!hasContent) {
        console.error('Canvas appears to be empty');
        setIsCapturing(false);
        setError('Unable to capture image. Please try again.');
        return;
      }

      canvas.toBlob(
        (blob: Blob | null) => {
          if (blob && blob.size > 0) {
            console.log('Image successfully created - Blob size:', blob.size);
            const imageUrl = URL.createObjectURL(blob);
            setCapturedImage(imageUrl);
            
            const file = new File([blob], 'camera_capture.jpg', { type: 'image/jpeg' });
            (window as any).__cameraFile = file;
            console.log('Preview set, image URL:', imageUrl);
          } else {
            console.error('Blob creation failed or empty');
            setError('Unable to capture image. Please try again.');
          }
          setIsCapturing(false);
        },
        'image/jpeg',
        0.95
      );
    } catch (err) {
      console.error('Error during capture:', err);
      setIsCapturing(false);
      setError('Unable to capture image. Please try again.');
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    if ((window as any).__cameraFile) {
      URL.revokeObjectURL((window as any).__cameraFile);
      delete (window as any).__cameraFile;
    }
    startCamera();
  };

  const handleConfirm = () => {
    const file = (window as any).__cameraFile;
    if (file) {
      onCapture(file);
    }
    handleClose();
  };

  const handleClose = () => {
    console.log('Closing camera');
    stopStream();
    setCapturedImage(null);
    setError(null);
    setCameraAvailable(true);
    onClose();
  };

  const switchCamera = () => {
    stopStream();
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative w-full h-full flex flex-col">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition backdrop-blur-sm"
              aria-label="Close camera"
            >
              <X size={24} />
            </button>

            {/* Camera Preview */}
            <div className="flex-1 relative bg-black">
              {cameraAvailable && !error ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />

                   {/* Captured Image Preview */}
                   {capturedImage && (
                     <div className="absolute inset-0 bg-black z-10">
                       <img 
                         src={capturedImage} 
                         alt="Captured" 
                         className="w-full h-full object-contain"
                         onLoad={() => console.log('Preview image loaded successfully')}
                         onError={(e) => {
                           console.error('Failed to load preview image', e);
                           setError('Failed to display captured image. Please try again.');
                         }}
                       />
                       <div className="absolute bottom-4 left-0 right-0 text-center">
                         <p className="text-white/60 text-xs font-medium">Preview</p>
                       </div>
                     </div>
                   )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8 max-w-md">
                    <Camera className="text-white/30 mx-auto mb-4" size={56} />
                    <p className="text-white font-bold text-xl mb-2">Camera Unavailable</p>
                    <p className="text-white/70 text-sm mb-6">{error}</p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center gap-2 transition mx-auto backdrop-blur-sm border border-white/20"
                    >
                      <Image size={18} />
                      Upload Instead
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            {cameraAvailable && !error && (
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                {capturedImage ? (
                  /* After Capture Controls */
                  <div className="flex gap-3 max-w-md mx-auto">
                    <button
                      onClick={handleRetake}
                      className="flex-1 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center gap-2 transition backdrop-blur-sm border border-white/20"
                    >
                      <RefreshCw size={20} />
                      Retake
                    </button>
                    <button
                      onClick={handleConfirm}
                      disabled={isCapturing}
                      className="flex-1 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white font-bold flex items-center justify-center gap-2 transition shadow-lg"
                    >
                      <Check size={20} />
                      Use Photo
                    </button>
                  </div>
                ) : (
                  /* Camera Controls */
                  <div className="flex items-center justify-center gap-6 max-w-md mx-auto">
                    {/* Flip Camera Button */}
                    {hasMultipleCameras && (
                      <button
                        onClick={switchCamera}
                        className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition backdrop-blur-sm border border-white/20"
                        aria-label="Switch camera"
                      >
                        <RefreshCw size={24} />
                      </button>
                    )}

                    {/* Capture Button */}
                    <button
                      onClick={handleCapture}
                      disabled={isCapturing}
                      className="p-6 rounded-full bg-white hover:bg-white/90 disabled:bg-white/50 text-black transition shadow-2xl"
                      aria-label="Capture photo"
                    >
                      <Camera size={32} />
                    </button>

                    {/* Gallery Button */}
                    <button
                      onClick={handleClose}
                      className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition backdrop-blur-sm border border-white/20"
                      aria-label="Open gallery"
                    >
                      <Image size={24} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CameraModal;