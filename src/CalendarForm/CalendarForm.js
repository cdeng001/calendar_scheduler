import React, { Component } from 'react';
import AppointmentList from '../AppointmentList/AppointmentList';

class CalendarForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            date: null,
            startTime: null,
            endTime: null,
        };

        this.addAppointment.bind(this);
        this.removeAppointment.bind(this);
    }

    // Function to update value on input change.
    onInputChange = (ev) => {
        this.setState({ [ev.target.name]: ev.target.value });
    }

    // Function to handle form synth ev
    submitForm = (ev) => {
        ev.preventDefault();

        const {date, startTime, endTime} = this.state;
        
        if(
            date !== null &&
            startTime !== null &&
            endTime !== null 
        ){
            // convert start and end times to epoch times for easier checks
            let startTimeDate = new Date([date, this.state.startTime].join('T'));
            let endTimeDate = new Date([date, this.state.endTime].join('T'));

            this.addAppointment(
                date,
                startTimeDate.getTime(),
                endTimeDate.getTime()
            );
        }
        else{
            console.error("Invalid arguments");
        }
    }

    // Function to add an appt. 
    addAppointment(date, startTime, endTime){
        if( this.validateAppointment(date, startTime, endTime) ){
            let newAppointment = {
                date: date,
                startTime: startTime,
                endTime: endTime,
            };

            this.setState({
                appointments: [
                    ...this.state.appointments,
                    newAppointment,
                ]
            }, () => {
                console.log(
                    "New appointment added.",
                    this.state.appointments
                );
            });
        }
    }

    // Helper function to check if appt overlaps.
    validateAppointment(date, startTime, endTime){
        if(startTime > endTime) return false;

        //get all appointments on the date, that overlap in time
        let overlaps = this.state.appointments.filter((appt)=>{
            if(appt.date === date){
                return this.checkTimeOverlap(
                    appt.startTime,
                    appt.endTime,
                    startTime,
                    endTime
                )
            }
            return false;
        });

        //TODO: validate that the date and times are even real times

        return overlaps.length === 0;
    }

    // Helper function to remove appt.
    removeAppointment = (index) => {
        // check for valid index
        if( this.state.appointments.length > index && index > -1 ){
            const appts = [...this.state.appointments];
            appts.splice(index, 1);
            this.setState({
                appointments: appts,
            }, () => {
                console.log(
                    `Removed appointment at ${index}`,
                    this.state.appointments,
                )
            });
        }
    }

    // Helper function to check if two time windows overlap
    checkTimeOverlap(startTimeA, endTimeA, startTimeB, endTimeB){
        // overlap because B starts in A
        if(startTimeA <= startTimeB && endTimeB <= endTimeA){
            return true;
        }
        // overlap because B ends in A
        else if(startTimeA <= endTimeB && endTimeB <= endTimeB){
            return true
        }
        // overlap because A is scheduled inside B
        else if(startTimeB < startTimeA && endTimeA < endTimeB){
            return true;
        }
        else{
            return false;
        }
    }

    // Helper funtion to get todays time in correct format
    getToday(){
        let today = new Date();
        let dd = today.getDate();

        // need to add offset of 1 cause js Date and html 
        // date are not standard, bleh
        let mm = today.getMonth()+1;
        let yy = today.getFullYear();
        if (dd<10) dd='0'+dd; 
        if (mm<10) mm='0'+mm;

        return [yy, mm, dd].join('-');
    }

    // Function to submit appointments
    submitAppointments = () => {
        //Here is a fetch request !!
        alert(JSON.stringify(this.state.appointments));
    }

    render(){
        return (
            <div className="calendar-form-wrapper">
                <h1>Calendar Scheduler</h1>
                <form onSubmit={this.submitForm}>
                    <div>
                        <label>
                            Appointment Date:
                            <input 
                                type="date"
                                min={this.getToday()}
                                name="date"
                                onChange={this.onInputChange}
                                />
                        </label>
                    </div>
                    <div>
                        <label>
                            Appointment Start Time:
                            <input
                                type="time"
                                name="startTime"
                                onChange={this.onInputChange}
                                />
                        </label>
                    </div>
                    <div>
                        <label>
                            Appointment End Time:
                            <input
                                type="time"
                                name="endTime"
                                onChange={this.onInputChange}
                                />
                        </label>
                    </div>
                    <button type="submit">
                        Add Appointment
                    </button>
                    <button type="button" onClick={this.submitAppointments}>
                        Submit All Appointments
                    </button>
                </form>
                <AppointmentList
                    appointments={this.state.appointments}
                    remove={this.removeAppointment}
                    />
            </div>
            
        );
    }
}

export default CalendarForm;