import React, { useRef, useEffect, useState } from 'react';
import jsQR from 'jsqr';

const QRReader = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrCodeData, setQrCodeData] = useState('');

  useEffect(() => {
    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
            videoRef.current.play();
            requestAnimationFrame(tick);
          }
        })
        .catch(err => console.error('Error accessing camera: ', err));
    };

    const tick = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = videoRef.current.videoHeight;
        canvas.width = videoRef.current.videoWidth;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code) {
          setQrCodeData(code.data);
        } else {
          setQrCodeData('QR no detectado');
        }
      }
      requestAnimationFrame(tick);
    };

    startVideo();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px', display:'flex',
      flexDirection:'column', justifyContent:'center', alignItems:'center'

    }}>
      <h1 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '20px' }}>Acerque el codigo QR</h1>
      <video ref={videoRef} width="auto" height="auto" style={{ border: '2px solid #00796b', borderRadius: '8px', marginBottom: '10px' }}></video>
      <canvas ref={canvasRef} hidden></canvas>
      <p style={{ fontSize: '1rem', color: '#555' }}>{qrCodeData}</p>
    </div>
  );
};

export default QRReader;
