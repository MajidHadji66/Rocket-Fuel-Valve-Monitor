import React, { useState, useEffect } from 'react';
import { ValveStatus, ValveEvent } from './types';
import Header from './components/Header';
import StatusIndicator from './components/StatusIndicator';
import EventLog from './components/EventLog';
import WeatherDisplay from './components/WeatherDisplay';

const formatDuration = (ms: number): string => {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const App: React.FC = () => {
  const [events, setEvents] = useState<ValveEvent[]>([]);
  const [duration, setDuration] = useState<string>('00:00:00');

  // Effect for simulating new valve events
  useEffect(() => {
    // Start with a single, initial event
    const initialEvent: ValveEvent = {
      status: ValveStatus.OFF,
      timestamp: new Date(),
    };
    setEvents([initialEvent]);

    const interval = setInterval(() => {
      // Determine a new potential status
      const newPotentialStatus = Math.random() > 0.6 ? ValveStatus.ON : ValveStatus.OFF;
      
      setEvents(prevEvents => {
        // Get the current actual status from the latest event
        const currentStatus = prevEvents[0]?.status;

        // Only update if the status has actually changed
        if (currentStatus !== newPotentialStatus) {
          const newEvent: ValveEvent = {
            status: newPotentialStatus,
            timestamp: new Date(),
          };

          let updatedEvents = [...prevEvents];
          // Update the duration of the event that just ended
          if (updatedEvents.length > 0) {
            const lastEvent = updatedEvents[0];
            const durationMs = newEvent.timestamp.getTime() - lastEvent.timestamp.getTime();
            updatedEvents[0] = { ...lastEvent, duration: formatDuration(durationMs) };
          }
          // Prepend the new event and ensure the log doesn't exceed 50 entries
          return [newEvent, ...updatedEvents.slice(0, 49)];
        }
        
        // If the status hasn't changed, return the previous state unmodified
        return prevEvents;
      });
    }, 2000 + Math.random() * 1500); // Check for a change every 2-3.5 seconds

    return () => clearInterval(interval);
  }, []);
  
  // Effect for calculating the duration in the current state
  useEffect(() => {
    const timer = setInterval(() => {
      if (events.length > 0) {
        const timeDiff = new Date().getTime() - events[0].timestamp.getTime();
        setDuration(formatDuration(timeDiff));
      }
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, [events]);

  const latestStatus = events[0]?.status ?? ValveStatus.OFF;

  return (
    <div className="min-h-screen bg-mission-dark text-mission-text-primary flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        <main className="mt-8">
          <WeatherDisplay />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <StatusIndicator status={latestStatus} timestamp={events[0]?.timestamp} duration={duration} />
            </div>
            <div className="lg:col-span-2">
              <EventLog events={events} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
