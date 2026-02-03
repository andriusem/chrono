import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// To run the archived modern UI locally, swap the import to:
// import App from './archived/modern/App.modern'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
