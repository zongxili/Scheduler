import React, { useEffect } from 'react';
import "./styles.scss";
// Import the Header, Show and Empty 
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // functions let user edit appointment
  function editAppointment(){
    transition(EDIT);
  }

  // function lets user comfirm if canceling the appointment
  function confirmRemoving(){
    transition(CONFIRM);
  }

  function removeAppointment(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING);
    // passed from Application.js
    props.cancelInterview(props.id, interview)
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview);
  }

  useEffect(() => {
    if (mode === SAVING) {
      transition(SHOW);
    } else if (mode === DELETING) {
      transition(EMPTY)
    }
  }, [props.interview])
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* empty value */}
      {mode === EMPTY && <Empty onAdd={()=> transition(CREATE)} />}
      {/* having a value */}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmRemoving}
          onEdit={editAppointment}
        />
      )}
      {mode === SAVING && (
        <Status 
        message={"Saving"}
        />
      )}
      {/* "mode === DELETING" let users check if they want to delete the appointment */}
      {mode === CONFIRM && (
        <Confirm 
        message={"Are you sure you would like to delete"}
        onCancel = {back}
        onConfirm = {removeAppointment}
        />
      )}
      {mode === DELETING && (
        <Status 
        message={"Deleting"}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          
          // the onCancel can be passed with props
          // the back goes back to the previous step
          onCancel = {back}
          onSave = {save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel = {back}
          onSave = {save}
        />
      )}
    </article>
  );
}