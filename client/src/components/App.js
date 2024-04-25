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
// import React, { Component } from 'react';
// import FlightsData from './FlightsData'; 
// import FlightsApi from './FlightsApi';
// // import '/styles.css'; 

// class App extends Component {
//     state = {
//         flights: []
//     };

//     componentDidMount() {
//         this.fetchFlights();
//     }

//     fetchFlights = () => {
//         fetch(`${FlightsApi.flightUrl}?access_key=${FlightsApi.flightKey}`)
//             .then(response => response.json())
//             .then(data => {
//                 this.setState({ flights: data.data });
//             })
//             .catch(error => {
//                 console.error('Error fetching flights:', error);
//             });
//     };

//     render() {
//         const { flights } = this.state;
//         return (
//             <div className="App">
//                 <header className="App-header">
//                     <h1>First Fashionable Flights</h1>
//                     <FlightsData flights={flights} />
//                 </header>
//             </div>
//         );
//     }
// }

// export default App;
//-----------------------------------------
// import React, { Component } from 'react';
// import '../../../styles.css';
// import FlightsData from './FlightsData';
// import FlightsApi from './FlightsApi';

// class App extends Component {
//     state = {
//         flights: [],
//         flightNumber: '',  
//         flightDate: ''    
//     };

//     componentDidMount() {
//          this.fetchFlights();
//     }

//     fetchFlights = () => {
//         if (!this.state.flightNumber || !this.state.flightDate) {
//             alert('Please enter both flight number and date');
//             return;
//         }

//         const query = `${FlightsApi.flightUrl}?access_key=${FlightsApi.flightKey}`;

//         fetch(query)
//             .then(response => response.json())
//             .then(data => {
//                 // Filter flights based on user input
//                 const filteredFlights = data.data.filter(flight => 
//                     flight.flight_number === this.state.flightNumber &&
//                     flight.departure.scheduled.startsWith(this.state.flightDate)
//                 );
//                 this.setState({ flights: filteredFlights });
//             })
//             .catch(error => {
//                 console.error('Error fetching flights:', error);
//             });
//     };

//     render() {
//         const { flights, flightNumber, flightDate } = this.state;
//         return (
//             <div className="App">
//                 <header className="App-header">
//                     <h1>First Fashionable Flights</h1>
//                     <div>
//                         <form> 
//                         <input
//                             type="text"
//                             value={flightNumber}
//                             onChange={e => this.setState({ flightNumber: e.target.value })}
//                             placeholder="Enter Flight Number"
//                         />
//                         <input
//                             type="date"
//                             value={flightDate}
//                             onChange={e => this.setState({ flightDate: e.target.value })}
//                             placeholder="Enter Flight Date"
//                         />
//                         <button onClick={this.fetchFlights}>Search Flights</button>
//                         </form>
//                     </div>
//                     <FlightsData flights={flights} />
//                 </header>
//             </div>
//         );
//     }
// }

// export default App;
//--------------------------------------------------------------------------------
import React, { Component } from 'react';
import '../../../styles.css';  
import FlightsData from './FlightsData';
import FlightsApi from './FlightsApi';

class App extends Component {
    state = {
        flights: [],
        flightNumber: '',  
        flightDate: ''    
    };

    // componentDidMount() {
    //     // Fetch flights on component mount if needed or leave this method out
    // }

    fetchFlights = (event) => {
        event.preventDefault();  // Prevent the form from causing a page reload

       


    };

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
                    <FlightsData flights={flights} />
                </header>
            </div>
        );
    }
}

export default App;