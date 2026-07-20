import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, RefreshCw, Check, AlertTriangle, Zap, Sun, Focus } from 'lucide-react';

type CameraModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
};

type ScanType = 'face' | 'body';

const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [cameraAvailable, setCameraAvailable] = useState(true);
  const [scanType, setScanType] = useState<ScanType>('face');
  const [lightingQuality, setLightingQuality] = useState<'good' | 'dark' | 'bright' | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const checkLighting = useCallback(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let totalBrightness = 0;
    const pixelCount = data.length / 4;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      totalBrightness += (r + g + b) / 3;
    }
    
    const avgBrightness = totalBrightness / pixelCount;
    
    if (avgBrightness < 80) {
      setLightingQuality('dark');
    } else if (avgBrightness > 200) {
      setLightingQuality('bright');
    } else {
      setLightingQuality('good');
    }
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    setCapturedImage(null);
    setCameraAvailable(true);
    setLightingQuality(null);

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

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        
        // Check lighting after video starts playing
        videoRef.current.onloadedmetadata = () => {
          setTimeout(checkLighting, 500);
        };
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
  }, [facingMode, checkLighting]);

  useEffect(() => {
    if (isOpen && !capturedImage) {
      startCamera();
    }

    return () => {
      stopStream();
    };
  }, [isOpen, facingMode, capturedImage, startCamera, stopStream]);

  useEffect(() => {
    if (!stream || !videoRef.current) return;
    
    const interval = setInterval(checkLighting, 2000);
    return () => clearInterval(interval);
  }, [stream, checkLighting]);

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

    setIsCapturing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      setIsCapturing(false);
      return;
    }

    canvas.width = video.videoWidth || 1920;
    canvas.height = video.videoHeight || 1080;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const imageUrl = URL.createObjectURL(blob);
          setCapturedImage(imageUrl);
          
          const file = new File([blob], 'camera_capture.jpg', { type: 'image/jpeg' });
          (window as any).__cameraFile = file;
        }
        setIsCapturing(false);
      },
      'image/jpeg',
      0.95
    );
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
    stopStream();
    setCapturedImage(null);
    setError(null);
    setCameraAvailable(true);
    setLightingQuality(null);
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

  const getGuideSize = () => {
    if (scanType === 'face') {
      return 'w-72 h-72';
    }
    return 'w-80 h-56';
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/98 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative w-full h-full max-w-6xl mx-auto flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-b from-slate-900/80 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Camera className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Live Camera Capture</h2>
                  <p className="text-xs text-slate-400 font-semibold">
                    {cameraAvailable && !error ? 'Take a high-quality photo of the skin area' : 'Camera unavailable'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-3 rounded-xl hover:bg-slate-800/50 transition text-slate-400 hover:text-white border border-slate-700/50"
                aria-label="Close camera"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Camera Area */}
            <div className="flex-1 relative px-6 pb-6">
              <div className="relative w-full h-full min-h-[400px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/50 shadow-2xl">
                {cameraAvailable && !error ? (
                  <>
                    {/* Live Video */}
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Scan Type Selector */}
                    <div className="absolute top-4 left-4 right-4 flex gap-2">
                      <button
                        onClick={() => setScanType('face')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                          scanType === 'face'
                            ? 'bg-emerald-500 text-white shadow-lg'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
                        }`}
                      >
                        Face Scan
                      </button>
                      <button
                        onClick={() => setScanType('body')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                          scanType === 'body'
                            ? 'bg-emerald-500 text-white shadow-lg'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
                        }`}
                      >
                        Body Scan
                      </button>
                    </div>

                    {/* Lighting Indicator */}
                    {lightingQuality && !capturedImage && (
                      <div className="absolute top-4 left-1/2 -translate-x-1/2">
                        <div className={`px-4 py-2 rounded-lg backdrop-blur-md border flex items-center gap-2 ${
                          lightingQuality === 'good'
                            ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                            : lightingQuality === 'dark'
                            ? 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                            : 'bg-sky-500/20 border-sky-500/30 text-sky-300'
                        }`}>
                          {lightingQuality === 'good' ? (
                            <>
                              <Sun size={16} />
                              <span className="text-xs font-bold">Good Lighting</span>
                            </>
                          ) : lightingQuality === 'dark' ? (
                            <>
                              <AlertTriangle size={16} />
                              <span className="text-xs font-bold">Too Dark - Add Light</span>
                            </>
                          ) : (
                            <>
                              <Sun size={16} />
                              <span className="text-xs font-bold">Too Bright</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Premium Capture Guide */}
                    {!capturedImage && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className={`${getGuideSize()} relative`}>
                          {/* Circular/Rounded Rectangular Guide */}
                          <div className={`absolute inset-0 border-2 border-white/40 rounded-full ${
                            scanType === 'body' ? 'rounded-3xl' : ''
                          }`} />
                          <div className={`absolute inset-2 border border-emerald-400/50 rounded-full ${
                            scanType === 'body' ? 'rounded-3xl' : ''
                          }`} />
                          
                          {/* Animated Corner Markers */}
                          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-emerald-400 rounded-tl-full" />
                          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-emerald-400 rounded-tr-full" />
                          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-emerald-400 rounded-bl-full" />
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-emerald-400 rounded-br-full" />
                          
                          {/* Center Crosshair */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-3 h-3 rounded-full border border-white/60 bg-white/20" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Instructions Overlay */}
                    {!capturedImage && (
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-5 border border-slate-700/50 shadow-xl">
                          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <Focus size={16} className="text-emerald-400" />
                            Positioning Guide
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-400 mt-0.5">•</span>
                              <span>Hold 15-20cm from skin</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-400 mt-0.5">•</span>
                              <span>Ensure good lighting</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-400 mt-0.5">•</span>
                              <span>Keep camera steady</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-400 mt-0.5">•</span>
                              <span>Center lesion in frame</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Captured Image Preview */}
                    {capturedImage && (
                      <div className="absolute inset-0 bg-slate-900/95 flex items-center justify-center">
                        <img src={capturedImage} alt="Captured" className="max-w-full max-h-full object-contain" />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-8 max-w-md">
                      <AlertTriangle className="text-amber-400 mx-auto mb-4" size={56} />
                      <p className="text-white font-bold text-xl mb-2">Camera Unavailable</p>
                      <p className="text-slate-300 text-sm mb-6">{error}</p>
                      <button
                        onClick={handleClose}
                        className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center gap-2 transition mx-auto border border-slate-700"
                      >
                        <Camera size={18} />
                        Upload Instead
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="p-6 bg-gradient-to-t from-slate-900/90 to-transparent">
              {error && !cameraAvailable ? (
                <div className="flex gap-3 max-w-md mx-auto">
                  <button
                    onClick={handleClose}
                    className="flex-1 px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center gap-2 transition border border-slate-700"
                  >
                    <X size={18} />
                    Close
                  </button>
                </div>
              ) : capturedImage ? (
                <div className="flex gap-3 max-w-2xl mx-auto">
                  <button
                    onClick={handleRetake}
                    className="flex-1 px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center gap-2 transition border border-slate-700 shadow-lg"
                  >
                    <RefreshCw size={18} />
                    Retake Photo
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={isCapturing}
                    className="flex-1 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/30"
                  >
                    <Check size={18} />
                    Use Photo
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 max-w-2xl mx-auto items-center">
                  <button
                    onClick={switchCamera}
                    className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white transition border border-slate-700/50 backdrop-blur-sm"
                    aria-label="Switch camera"
                  >
                    <RefreshCw size={20} />
                  </button>
                  <button
                    onClick={handleCapture}
                    disabled={isCapturing}
                    className="flex-1 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white font-bold flex items-center justify-center gap-3 transition shadow-lg shadow-emerald-500/30 text-base"
                  >
                    <Camera size={22} />
                    {isCapturing ? 'Capturing...' : 'Capture Photo'}
                  </button>
                  <button
                    onClick={handleClose}
                    className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white transition border border-slate-700/50 backdrop-blur-sm"
                    aria-label="Cancel"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CameraModal;