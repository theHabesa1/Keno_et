/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

const AnimatedNumbers = ({ selectedNumbers }) => {
  const [currentNumber, setCurrentNumber] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * selectedNumbers.length);
      setCurrentNumber(selectedNumbers[randomIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedNumbers]);

  return (
    <div className="flex items-center justify-center h-full">
      <Transition
        show={currentNumber !== null}
        enter="transform transition-all duration-500"
        enterFrom="opacity-0 scale-0"
        enterTo="opacity-100 scale-100"
        leave="transform transition-all duration-500"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-0"
      >
        <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center shadow-md">
          <span className="text-xl font-bold">{currentNumber}</span>
        </div>
      </Transition>
    </div>
  );
};

export default AnimatedNumbers;
