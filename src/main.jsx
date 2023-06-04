import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Auth0Provider} from '@auth0/auth0-react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-a88lagl5jzszgnna.us.auth0.com"
      clientId="Qk6GQfAAsURUwzZZkVYotGMgofr6HSNP"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-a88lagl5jzszgnna.us.auth0.com/api/v2/"
      }}
    >
      <App />
    </Auth0Provider> 
  </React.StrictMode>,
)
