import React, { Component } from 'react';
import '../../../styles.css';  



class App extends Component {
    state = {
        flights: [],
        flightNumber: '',  
        flightDate: ''    
    };

    // componentDidMount() {
    //      this.fetchFlights();
    // }

    fetchFlights = async (event) => {
        event.preventDefault();  // Prevent the form from causing a page reload
        
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };
        
        const response = await fetch('http://localhost:8080/api', requestOptions);
        const data = await response.json();
        // console.log(data)
        // console.log(data.flightData.data)
        console.log(data.flightData.data); // Check the raw data structure
        console.log(this.state.flightNumber, this.state.flightDate); // Check the state values
        console.log(typeof this.state.flightNumber, typeof this.state.flightDate);
        for (const element of data.flightData.data) {
            // console.log(element.flight_date);
            // console.log(element.flight.number);
            if (element.flight.number === this.state.flightNumber) {
                if (element.flight_date === this.state.flightDate) {
                    console.log(element)
                    this.state.flights = element
                    console.log(this.state.flights)
                }
            }
          }

        


    };
    // fetchFlights = async (event) => {
    //     event.preventDefault();  // Prevent the form from causing a page reload
    
    //     const requestOptions = {
    //         method: "POST",
    //         redirect: "follow"
    //     };
    
    //     const response = await fetch('http://localhost:8080/api', requestOptions);
    //     const data = await response.json();
    
    //     // Filter flights based on the flight number and date provided by the user
    //     const matched = data.flightData.data.filter(el => 
    //         el.flight.number === this.state.flightNumber && el.flight_date === this.state.flightDate
    //     );
    
    //     console.log(matched);
    
    //     // Update the state with the filtered flights
    //     this.setState({ flights: matched });
    // };
    

    render() {
        const { flights, flightNumber, flightDate } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <h1>First Fashionable Flights</h1>
                    <div>
                        <form> 
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
                        <button onClick={(e) => this.fetchFlights(e)}>Search Flights</button>
                        </form>
                    </div>
                    {/* <FlightsData flights={flights} /> */}
                    <h2>Flight Information</h2>
                    {flights}
                </header>
            </div>
        );
    }
}

export default App;