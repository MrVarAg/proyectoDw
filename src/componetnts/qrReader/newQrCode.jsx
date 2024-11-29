import { useZxing } from "react-zxing";
import { useState } from "react";

const QRScanner = () => {
  const [qrResult, setQrResult] = useState(null);
  const { ref, error, result } = useZxing({
    onResult: (result) => {
      console.log("QR Result:", result);
      setQrResult(result?.getText()); // Actualiza el estado con el texto del QR
    },
  });

  return (
    <div>
      <h1>Escanear QR</h1>
      <video ref={ref} style={{ width: "100%" }} />
      {error && <p>Error al escanear: {error.message}</p>}
      
      {/* Mostrar el resultado del QR escaneado */}
      {qrResult && (
        <div>
          <h3>Resultado del QR:</h3>
          <p>{qrResult}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
