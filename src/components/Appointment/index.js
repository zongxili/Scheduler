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
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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

  // function removeAppointment(name, interviewer) {
  //   const interview = {
  //     student: name,
  //     interviewer
  //   };
  //   transition(DELETING);
  //   // passed from Application.js
  //   props.cancelInterview(props.id, interview);
  // }

  // function save(name, interviewer) {
  //   const interview = {
  //     student: name,
  //     interviewer
  //   };
  //   transition(SAVING);

  //   // most confusing part
  //   // may have the answer: https://stackoverflow.com/questions/46720238/react-express-typeerror-cannot-read-property-then-of-undefined

  //   // try adding "then" / "return" at the front 
  //   // still doesnt work
  //   // maybe is the side effect?? 
  //   props.bookInterview(props.id, interview).then((result) => {
  //     if(result){
  //       console.log("promise resolved");
  //     }else {
  //       console.log("there was an error");
  //     }
  //     //console.log("test");
  //   })
  //   // temp.then((result)=> {
  //   //   if (result === true)
  //   //     console.log(result);
  //   // })
  // }




  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition("SHOW"))
      .catch(() => transition(ERROR_SAVE, true));
  };


  function removeAppointment() {
    // SHOW -> CONFIRM (replace) -> DELETING (replace) -> ERROR_DELETE
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        console.log("here is then");
        transition(EMPTY);
      })
      .catch(e => {
        console.log("here is error");
        transition(ERROR_DELETE, true)
      });
  }




  // useEffect(() => {
  //   if (mode === SAVING) {
  //     transition(SHOW);
  //   } else if (mode === DELETING) {
  //     transition(EMPTY)
  //   }
  // }, [props.interview])
  console.log(props);
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