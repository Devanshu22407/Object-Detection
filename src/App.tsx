import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { Camera, Upload, Eye, Loader2 } from 'lucide-react';

function App() {
  const [model, setModel] = useState<cocossd.ObjectDetection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWebcam, setIsWebcam] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState<string[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const detectInterval = useRef<number>();

  // Load model on component mount
  useEffect(() => {
    const initModel = async () => {
      try {
        await tf.ready();
        await tf.setBackend('webgl'); // Force WebGL backend for better performance
        
        // Load the model with enhanced configuration
        const loadedModel = await cocossd.load({
          base: 'mobilenet_v2',
          modelUrl: 'https://storage.googleapis.com/tfjs-models/savedmodel/ssdlite_mobilenet_v2/model.json'
        });
        
        setModel(loadedModel);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading model:', error);
        setIsLoading(false);
      }
    };

    initModel();

    return () => {
      if (detectInterval.current) {
        clearInterval(detectInterval.current);
      }
    };
  }, []);

  const preprocessImage = (imageElement: HTMLImageElement | HTMLVideoElement) => {
    // Convert image to tensor and normalize
    const tensor = tf.browser.fromPixels(imageElement)
      .expandDims(0)
      .toFloat()
      .div(255.0);
    return tensor;
  };

  const detectObjects = async (imageElement: HTMLImageElement | HTMLVideoElement) => {
    if (!model || !canvasRef.current) return;

    try {
      // Preprocess the image
      const tensor = preprocessImage(imageElement);
      
      // Run detection with increased maxNumBoxes and minimum score threshold
      const predictions = await model.detect(imageElement, 30, 0.4);
      
      // Cleanup tensor
      tensor.dispose();

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size to match image/video
      canvas.width = imageElement.width || imageElement.videoWidth || 640;
      canvas.height = imageElement.height || imageElement.videoHeight || 480;

      // Clear previous drawings
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the image/video
      ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

      // Filter predictions by confidence and update detected objects list
      const filteredPredictions = predictions.filter(pred => pred.score > 0.4);
      const objects = filteredPredictions.map(pred => pred.class);
      setDetectedObjects([...new Set(objects)]);

      // Draw detections with enhanced visualization
      filteredPredictions.forEach(prediction => {
        const [x, y, width, height] = prediction.bbox;
        const label = `${prediction.class} ${Math.round(prediction.score * 100)}%`;
        
        // Create gradient for box border
        const gradient = ctx.createLinearGradient(x, y, x + width, y);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#8b5cf6');
        
        // Draw box with gradient border
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Draw label background with gradient
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        const textWidth = ctx.measureText(label).width;
        const labelHeight = 32;
        ctx.fillRect(x, y - labelHeight, textWidth + 16, labelHeight);

        // Draw label text with enhanced styling
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Inter';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x + 8, y - labelHeight/2);
      });
    } catch (error) {
      console.error('Detection error:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsWebcam(false);
    if (detectInterval.current) {
      clearInterval(detectInterval.current);
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (imageRef.current) {
        imageRef.current.src = img.src;
        detectObjects(img);
      }
    };
  };

  // Handle webcam detection with improved timing
  useEffect(() => {
    if (isWebcam && webcamRef.current?.video) {
      if (detectInterval.current) {
        clearInterval(detectInterval.current);
      }

      detectInterval.current = window.setInterval(() => {
        const video = webcamRef.current?.video;
        if (video && video.readyState === 4) {
          detectObjects(video);
        }
      }, 150) as unknown as number; // Slightly increased interval for more stable detection
    } else {
      if (detectInterval.current) {
        clearInterval(detectInterval.current);
      }
    }

    return () => {
      if (detectInterval.current) {
        clearInterval(detectInterval.current);
      }
    };
  }, [isWebcam]);

  const toggleWebcam = () => {
    setIsWebcam(prev => !prev);
    setDetectedObjects([]);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Eye className="w-8 h-8 text-blue-600" />
            <h1 className="text-5xl font-bold gradient-text">
              Object Detection
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload an image or use your camera to detect objects in real-time.
          </p>
        </header>

        {/* Main Content */}
        <div className="card rounded-3xl p-8 transition-all duration-500">
          {isLoading ? (
            <div className="text-center py-16">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-lg text-gray-600">Loading detection model...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <label className="btn flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 transition-colors">
                  <Upload className="w-5 h-5" />
                  Upload Image
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                <button
                  onClick={toggleWebcam}
                  className="btn flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  {isWebcam ? 'Stop Camera' : 'Start Camera'}
                </button>
              </div>

              {/* Display Area */}
              <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                {isWebcam ? (
                  <>
                    <Webcam
                      ref={webcamRef}
                      className="absolute top-0 left-0 w-full h-full object-contain"
                      mirrored
                      screenshotFormat="image/jpeg"
                      videoConstraints={{
                        width: 1280,
                        height: 720,
                        facingMode: "user",
                        aspectRatio: 16/9
                      }}
                    />
                    <canvas
                      ref={canvasRef}
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </>
                ) : (
                  <>
                    <img
                      ref={imageRef}
                      className="absolute top-0 left-0 w-full h-full object-contain"
                      alt="Uploaded"
                      style={{ display: 'none' }}
                    />
                    <canvas
                      ref={canvasRef}
                      className="w-full h-full object-contain"
                    />
                  </>
                )}
              </div>

              {/* Detected Objects List */}
              {detectedObjects.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-lg font-semibold mb-2">Detected Objects:</h3>
                  <div className="flex flex-wrap gap-2">
                    {detectedObjects.map((object, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {object}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12">
          <p className="text-gray-600">
            Powered by TensorFlow.js and COCO-SSD model
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;