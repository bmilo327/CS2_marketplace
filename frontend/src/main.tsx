import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TermekProvider } from './contexts/TermekContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TermekProvider>
    <App />
    </TermekProvider>
  </StrictMode>,
)
