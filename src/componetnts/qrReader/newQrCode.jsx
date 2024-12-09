import React, { useRef, useEffect, useState } from 'react';
import jsQR from 'jsqr';
import { Box, Typography, Container } from '@mui/material';

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
          setQrCodeData('No QR code detected.');
        }
      }
      requestAnimationFrame(tick);
    };

    startVideo();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          QR Code Reader
        </Typography>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
            height: '300px',
            border: '2px solid black',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <video ref={videoRef} style={{ width: '100%', height: '100%' }}></video>
          <canvas ref={canvasRef} hidden></canvas>
        </Box>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {qrCodeData}
        </Typography>
      </Box>
    </Container>
  );
};

export default QRReader;