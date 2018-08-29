import React, { Component } from 'react';
import './AppointmentList.css';

class AppointmentList extends Component{
    constructor(props) {
        super(props);
    }

    getList = () => {
        return this.props.appointments.map((appts, index) => {

            const {date, startTime, endTime} = appts;
            let startTimeFormatted = (new Date(startTime)).toTimeString();
            let endTimeFormatted = (new Date(endTime)).toTimeString();

            return (
                <li key={index}>
                    <div className="appointment-card">
                        <div>
                            <p>Date: {date}</p>
                            <p>Start Time: {startTimeFormatted}</p>
                            <p>End Time: {endTimeFormatted}</p>
                        </div>
                        <div className="appointment-card-remove">
                            <a
                                onClick={()=>{this.props.remove(index)}}>
                                &times;
                            </a>
                        </div>
                    </div>
                </li>
            );
        });

    }

    render(){
        return(
            <div>
                <h2>Appointments</h2>
                <p>Here is a list of the appointments you want!</p>
                <ul>
                    {this.getList()}
                </ul>
            </div>
        );
    }
}

export default AppointmentList;