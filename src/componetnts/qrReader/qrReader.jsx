import PropTypes from 'prop-types';
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
                window.location.reload(); // Recargar la página para el próximo usuario
            } else {
                alert(`Error al registrar asistencia: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al intentar registrar la asistencia');
        }
    };

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: { width: 250, height: 250 },
            fps: 5,
        });

        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            setScanResult(result);

            // Capturar fecha y hora actual
            const now = new Date();
            const formattedDate = now.toISOString().split('T')[0];
            const utc6Hour = new Date(now.toLocaleString("en-US", { timeZone: "America/Guatemala" }));
            const formattedTime = utc6Hour.toTimeString().split(' ')[0];
            
            registrarAsistencia(result, formattedDate, formattedTime);
        }

        function error(err) {
            console.warn(err);
        }
    }, []);

    return (
        <div className='main-div'>
            <h1>Escaner de Códigos QR</h1>
            {scanResult
                ? <div>Success: <a>{scanResult}</a></div>
                : <div id="reader"></div>
            }
        </div>
    );
}

QrReader.propTypes = {
    correoUsuario: PropTypes.string.isRequired,
};

export default QrReader;
