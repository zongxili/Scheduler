import React, { useState, Fragment, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import "components/Application.scss";
import axios from 'axios';
import {getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
// import { useVisualMode } from "../hooks/useVisualMode.js";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    interview: {}
  });

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
    });
  },[]);

  function cancelInterview(id, interview){
    // this is an object
    const appointment = {
      ...state.appointments[id]
    };
    // a parent object with many sub objects
    const appointments = {
      ...state.appointments
    };
    appointments[id].interview = null;
    // call to database
    axios.delete(`/api/appointments/${id}`).then(
      () => {
        setState(prevState => ({
          ...prevState,
          appointments
        }));
      }
    );
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    axios.put(`/api/appointments/${id}`, { interview }).then(
      () => {
        setState(prevState => ({
          ...prevState,
          appointments
        }));
      }
    );
  }

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
          interviewers={getInterviewersForDay(state, state.day)}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />))}
        <Appointment key={"last"} time={"5pm"} />
        </Fragment>
      </section>
    </main>
  );
}