// return an array of appointments for the given day
export function getAppointmentsForDay(state, day) {
  let returnArr = [];
  if (state.days.length === 0) {
    return returnArr;
  }

  const daysArr = state.days;
  const appointmentsObj = state.appointments;
  let foundDay = {};

  // get the days
  for (let oneDayObj of daysArr){
    if (oneDayObj['name'] === day){
      foundDay = oneDayObj;
    }
  }
  if (Object.keys(foundDay).length === 0) {
    return returnArr;
  }
  // get the appointments based on the days.appointments
  for (let appointmentNum of foundDay.appointments) {
    returnArr.push(appointmentsObj[appointmentNum]);
  }
  return returnArr;
};

export function getInterview(state, interview) {
  let returnObj = null;
  if (interview === null){
    return returnObj;
  }
  returnObj = interview;
  for (let interviewerObj in state.interviewers){
    if (interviewerObj == returnObj.interviewer) {
      // console.log(state.interviewers[interviewerObj]);
      returnObj.interviewer = state.interviewers[interviewerObj];
    }
  }
  return returnObj;
};

// export function getAppointmentsByDay(state, interview) {
//   let returnObj = null;
//   if (interview === null){
//     return returnObj;
//   }
//   returnObj = interview;
//   for (let interviewerObj in state.interviewers){
//     if (interviewerObj == returnObj.interviewer) {
//       // console.log(state.interviewers[interviewerObj]);
//       returnObj.interviewer = state.interviewers[interviewerObj];
//     }
//   }
//   return returnObj;
// };