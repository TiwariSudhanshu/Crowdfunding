import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CrowdfundingProvider } from './context/CrowdFundingContext.jsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CrowdfundingProvider>
    <App />
    </CrowdfundingProvider>
    <ToastContainer position="top-right" autoClose={3000} />
  </StrictMode>,
)
