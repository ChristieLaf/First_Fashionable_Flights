import React from 'react';
import FlightItem from './FlightItem'; 

const FlightsData = ({ flights }) => {
    return (
        <div className="flight-list">
            <h2>Flight Information</h2>
            <ul>
                {flights.map((flight, index) => (
                    <FlightItem key={index} flight={flight} />
                ))}
            </ul>
        </div>
    );
};

export default FlightsData;