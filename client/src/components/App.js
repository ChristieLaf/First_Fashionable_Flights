import React, { Component } from 'react';
import '../../../styles.css';

class App extends Component {
    state = {
        flights: [],
        flightNumber: '',
        flightDate: '',
        searchClicked: false
    };

    fetchFlights = async (event) => {
        event.preventDefault();
        
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };
        
        const response = await fetch('http://localhost:8080/api', requestOptions);
        const data = await response.json();
        console.log(data.flightData.data);
    
        let matched = [];  // Use an array to handle multiple matches if needed
        for (const element of data.flightData.data) {  // Use 'for...of' for array iteration
            console.log(element);  // Logging each element to see data
            if (element.flight.number === this.state.flightNumber && element.flight_date === this.state.flightDate) {
                matched.push(element);  // Only push to matched if both conditions are true
            }
        }
    
        console.log(matched);
        this.setState({ flights: matched, searchClicked: true });
    };

    render() {
        const { flights, flightNumber, flightDate, searchClicked } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <h1>First Fashionable Flights</h1>
                    <div>
                        <form id="form">
                            <input
                                type="text"
                                value={flightNumber}
                                onChange={e => this.setState({ flightNumber: e.target.value })}
                                placeholder="Enter Flight Number"
                            />
                            <input
                                type="date"
                                value={flightDate}
                                onChange={e => this.setState({ flightDate: e.target.value })}
                                placeholder="Enter Flight Date"
                            />
                            <button onClick={this.fetchFlights}>Search Flights</button>
                        </form>
                    </div>
                    {searchClicked && (
                        <>
                            <h2>Flight Information</h2>
                            <div>
                                {flights.map((flight, index) => (
                                    <div key={index} className="flight-details">
                                        <div className="flight-detail">Flight Number: {flight.flight.number}</div>
                                        <div className="flight-detail">Flight Date: {flight.flight_date}</div>
                                        <div className="flight-detail">Flight Status: {flight.flight_status}</div>
                                        <div className="flight-detail">Departure Airport: {flight.departure.airport}</div>
                                        <div className="flight-detail">Departure Delay: {flight.departure.delay}</div>
                                        <div className="flight-detail">Departure Time: {flight.departure.scheduled}</div>
                                        <div className="flight-detail">Arrival Airport: {flight.arrival.airport}</div>
                                        <div className="flight-detail">Arrival Delay: {flight.arrival.delay}</div>
                                        <div className="flight-detail">Arrival Time: {flight.arrival.scheduled}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </header>
            </div>
        );
    }
}

export default App;
