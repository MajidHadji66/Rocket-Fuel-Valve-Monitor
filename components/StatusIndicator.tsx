
import React from 'react';
import { ValveStatus } from '../types';

interface StatusIndicatorProps {
  status: ValveStatus;
  timestamp: Date | undefined;
  duration: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, timestamp, duration }) => {
  const isOnline = status === ValveStatus.ON;

  const indicatorClasses = isOnline 
    ? 'bg-status-green/20 border-status-green animate-pulse-strong' 
    : 'bg-status-red/20 border-status-red';
    
  const textClasses = isOnline ? 'text-status-green' : 'text-status-red';

  return (
    <div className="bg-mission-panel border border-mission-border rounded-lg p-6 shadow-lg h-full flex flex-col justify-center items-center">
      <h2 className="text-lg font-medium text-mission-text-secondary mb-4">Current Valve Status</h2>
      <div className={`w-40 h-40 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${indicatorClasses}`}>
        <span className={`text-4xl font-bold transition-colors duration-300 ${textClasses}`}>
          {status}
        </span>
      </div>
      <div className="mt-6 w-full grid grid-cols-2 gap-4">
        <div className="text-center">
            <p className="font-mono text-xs text-mission-text-secondary">Last Update</p>
            <p className="font-mono text-lg text-mission-text-primary">
            {timestamp ? timestamp.toLocaleTimeString() : 'N/A'}
            </p>
        </div>
        <div className="text-center">
            <p className="font-mono text-xs text-mission-text-secondary">Duration</p>
            <p className="font-mono text-lg text-mission-text-primary">
            {duration}
            </p>
        </div>
      </div>
    </div>
  );
};

export default StatusIndicator;
