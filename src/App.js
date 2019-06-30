import React, { Component } from 'react';
import './App.css';
import Button from './Button';
import 'tachyons'; //A styling library that I use with React, used it to add some basic styles to have visuals on the status buttons



const initialState = { // Supposedly the API is working, this variable should be empty and get filled with the response data. I hardcoded values for testing purposes
  userType:'BACK_OFFICE',
  confirmationRequests:[
        {
          requestedAt:'2019-06-01T12:34:56',
          confirmedAt:'2019-06-03T23:45:01'
        },
        {
          requestedAt:'2019-06-06T23:45:01',
          confirmedAt:'2019-06-06T23:50:01'
        }
      ],
  trackingStatus:'DRIVER_ON_THE_WAY',
  isCancelled:false,
  isClosed:false,
  pickupTime:'2018-07-01T10:00:00',
  dropOffTime:'2019-05-01T12:00:00'
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState; // Sets the state of the app to the data we received from the API call
    this.getLastIndex = this.state.confirmationRequests.pop(); // Pops the last array index of confirmationRequests array, to always compare to the last inputed data
    this.statusOff = '' // Sets the status for the backOffice case
    this.statusSupp = '' // Sets the status for the supplier
    this.statusUse = '' // Sets the status for the customer
  }
  
  // componentDidMount() {                                      // If the API was working, I would fetch it here and push it's data to my initialState var
  // fetch('https://api.get-e.com/ride/{ride-number}/status')
  // .then(response => response.json())
  // .then(data => this.setState({initialState : data}));
  // }

  checking = () => { // The big function that does the trick. Figured to use switch statement to test for the 3 different user cases
    
    switch(this.state.userType) { // Takes as argument the user type that we have and works the cases accordingly. 
                                  // Figured to start checking from top to bottom, so that cases like cancelled and closed are excluded easily
      case 'BACK_OFFICE':
      
        if (this.state.isCancelled === true && this.state.isClosed === true) {
          this.setState({statusOff: "Cancelled"})
        } else if (this.state.isCancelled === true && this.state.isClosed === false) {
          this.setState({statusOff: "To Confirm Cancel"})
        } else if (this.state.trackingStatus === 'NOT_TRACKING' && this.state.isClosed === true && (new Date(this.state.dropOffTime) < new Date())) {
          this.setState({statusOff: "Completed Ø"})
        } else if (this.state.trackingStatus === 'PASSENGER_DROPPED_OFF' && this.state.isClosed === true) {
          this.setState({statusOff: "Completed"})
        } else if (this.state.trackingStatus === 'NOT_TRACKING' && (new Date(this.state.dropOffTime) < new Date())) {
          this.setState({statusOff: "To close Ø"})
        } else if (this.state.trackingStatus === 'PASSENGER_DROPPED_OFF') {
          this.setState({statusOff: "To close"})
        } else if (this.state.trackingStatus === 'NOT_TRACKING' && (new Date(this.state.pickupTime) < new Date())) {
          this.setState({statusOff: "Active"})
        } else if (this.state.trackingStatus === 'PASSENGER_ON_BOARD' && (this.getLastIndex.confirmedAt)) {
          this.setState({statusOff: "Passenger on board"})
        } else if (this.state.trackingStatus === 'DRIVER_AT_PICKUP' && (this.getLastIndex.confirmedAt)) {
          this.setState({statusOff: "Driver at pickup"})
        } else if (this.state.trackingStatus === 'DRIVER_ON_THE_WAY' && (this.getLastIndex.confirmedAt)) {
          this.setState({statusOff: "Driver on the way"})
        } else if (this.getLastIndex.confirmedAt === null) {
          this.setState({statusOff: "To confirm change"})
        } else if (this.getLastIndex.confirmedAt) {
          this.setState({statusOff: "Confirmed"})
        } else if (this.getLastIndex.requestedAt && (!this.getLastIndex.confirmedAt)) {
          this.setState({statusOff: "To confirm"})
        }

      break;

      case 'SUPPLIER':

        if (this.state.isCancelled === true && this.state.isClosed === true) {
          this.setState({statusSupp: "Cancelled"})
        } else if (this.state.trackingStatus === 'NOT_TRACKING' && this.state.isClosed === true && (new Date(this.state.dropOffTime) < new Date())) {
          this.setState({statusSupp: "Completed Ø"})
        } else if (this.state.trackingStatus === 'PASSENGER_DROPPED_OFF' && this.state.isClosed === true) {
          this.setState({statusSupp: "Completed"})
        } else if (this.state.trackingStatus === 'NOT_TRACKING' && (new Date(this.state.dropOffTime) < new Date())) {
          this.setState({statusSupp: "To close Ø"})
        } else if (this.state.trackingStatus === 'PASSENGER_DROPPED_OFF') {
          this.setState({statusSupp: "To close"})
        } else if (this.state.trackingStatus === 'NOT_TRACKING' && (new Date(this.state.pickupTime) < new Date())) {
          this.setState({statusSupp: "Active"})
        } else if (this.state.trackingStatus === 'PASSENGER_ON_BOARD' && (this.getLastIndex.confirmedAt)) {
          this.setState({statusSupp: "Passenger on board"})
        } else if (this.state.trackingStatus === 'DRIVER_AT_PICKUP' && (this.getLastIndex.confirmedAt)) {
          this.setState({statusSupp: "Driver at pickup"})
        } else if (this.state.trackingStatus === 'DRIVER_ON_THE_WAY' && (this.getLastIndex.confirmedAt)) {
          this.setState({statusSupp: "Driver on the way"})
        } else if (this.getLastIndex.confirmedAt === null) {
          this.setState({statusSupp: "To confirm change"})
        } else if (this.getLastIndex.confirmedAt) {
          this.setState({statusSupp: "Confirmed"})
        } else if (this.getLastIndex.requestedAt && (!this.getLastIndex.confirmedAt)) {
          this.setState({statusSupp: "To confirm"})
        }

      break;

      case 'CUSTOMER':

        if (this.state.isCancelled === true && this.state.isClosed === true) {
          this.setState({statusUse: "Cancelled"})
        } else if (this.state.trackingStatus === 'NOT_TRACKING' && this.state.isClosed === true && (new Date(this.state.dropOffTime) < new Date())) {
          this.setState({statusUse: "Completed Ø"})
        } else if (this.state.trackingStatus === 'PASSENGER_DROPPED_OFF' && this.state.isClosed === true) {
          this.setState({statusUse: "Completed"})
        } else if (this.state.trackingStatus === 'NOT_TRACKING' && (new Date(this.state.pickupTime) < new Date())) {
          this.setState({statusUse: "Active"})
        } else if (this.state.trackingStatus === 'PASSENGER_ON_BOARD' && (this.getLastIndex.confirmedAt)) {
          this.setState({statusUse: "Passenger on board"})
        } else if (this.state.trackingStatus === 'DRIVER_AT_PICKUP' && (this.getLastIndex.confirmedAt)) {
          this.setState({statusUse: "Driver at pickup"})
        } else if (this.state.trackingStatus === 'DRIVER_ON_THE_WAY' && (this.getLastIndex.confirmedAt)) {
          this.setState({statusUse: "Driver on the way"})
        } else if (this.getLastIndex.requestedAt) {
          this.setState({statusUse: "Booked"})
        }

      break;

      default:
        console.log("Sorry, no correspoding userType")
    }
  }
  
    // I basically built the backOffice case and the rest was a matter of copy pasting and changing this.state to correspond to the right button
    // I found the new Date() method a nice trick to check and compare times. Passing the time from our data into new Date() and comparing it to a clean
    // new Date() (which outputs the time right now), gives a nice way to make our checks.


  render() {
    return (
      <div className="flex">
        <button className="tc fl w-10 ma3" onClick={this.checking} name="Check">Check Status</button>
        <Button className="" name={this.state.statusOff}/>
        <Button className="" name={this.state.statusSupp}/>
        <Button className="" name={this.state.statusUse}/>
      </div> // I know I named the components Buttons and even built inside a button element, it could be a Div or some text, doesn't matter. As long as it's working!
    );
  }
}

export default App;
