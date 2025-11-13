import React from 'react';
import { ValveEvent, ValveStatus } from '../types';

interface EventLogProps {
  events: ValveEvent[];
}

const LogEntry: React.FC<{ event: ValveEvent }> = ({ event }) => {
    const isOnline = event.status === ValveStatus.ON;
    const statusColor = isOnline ? 'text-status-green' : 'text-status-red';
    const statusBgColor = isOnline ? 'bg-status-green/10' : 'bg-status-red/10';

    return (
        <div className="grid grid-cols-4 items-center gap-4 p-3 border-b border-mission-border/50">
            <div className="font-mono text-mission-text-secondary">
                {event.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}.{event.timestamp.getMilliseconds().toString().padStart(3, '0')}
            </div>
            <div className="flex justify-center">
                <span className={`px-3 py-1 text-sm font-bold rounded-full ${statusColor} ${statusBgColor}`}>
                    {event.status}
                </span>
            </div>
             <div className="text-center font-mono text-mission-text-primary">
                {event.duration ?? '--:--:--'}
            </div>
            <div className="text-right text-mission-text-secondary text-sm">
                Fuel Valve State Change
            </div>
        </div>
    );
};


const EventLog: React.FC<EventLogProps> = ({ events }) => {
  return (
    <div className="bg-mission-panel border border-mission-border rounded-lg shadow-lg h-[60vh] lg:h-full flex flex-col">
      <div className="p-4 border-b border-mission-border">
        <h2 className="text-lg font-medium text-mission-text-primary">Telemetry Event Log</h2>
      </div>
       <div className="grid grid-cols-4 gap-4 px-3 py-2 border-b border-mission-border text-sm text-mission-text-secondary font-bold">
            <div>Timestamp</div>
            <div className="text-center">Status</div>
            <div className="text-center">Duration</div>
            <div className="text-right">Event</div>
        </div>
      <div className="flex-grow overflow-y-auto">
        {events.length > 0 ? (
          events.map((event, index) => (
            <LogEntry key={`${event.timestamp.getTime()}-${index}`} event={event} />
          ))
        ) : (
          <div className="p-4 text-center text-mission-text-secondary">Awaiting telemetry data...</div>
        )}
      </div>
    </div>
  );
};

export default EventLog;
