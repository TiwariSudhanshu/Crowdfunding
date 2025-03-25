import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CrowdfundingProvider } from './context/CrowdFundingContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CrowdfundingProvider>
    <App />
    </CrowdfundingProvider>
  </StrictMode>,
)
