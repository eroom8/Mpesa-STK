import { useState } from 'react'


import './App.css'

function App() {
  const [phone, setPhone] = useState();
  const [amount, setAmount] = useState();

  const payHandler = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:5000/token", {
      amount,
      phone,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
       console.log(error);
      });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
    <form className="bg-green-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80" >
    <div className="flex items  ">
    <h2 class="text-2xl text-green-800 font-bold mb-4 text-center">MPESA-Pay </h2>
    <img class="rounded-full w-18 h-12 " src="./mpesa-icon.png" alt="image description"></img>
    </div>

      <div className="mb-4">

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Phone
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phone"
          type="tel"
          placeholder="0712345678"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
          Amount 
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="amount"
          type="number"
          placeholder="Amount (KSH)"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button" onClick={payHandler}>Pay</button>
          
      </div>
    </form>
  </div>
    </>
  )
}

export default App
