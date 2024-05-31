import React from 'react';

interface MagicButtonProps {
  title: string;
  isLoading?: boolean; // Set isLoading as optional boolean type
  onClick?: () => void; // Define onClick function type
}

const MagicButton: React.FC<MagicButtonProps> = ({ title, isLoading = false, onClick }) => {
  return (
    <button
      className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none"
      disabled={isLoading}
      onClick={onClick}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl">
        {isLoading ? <div className="loader1"></div> : title}
      </span>
    </button>
  );
};

export default MagicButton;
