# Object Detection Web App 🎯

A modern, real-time object detection web application built with React, TypeScript, and TensorFlow.js. This application allows users to detect objects in uploaded images or through live webcam feed using the COCO-SSD model.

![Object Detection Demo](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript) ![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.17.0-FF6F00?logo=tensorflow) ![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite)

## ✨ Features

- **Real-time Object Detection**: Detect objects in live webcam feed with optimized performance
- **Image Upload**: Upload and analyze static images for object detection
- **COCO-SSD Model**: Uses the industry-standard COCO-SSD model with 80+ object classes
- **Confidence Scoring**: Shows detection confidence percentages for each identified object
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **High Performance**: Optimized with WebGL backend for smooth real-time detection
- **Mobile Responsive**: Works seamlessly across desktop and mobile devices

## 🚀 Demo

The application can detect various objects including:
- People, animals, vehicles
- Household items, furniture
- Electronics, sports equipment
- Food items, kitchen utensils
- And many more from the COCO dataset

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

### Machine Learning
- **TensorFlow.js** - Client-side machine learning
- **COCO-SSD Model** - Pre-trained object detection model
- **WebGL Backend** - Hardware-accelerated inference

### UI Components
- **React Webcam** - Camera integration
- **Lucide React** - Modern icon library
- **Custom CSS Animations** - Smooth transitions and gradients

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern web browser with WebGL support

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Devanshu22407/Object-Detection.git
   cd Object-Detection
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the app for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint for code quality |

## 📱 Usage

### Image Detection
1. Click the "Upload Image" button
2. Select an image file from your device
3. View detected objects with bounding boxes and confidence scores
4. See the list of detected objects below the image

### Webcam Detection
1. Click "Start Camera" to begin webcam detection
2. Allow camera permissions when prompted
3. Objects will be detected in real-time with visual indicators
4. Click "Stop Camera" to end the session

### Features in Detail
- **Bounding Boxes**: Visual rectangles around detected objects
- **Labels**: Object names with confidence percentages
- **Real-time Updates**: Live detection updates every 150ms
- **Object List**: Summary of all detected objects
- **Responsive Design**: Works on various screen sizes

## 🎨 UI Components

The application features a modern, gradient-based design with:
- **Glassmorphism Effects**: Semi-transparent cards with backdrop blur
- **Smooth Animations**: CSS transitions and hover effects
- **Gradient Text**: Eye-catching gradient text effects
- **Professional Icons**: Lucide React icons throughout
- **Mobile-First Design**: Responsive layout for all devices

## ⚙️ Configuration

### Model Configuration
The COCO-SSD model is configured with:
- **Base Model**: MobileNet v2 for optimal performance
- **Detection Threshold**: 0.4 confidence minimum
- **Max Detections**: Up to 30 objects per frame
- **Backend**: WebGL for hardware acceleration

### Performance Optimization
- Model preloading for faster initialization
- Tensor memory management to prevent leaks
- Optimized detection intervals for smooth performance
- Image preprocessing for better accuracy

## 🧪 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ✅ Full support |
| Edge | ✅ Full support |

**Requirements**: WebGL support and camera permissions for webcam features

## 📁 Project Structure

```
Object-Detection/
├── public/                 # Static assets
├── src/
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   ├── index.css          # Global styles and Tailwind
│   └── vite-env.d.ts      # Vite type definitions
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## 🤖 Model Information

**COCO-SSD (Common Objects in Context - Single Shot Detector)**
- Pre-trained on the COCO dataset
- Capable of detecting 80 different object classes
- Optimized for real-time inference
- Balance between accuracy and speed

### Detectable Object Classes
The model can detect objects including but not limited to:
- **People**: person
- **Vehicles**: car, motorcycle, airplane, bus, train, truck, boat
- **Animals**: bird, cat, dog, horse, sheep, cow, elephant, bear, zebra, giraffe
- **Household**: chair, couch, potted plant, bed, dining table, toilet, tv, laptop, mouse, remote, keyboard, cell phone
- **Food**: banana, apple, sandwich, orange, broccoli, carrot, hot dog, pizza, donut, cake
- **Sports**: frisbee, skis, snowboard, sports ball, kite, baseball bat, baseball glove, skateboard, surfboard, tennis racket

## 🔄 Development Workflow

1. **Development**: Use `npm run dev` for hot-reload development
2. **Code Quality**: Run `npm run lint` to check code quality
3. **Building**: Use `npm run build` for production builds
4. **Testing**: Preview builds with `npm run preview`

## 🐛 Troubleshooting

### Common Issues

**Model Loading Errors**
- Ensure stable internet connection for model download
- Check browser console for specific error messages
- Verify WebGL support in your browser

**Camera Not Working**
- Check camera permissions in browser settings
- Ensure camera is not being used by another application
- Try refreshing the page and granting permissions again

**Performance Issues**
- Close other resource-intensive browser tabs
- Ensure your device supports WebGL acceleration
- Try reducing detection frequency by modifying the interval

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **TensorFlow.js Team** - For the excellent machine learning framework
- **Google Research** - For the COCO-SSD model
- **React Team** - For the amazing React framework
- **Vercel Team** - For the fantastic Vite build tool

## 📧 Contact

**Devanshu Panchal** - [GitHub Profile](https://github.com/Devanshu22407)

Project Link: [https://github.com/Devanshu22407/Object-Detection](https://github.com/Devanshu22407/Object-Detection)

---

⭐ If you found this project helpful, please give it a star on GitHub!