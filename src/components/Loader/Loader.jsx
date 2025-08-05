import React from 'react';
import './Loader.scss';

export const Loader = ({ isLoading }) => {
  if (!isLoading) return;

  return (
    <div className="circle-loader-overlay">
      <div className="circle-loader"></div>
    </div>
  );
};
