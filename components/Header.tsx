
import React from 'react';

const RocketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a6 6 0 01-7.38 5.84m2.56-5.84a6 6 0 01-5.84-7.38m5.84 2.56a6 6 0 017.38-5.84m-2.56 5.84a6 6 0 01-7.38-5.84m-5.84 7.38a6 6 0 015.84-7.38m-5.84 2.56a6 6 0 017.38-5.84" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.22 10.22l1.41 1.41M18.36 10.22l-1.41 1.41" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v1m0 4v1m0-8v1" />
    </svg>
);

const Header: React.FC = () => {
  return (
    <header className="flex items-center space-x-4 p-4 bg-mission-panel border border-mission-border rounded-lg shadow-lg">
        <RocketIcon />
        <div>
            <h1 className="text-xl md:text-2xl font-bold text-mission-text-primary">Rocket Fuel Valve Monitor</h1>
            <p className="text-sm text-mission-text-secondary">Live Telemetry Feed Prototype</p>
        </div>
    </header>
  );
};

export default Header;
