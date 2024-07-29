import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import Profile from './profile';
import './App.css';
import Transactions from './Transactions';

function App() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')) || null);
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('authenticated'));

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setUser(codeResponse);
      localStorage.setItem('user', JSON.stringify(codeResponse));
      setAuthenticated(true);
      localStorage.setItem('authenticated', true);

      try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
            Accept: 'application/json'
          }
        });
        setProfile(res.data);
        localStorage.setItem('profile', JSON.stringify(res.data));

        // Save user details to the backend
        await axios.post('http://localhost:5000/api/saveUser', {
          googleId: res.data.id,
          name: res.data.name,
          email: res.data.email,
          picture: res.data.picture,
        });
      } catch (err) {
        console.log(err);
      }
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
    setAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    localStorage.removeItem('authenticated');
  };


  
  const payHandler = async (e) => {
    e.preventDefault();
    const formData = {
      phone: phone.substring(1),
      amount,
    };

    try {
      const res = await toast.promise(
        axios.post('http://localhost:5000/stk', formData),
        {
          pending: 'Payment is processing',
          success: 'complete stk  👌',
          error: 'Payment failed 🤯',
        }
      );

      if (res && res.data.CustomerMessage) {
        toast.success(res.data.CustomerMessage);
      } else if (res && res.data.ResponseDescription) {
        toast.success(res.data.ResponseDescription);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPhone('');
      setAmount('');
    }
  };

  return (
    <>
      {authenticated ? (
        <>
          <div className="fixed top-0 right-0 p-4 flex flex-col items-end flex items-center">
            <Profile profileDetails={profile} logout={logOut} />

            <Transactions 
             
            />
          </div>

          <div className="flex flex-col items-center justify-center h-screen">
            <form className="bg-green-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 h-auto">
              <div className="flex items">
                <h2 className="text-2xl text-green-800 font-bold mb-4 text-center">
                  MPESA-Pay
                </h2>
                <img
                  className="rounded-full w-18 h-12"
                  src="./mpesa-icon.png"
                  alt="M-PESA Icon"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="tel"
                  placeholder="0712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="amount"
                >
                  Amount
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="amount"
                  type="number"
                  placeholder="Amount (KSH)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={payHandler}
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
          <ToastContainer position="top-center" draggable="true" closeButton="<p>close<p>" />
         
        </>
      ) : (
        <div className="bg-green-100 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-3xl mb-4">🤩</div>
          <h4 className="text-lg font-semibold mb-4">Sign in to access the STK!</h4>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            onClick={login}
          >
            ⚡ Sign in with Google
          </button>
        </div>
      </div>
      )}
    </>
  );
}

export default App;


