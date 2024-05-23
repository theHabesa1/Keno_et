/* eslint-disable react/prop-types */
// NumberBox.js


const NumberBox = ({ number, selected }) => {
  return (
    <div className={`w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center m-1 ${selected ? 'bg-red-500 text-white' : 'bg-white text-gray-700'}`}>
      {number}
    </div>
  );
};

export default NumberBox;
