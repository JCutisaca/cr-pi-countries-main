import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './components/Redux/store.js'
import axios from 'axios'
const SV_DEPLOY = import.meta.env.SV_DEPLOY;

// axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.baseURL = SV_DEPLOY

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
