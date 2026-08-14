import React from 'react';

export const CVView: React.FC = () => {
  return (
    <div className="relative h-full min-h-[520px] bg-[#001d24]">
      <iframe
        src="/cv.pdf"
        title="Odmandakh Battulga CV"
        className="absolute inset-0 w-full h-full border-0 bg-white"
      />
    </div>
  );
};
