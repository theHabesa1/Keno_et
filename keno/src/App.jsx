/* eslint-disable no-unused-vars */
// App.js
import { useState, useEffect } from "react";
import NumberBox from "./Game screens/NumberBox";
import Card from "./Game screens/card";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const App = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [isSelectionInProgress, setIsSelectionInProgress] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isCountdownRunning, setIsCountdownRunning] = useState(true);
  const [drawNumber, setDrawNumber] = useState(0);

  useEffect(() => {
    const selectNumbersOneByOne = async () => {
      setIsSelectionInProgress(true);
      for (let i = 0; i < 10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay between selections
        const randomNumber = generateRandomNumber();
        setSelectedNumbers((prevNumbers) => [...prevNumbers, randomNumber]);
      }

      setIsSelectionInProgress(false);
    };

    if (isSelectionInProgress) {
      selectNumbersOneByOne();
    }
  }, [isSelectionInProgress]);

  const generateRandomNumber = () => {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 80) + 1;
    } while (selectedNumbers.includes(randomNumber));
    return randomNumber;
  };

  const startNumberSelection = () => {
    setSelectedNumbers([]);
    setIsSelectionInProgress(true);
    setDrawNumber((prevDrawNumber) => prevDrawNumber + 1);
  };

  useEffect(() => {
    const countdownLoop = () => {
      // Wait for the current countdown to finish
      setTimeout(() => {
        // Restart the selection process
        setSelectedNumbers([]);
        setIsSelectionInProgress(true);
        // Start a new countdown loop after 10 minutes
        setTimeout(countdownLoop, 10 * 60 * 1000);
      }, 10 * 60 * 1000); // Wait for 10 minutes before restarting
    };

    // Start the initial countdown loop
    countdownLoop();

    return () => setIsCountdownRunning(false); // Clean up on unmount
  }, []);

  return (
    <div className="container mx-auto mt-10 ">
      <div className="countdown-timers flex justify-center mt-8">
        <div className="mr-8">
          {/* <h2 className="text-2xl font-bold">Time Until Draw</h2> */}
          <CountdownCircleTimer
            isPlaying
            duration={10}
            onComplete={() => {
              startNumberSelection();
              return { shouldRepeat: true, delay: 130 };
            }}
            colors={["#ef4444", "#ef4444", "#ef4444", "#ef4444"]}
            colorsTime={[7, 5, 2, 0]}
            size={150}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
      </div>
      <div className="draw-number-card bg-red-500 text-white p-4 rounded-lg absolute top-0 left-0 mt-4 ml-4">
        <h2 className="text-2xl font-bold">Draw Number</h2>
        <p className="text-4xl font-bold">
          {String(drawNumber).padStart(4, "0")}
        </p>
      </div>
      <div className="flex justify-between">
        <div>
        <button className="bg-red-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed mr-6">
            Evens
          </button>
          {/* <h1 className="text-3xl font-bold mb-4">Keno Game</h1> */}
          <div className="grid grid-cols-10 gap-2 mt-7">
            {[...Array(80).keys()].map((number) => (
              <NumberBox
                key={number}
                number={number + 1}
                selected={selectedNumbers.includes(number + 1)}
              />
            ))}
          </div>
        </div>
  
          
        <div>
          <Card selectedNumbers={selectedNumbers} remainingTime={timeLeft} />
        </div>
      </div>

      {/* <div className="keno-header-card bg-yellow-500 text-red-500 p-4 rounded-lg mt-4 text-lg font-bold">
        <div className="animate-blink">KENO</div>
      </div> */}
    </div>
  );
};

export default App;
