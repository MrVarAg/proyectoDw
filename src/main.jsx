import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './componetnts/qrReader/qrReader'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
