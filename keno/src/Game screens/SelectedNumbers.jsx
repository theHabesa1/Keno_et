/* eslint-disable react/prop-types */
// SelectedNumbers.js


const SelectedNumbers = ({ numbers }) => {
  return (
    <div className="flex flex-wrap">
      {numbers.map((number, index) => (
        <div key={index} className="px-2 py-1 m-1 bg-red-500 text-white rounded-md">{number}</div>
      ))}
    </div>
  );
};

export default SelectedNumbers;
