import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
//import emailjs from '@emailjs/browser'
import App from './App'
import './styles/global.css'

// Initialise EmailJS once at startup with the public key
//emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
