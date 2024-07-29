import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isVisible, setIsVisible] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      setIsVisible(!mobileView);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/transactions');
      const sortedTransactions = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(sortedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="mt-4 w-full sm:w-96">
      {isMobile ? (
        <button
          className="bg-green-100 hover:bg-green-600 text-gray-700 font-semibold py-2 px-2 rounded w-full mb-4"
          onClick={toggleVisibility}
        >
          {isVisible ? 'Hide Transactions' : 'Show Transactions'}
        </button>
      ) : (
        <button
          className="bg-green-100 hover:bg-green-600 text-gray-600 font-semibold py-2 px-4 rounded w-full mb-4"
          onClick={toggleVisibility}
        >
          {isVisible ? 'Hide Transactions' : 'Show Transactions'}
        </button>
      )}
      {isVisible && (
        <div className="bg-green-100 rounded-lg shadow-lg p-4 overflow-y-auto h-64">
          <h2 className="text-lg font-semibold mb-2 ">Transactions </h2>
          {transactions.length > 0 ? (
            <ul>
              {transactions.map((transaction, index) => (
                <li key={index} className="mb-2 border-b border-gray-200 pb-2">
                  <div><strong>Phone:</strong> {transaction.phone}</div>
                  <div><strong>Amount:</strong> {transaction.amount}</div>
                  <div>
                    <strong>Processing:</strong>
                    <strong><span className={transaction.responseCode === '0' ? 'text-green-600' : 'text-red-600'}>
                      {transaction.responseCode === '0' ? 'Success' : 'Fail'}
                    </span></strong>
                  </div>
                  <div><strong>Status:</strong> {transaction.status}</div>
                  <div><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No transactions available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Transactions;
