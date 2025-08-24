import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App'

import { AuthProvider } from './context/AuthContext'
import { CookiesProvider } from 'react-cookie'
import { ThemeProvider } from './context/ThemeContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{
        maxAge: 7 * 24 * 60 * 60,
        secure: true
      }}>
        <AuthProvider>
          <ThemeProvider defaultTheme='dark' storageKey='ddh-theme'>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </CookiesProvider>
    </QueryClientProvider>
  </StrictMode >,
)
