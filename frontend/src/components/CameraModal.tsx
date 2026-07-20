import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, RefreshCw, Check, AlertTriangle, Upload } from 'lucide-react';

type CameraModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
};

const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [cameraAvailable, setCameraAvailable] = useState(true);

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const startCamera = useCallback(async () => {
    setError(null);
    setCapturedImage(null);
    setCameraAvailable(true);

    try {
      // Check if mediaDevices API is available
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

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      setCameraAvailable(false);
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Camera access was denied. Please allow camera access in your browser settings or upload an image from your device.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('No camera found on this device. Please upload an image from your device.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setError('Camera is in use by another application or not readable.');
      } else {
        setError('Unable to access camera. Please upload an image from your device.');
      }
    }
  }, [facingMode]);

  useEffect(() => {
    if (isOpen && !capturedImage) {
      startCamera();
    }

    return () => {
      stopStream();
    };
  }, [isOpen, facingMode, capturedImage, startCamera, stopStream]);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const imageUrl = URL.createObjectURL(blob);
          setCapturedImage(imageUrl);

          // Create a File object
          const file = new File([blob], 'camera_capture.jpg', { type: 'image/jpeg' });
          
          // Store the file temporarily
          (window as any).__cameraFile = file;
        }
      },
      'image/jpeg',
      0.95
    );
  };

  const handleRetake = () => {
    setCapturedImage(null);
    if ((window as any).__cameraFile) {
      URL.revokeObjectURL((window as any).__cameraFile.imageUrl);
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
    // Cleanup on unmount
    return () => {
      stopStream();
    };
  }, [stopStream]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <Camera className="text-sky-400" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-white">Live Camera Capture</h2>
                  <p className="text-xs text-slate-400 font-semibold">Take a high-quality photo of the skin area</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-xl hover:bg-slate-800 transition text-slate-400 hover:text-white"
                aria-label="Close camera"
              >
                <X size={24} />
              </button>
            </div>

            {/* Camera View */}
            <div className="relative aspect-video bg-slate-950">
              {cameraAvailable && !error ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Capture overlay guides */}
                  {!capturedImage && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Focus frame */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white/40 rounded-full" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-sky-400/30 rounded-full" />
                      
                      {/* Corner brackets */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative w-64 h-64">
                          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-sky-400" />
                          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-sky-400" />
                          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-sky-400" />
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-sky-400" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Captured Image Preview */}
                  {capturedImage && (
                    <div className="absolute inset-0">
                      <img src={capturedImage} alt="Captured" className="w-full h-full object-contain" />
                      <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 text-center border border-slate-700">
                          <Check className="text-emerald-400 mx-auto mb-3" size={48} />
                          <p className="text-white font-bold text-lg mb-1">Photo Captured</p>
                          <p className="text-slate-300 text-sm">Review your image below</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <AlertTriangle className="text-amber-400 mx-auto mb-4" size={48} />
                    <p className="text-white font-bold text-lg mb-2">Camera Unavailable</p>
                    <p className="text-slate-300 text-sm max-w-md">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="p-6 border-t border-slate-700 bg-slate-900">
              {error && !cameraAvailable ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="flex-1 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center gap-2 transition border border-slate-700"
                  >
                    <Upload className="mr-2" size={18} />
                    Upload Instead
                  </button>
                </div>
              ) : capturedImage ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleRetake}
                    className="flex-1 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center gap-2 transition border border-slate-700"
                  >
                    <RefreshCw size={18} />
                    Retake Photo
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
                  >
                    <Check size={18} />
                    Confirm & Continue
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={switchCamera}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center gap-2 transition border border-slate-700"
                    aria-label="Switch camera"
                  >
                    <RefreshCw size={18} />
                    Flip Camera
                  </button>
                  <button
                    onClick={handleCapture}
                    className="flex-1 px-6 py-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-sky-500/20"
                  >
                    <Camera size={18} />
                    Capture Photo
                  </button>
                </div>
              )}
            </div>

            {/* Close button */}
            {!error && (
              <button
                onClick={handleClose}
                className="absolute top-20 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition z-10"
                aria-label="Close camera"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CameraModal;