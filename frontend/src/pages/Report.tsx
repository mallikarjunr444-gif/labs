import React from 'react';
import { useParams } from 'react-router-dom';

const Report = () => {
  const { id } = useParams();

  // Fetch report data based on id

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center my-4">Report {id}</h2>
      {/* Display report details */}
    </div>
  );
};

export default Report;
