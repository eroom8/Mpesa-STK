import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from './App.jsx';
import './index.css';

ReactDOM.render(
  <GoogleOAuthProvider clientId='98373471917-3arv9vemu48qdtqa1vu570os3pqaq68v.apps.googleusercontent.com'>
    <React.StrictMode>
      <div className="bg-green-300">
        <App />
      </div>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
