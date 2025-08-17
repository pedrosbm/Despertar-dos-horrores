import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App'

import { AuthProvider } from './context/AuthContext'
import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <CookiesProvider defaultSetOptions={{
        maxAge: 7 * 24 * 60 * 60,
        secure: true
      }}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CookiesProvider>
  </StrictMode >,
)
