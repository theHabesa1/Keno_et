/* eslint-disable react/prop-types */
// Card.js
import { useState, useEffect } from 'react';
import './card.css';

const Card = ({ selectedNumbers, remainingTime }) => {
  const [progress, setProgress] = useState(0);
  const [isDelayInProgress, setIsDelayInProgress] = useState(false);

  useEffect(() => {
    if (isDelayInProgress) {
      setProgress(0);
      const progressInterval = setInterval(() => {
        setProgress(prevProgress => prevProgress + (100 / remainingTime));
      }, 1000);
      return () => clearInterval(progressInterval);
    }
  }, [isDelayInProgress, remainingTime]);

  useEffect(() => {
    setIsDelayInProgress(selectedNumbers.length > 0);
  }, [selectedNumbers]);

  return (
    <div className="card-container">
      <div className="bg-white shadow-md rounded overflow-hidden mb-4 card-body">
        <div className="px-4 py-6">
          <p className="text-lg font-bold">Selected Numbers</p>
          <div className="flex flex-wrap" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {selectedNumbers.map((number, index) => (
              <div key={index} className="selected-number">{number}</div>
            ))}
          </div>
        </div>
        <div className="bg-gray-200 h-2 mb-0 rounded-full">
          <div className="bg-red-500 h-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
