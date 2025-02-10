import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Dataprovider } from './context/DataContext.jsx'
import { AuthProvider } from './context/useAuth.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Dataprovider>
    
      <App />
      </Dataprovider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
