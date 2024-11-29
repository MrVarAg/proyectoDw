import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import '../qrReader/qrReader.css';

function QrReader() {
    const [scanResult, setScanResult] = useState(null);

    const registrarAsistencia = async (dni, fecha, hora) => {
        try {
            const response = await fetch('http://localhost:3001/asistencia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dniempleado: dni, fecha, hora_entrada: hora }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Asistencia registrada con éxito');
                setScanResult(null); // Limpiar el resultado para permitir nuevos escaneos
            } else {
                alert(`Error al registrar asistencia: ${data.error}`);
            }
        } catch (error) {
            console.error('Error al registrar asistencia:', error);
            alert('Hubo un error al intentar registrar la asistencia.');
        }
    };

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: { width: 250, height: 250 },
            fps: 5,
        });

        const handleSuccess = async (result) => {
            scanner.pause(); // Pausar el escáner para evitar múltiples registros simultáneos
            setScanResult(result);

            // Capturar fecha y hora actual
            const now = new Date();
            const formattedDate = now.toISOString().split('T')[0];
            const utc6Hour = new Date(now.toLocaleString('en-US', { timeZone: 'America/Guatemala' }));
            const formattedTime = utc6Hour.toTimeString().split(' ')[0];

            await registrarAsistencia(result, formattedDate, formattedTime);

            scanner.resume(); // Reanudar el escáner después del registro
        };

        const handleError = (error) => {
            console.warn('QR Error:', error);
        };

        scanner.render(handleSuccess, handleError);

        return () => {
            scanner.clear(); // Limpiar el escáner al desmontar el componente
        };
    }, []);

    return (
        <div className="main-div">
            <h1>Escáner de Códigos QR</h1>
            {scanResult ? (
                <div>
                    <p>Resultado del Escaneo:</p>
                    <a>{scanResult}</a>
                </div>
            ) : (
                <div id="reader"></div>
            )}
        </div>
    );
}

export default QrReader;
