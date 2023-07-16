import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from "./redux/Store";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Security/Login.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<App />} />
        </Routes>
      </Router>
    </Provider >
  </React.StrictMode>

)
