import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { TermekProvider } from './contexts/TermekContext.tsx'

import './marketplace.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TermekProvider>
    <App />
    </TermekProvider>
  </StrictMode>,
)
