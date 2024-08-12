import React, { useState, useEffect } from 'react';
import '../../../styles.css';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [flightNumbers, setFlightNumbers] = useState([]);
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [noFlightsFound, setNoFlightsFound] = useState(false);

  useEffect(() => {
    const fetchFlightNumbers = async () => {
      const requestOptions = {
        method: 'POST',
        redirect: 'follow',
      };

      const response = await fetch('http://localhost:8080/api', requestOptions);
      const data = await response.json();
      // console.log(data.flightData.data);

      const flightNumbersSet = new Set();

      for (const element of data.flightData.data) {
        flightNumbersSet.add(element.flight.number);
      }

      // Convert the Set to an array and sort the numbers numerically
      const sortedFlightNumbers = Array.from(flightNumbersSet).sort(
        (a, b) => a - b
      );

      setFlightNumbers(sortedFlightNumbers);
    };

    fetchFlightNumbers();
  }, []);

  const fetchFlights = async (event) => {
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
          element.flight.number === flightNumber &&
          element.flight_date === flightDate
      )
      .filter(
        (element, index, self) =>
          index ===
          self.findIndex((e) => e.flight.number === element.flight.number)
      );

    console.log(matched);
    console.log(flightNumber)

    setFlights(matched);
    setSearchClicked(true);
    setNoFlightsFound(matched.length === 0);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>First Fashionable Flights</h1>
        <div>
          <form id='form'>
            <select
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
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
              onChange={(e) => setFlightDate(e.target.value)}
              placeholder='Enter Flight Date'
            />
            <button onClick={fetchFlights}>Search Flights</button>
          </form>
        </div>
        {searchClicked && (
          <>
            <h2>Flight Information</h2>
            {noFlightsFound ? (
              <div>
                No flight information found for the combination of flight number
                and flight date. Please try again. 🙂
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
};

export default App;
