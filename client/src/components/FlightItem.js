import React from 'react';

const FlightItem = ({ flight }) => {
    return (
        <li>
            <div>Flight Number: {flight.flight_number}</div>
            <div>Flight Status: {flight.flight_status}</div>
            <div>Departure Airport: {flight.departure.airport}</div>
            <div>Departure Delay: {flight.departure.delay}</div>
            <div>Departure Time: {flight.departure.scheduled}</div>
            <div>Arrival Airport: {flight.arrival.airport}</div>
            <div>Arrival Delay: {flight.arrival.delay}</div>
            <div>Arrival Time: {flight.arrival.scheduled}</div>
        </li>
    );
};

export default FlightItem;

