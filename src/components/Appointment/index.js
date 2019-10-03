import React from 'react';
import "./styles.scss";
// Import the Header, Show and Empty 
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment (props) {
  const interview = props.interview;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* empty value */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {/* having a value */}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          // the onCancel can be passed with props
          // the back goes back to the previous step
          onCancel = {back}
        />
      )}
    </article>
  );
}