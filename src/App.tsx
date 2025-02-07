import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaCamera, FaRegSmile } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './App.css'; // Import custom styles

const App: React.FC = () => {
    const [emotion, setEmotion] = useState<string>('Neutral');
    const [audioStatus, setAudioStatus] = useState<boolean>(false);
    const [videoStatus, setVideoStatus] = useState<boolean>(false);
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        if (videoStatus) {
            startVideoStream();
        } else {
            stopVideoStream();
        }
    }, [videoStatus]);

    const startVideoStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraStream(stream);
            const videoElement = document.getElementById('videoFeed') as HTMLVideoElement;
            if (videoElement) {
                videoElement.srcObject = stream;
            }
        } catch (err) {
            console.error('Failed to access camera', err);
        }
    };

    const stopVideoStream = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach((track) => track.stop());
        }
        setCameraStream(null);
    };

    const handleAudioToggle = () => {
        setAudioStatus(!audioStatus);
        if (!audioStatus) {
            console.log('Audio capture started');
        } else {
            console.log('Audio capture stopped');
        }
    };

    const handleEmotionDetection = () => {
        const emotions = ['Happy', 'Sad', 'Angry', 'Surprised', 'Neutral'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        setEmotion(randomEmotion);
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Audio-Visual Emotion Recognition System</h1>

                {/* Video Feed Section */}
                <div className="video-container">
                    <motion.div className={`video-wrapper ${videoStatus ? 'active' : ''}`}>
                        {videoStatus ? (
                            <video id="videoFeed" autoPlay className="video-feed" />
                        ) : (
                            <div className="no-video">No Video Feed</div>
                        )}
                    </motion.div>
                </div>

                {/* Detected Emotion Display */}
                <div className="emotion-display">
                    <FaRegSmile className="emotion-icon" />
                    <p>Detected Emotion: <span className="emotion-text">{emotion}</span></p>
                </div>

                {/* Action Buttons */}
                <div className="button-group">
                    <button onClick={() => setVideoStatus(!videoStatus)}>
                        <FaCamera className="button-icon" />
                        {videoStatus ? 'Stop Video' : 'Start Video'}
                    </button>

                    <button onClick={handleAudioToggle}>
                        <FaMicrophone className="button-icon" />
                        {audioStatus ? 'Stop Audio' : 'Start Audio'}
                    </button>
                </div>

                <button className="detect-button" onClick={handleEmotionDetection}>
                    Detect Emotion
                </button>
            </div>
        </div>
    );
};

export default App;
