import React, { useState, Fragment, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import "components/Application.scss";
import axios from 'axios';
import {getAppointmentsForDay, getInterview} from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // const appointments = getAppointmentsForDay(state, day);

  // const schedule = appointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);

  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={getInterview(state, appointment.interview)}
  //     />
  //   );
  // });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  // Here should insert the useEffect
  // use useState
  // update the days state with the responses
  useEffect(() => {
    const promiseDays = axios.get('/api/days');
    const promiseAppointments = axios.get('/api/appointments');
    const promiseInterviewers = axios.get('/api/interviewers');

    Promise.all([promiseDays, promiseAppointments, promiseInterviewers]).then(function(values) {
      setState(prev => ({...prev, days: values[0].data, appointments: values[1].data, interviewers: values[2].data}));

      // setDays(values[0].data);
      console.log(values);
    });
  },[]);


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay}/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <Fragment>
        {getAppointmentsForDay(state, state.day).map(appointment => (
          <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={getInterview(state, appointment.interview)}
        />))}
        <Appointment key={"last"} time={"12pm"} />
        </Fragment>
      </section>
    </main>
  );
}