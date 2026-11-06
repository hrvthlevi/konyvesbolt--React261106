import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { KonyvProvider } from './contexts/KonyvesBoltContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KonyvProvider>
    <App />
    </KonyvProvider>
  </StrictMode>,
)
