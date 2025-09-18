import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = ({ loading = true, color = '#3498db', size = 50 }) => {
  return (
    <div className="flex justify-center items-center w-full h-full py-20">
      <ClipLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default Spinner;