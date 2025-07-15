import React from 'react';

interface CodePanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const TrafficLights: React.FC = () => (
  <div className="flex items-center gap-1.5">
    <div className="w-3 h-3 rounded-full bg-red-500"></div>
    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
    <div className="w-3 h-3 rounded-full bg-green-500"></div>
  </div>
);

const CodePanel: React.FC<CodePanelProps> = ({ title, children, className = '' }) => {
  return (
    // The new, balanced glass styling: A subtle grey tint and softer blur
    <div className={`flex flex-col bg-[oklch(93%_0.01_260/0.05)] backdrop-blur-xl rounded-2xl shadow-glass-edge shadow-black/30 overflow-hidden h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between bg-black/20 px-4 py-2 border-b border-white/5">
        <TrafficLights />
        <p className="text-sm font-medium text-gray-300 font-sans">{title}</p>
        <div className="w-12"></div> {/* Spacer */}
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default CodePanel;