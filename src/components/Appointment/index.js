import React, { useEffect } from 'react';
import "./styles.scss";
// Import the Header, Show and Empty 
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";
import Status from "./Status";

export default function Appointment (props) {
  const interview = props.interview;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    const ret = props.bookInterview(props.id, interview);
  }

  useEffect(() => {
    if (mode === SAVING) {
      transition(SHOW)
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
        />
      )}
      {mode === SAVING && (
        <Status 
        message={"SAVING"}
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
    </article>
  );
}