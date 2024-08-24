import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppProvider } from './context/App.contex.jsx'

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <StrictMode>
      <App />
    </StrictMode>,
  </AppProvider>
)
