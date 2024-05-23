/* eslint-disable react/prop-types */
// BettingOptions.js
import  { useState } from 'react';

const BettingOptions = ({ onSubmitBet }) => {
  const [numSpots, setNumSpots] = useState(1);
  const [betAmount, setBetAmount] = useState(1);
  const [numRounds, setNumRounds] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitBet({ numSpots, betAmount, numRounds });
  };

  return (
    <div>
      <h2>Betting Options:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Spots:
          <input
            type="number"
            min="1"
            max="10"
            value={numSpots}
            onChange={(e) => setNumSpots(parseInt(e.target.value))}
          />
        </label>
        <label>
          Bet Amount:
          <input
            type="number"
            min="1"
            value={betAmount}
            onChange={(e) => setBetAmount(parseInt(e.target.value))}
          />
        </label>
        <label>
          Number of Rounds:
          <input
            type="number"
            min="1"
            value={numRounds}
            onChange={(e) => setNumRounds(parseInt(e.target.value))}
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white font-bold px-4 py-2 rounded">
          Place Bet
        </button>
      </form>
    </div>
  );
};

export default BettingOptions;
