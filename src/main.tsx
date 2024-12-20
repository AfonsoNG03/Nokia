import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/Main.css'
import App from './components/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
