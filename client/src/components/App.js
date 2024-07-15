import React, { Component } from 'react';
import '../../../styles.css';

class App extends Component {
  state = {
    flights: [],
    flightNumbers: [],
    flightNumber: '',
    flightDate: '',
    searchClicked: false,
    noFlightsFound: false,
  };

  componentDidMount() {
    this.fetchFlightNumbers();
  }

  fetchFlightNumbers = async () => {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
    };

    const response = await fetch('http://localhost:8080/api', requestOptions);
    const data = await response.json();
    console.log(data.flightData.data);

    const flightNumbersSet = new Set();

    for (const element of data.flightData.data) {
      flightNumbersSet.add(element.flight.number);
    }

    const flightNumbers = Array.from(flightNumbersSet);
    this.setState({ flightNumbers });
  };

  fetchFlights = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
    };

    const response = await fetch('http://localhost:8080/api', requestOptions);
    const data = await response.json();
    console.log(data.flightData.data);

    const matched = data.flightData.data
      .filter(
        (element) =>
          element.flight.number === this.state.flightNumber &&
          element.flight_date === this.state.flightDate
      )
      .filter(
        (element, index, self) =>
          index ===
          self.findIndex((e) => e.flight.number === element.flight.number)
      );

    console.log(matched);

    this.setState({
      flights: matched,
      searchClicked: true,
      noFlightsFound: matched.length === 0,
    });
  };

  render() {
    const {
      flights,
      flightNumbers,
      flightNumber,
      flightDate,
      searchClicked,
      noFlightsFound,
    } = this.state;

    return (
      <div className='App'>
        <header className='App-header'>
          <h1>First Fashionable Flights</h1>
          <div>
            <form id='form'>
              <select
                value={flightNumber}
                onChange={(e) =>
                  this.setState({ flightNumber: e.target.value })
                }
              >
                <option
                  value=''
                  disabled
                >
                  Select Flight Number
                </option>
                {flightNumbers.map((number, index) => (
                  <option
                    key={index}
                    value={number}
                  >
                    {number}
                  </option>
                ))}
              </select>
              <input
                type='date'
                value={flightDate}
                onChange={(e) => this.setState({ flightDate: e.target.value })}
                placeholder='Enter Flight Date'
              />
              <button onClick={this.fetchFlights}>Search Flights</button>
            </form>
          </div>
          {searchClicked && (
            <>
              <h2>Flight Information</h2>
              {noFlightsFound ? (
                <div>
                  No flight information found for the combination of flight
                  number and flight date. Please try again. 🙂
                </div>
              ) : (
                <div>
                  {flights.map((flight, index) => (
                    <div
                      key={index}
                      className='flight-details'
                    >
                      <div className='flight-detail'>
                        Flight Number: {flight.flight.number}
                      </div>
                      <div className='flight-detail'>
                        Flight Date: {flight.flight_date}
                      </div>
                      <div className='flight-detail'>
                        Flight Status: {flight.flight_status}
                      </div>
                      <div className='flight-detail'>
                        Departure Airport: {flight.departure.airport}
                      </div>
                      <div className='flight-detail'>
                        Departure Delay: {flight.departure.delay}
                      </div>
                      <div className='flight-detail'>
                        Departure Time: {flight.departure.scheduled}
                      </div>
                      <div className='flight-detail'>
                        Arrival Airport: {flight.arrival.airport}
                      </div>
                      <div className='flight-detail'>
                        Arrival Delay: {flight.arrival.delay}
                      </div>
                      <div className='flight-detail'>
                        Arrival Time: {flight.arrival.scheduled}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </header>
      </div>
    );
  }
}

export default App;
