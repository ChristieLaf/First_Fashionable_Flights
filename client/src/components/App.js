// import React from 'react';

// function App() {
//   return (
//     <div>
//       <h1>Hello, React!</h1>
//       <p>Welcome to this is my React application.</p>
//       <h2>First Fashionable Flights</h2>

//     </div>
//   );
// }

// export default App;
// --------------------------------------------------
import React, { Component } from 'react';
import FlightsData from './FlightsData'; 
import FlightsApi from './FlightsApi'; 

class App extends Component {
    state = {
        flights: []
    };

    componentDidMount() {
        this.fetchFlights();
    }

    fetchFlights = () => {
        fetch(`${FlightsApi.flightUrl}?access_key=${FlightsApi.flightKey}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ flights: data.data });
            })
            .catch(error => {
                console.error('Error fetching flights:', error);
            });
    };

    render() {
        const { flights } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <h1>First Fashionable Flights</h1>
                    <FlightsData flights={flights} />
                </header>
            </div>
        );
    }
}

export default App;
