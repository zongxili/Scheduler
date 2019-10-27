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
  let returnObj = {};
  for(let appointmentID in state.appointments) {
    if (interview === null)
      return interview;
    if(state.appointments[appointmentID].interview === interview) {
      let interviewerID = (state.appointments[appointmentID].interview.interviewer).toString()
      let interviewer = state.interviewers[interviewerID];
      returnObj["student"] = interview.student
      returnObj["interviewer"]= interviewer
      return returnObj;
    }
  }
};

// return an array of appointments for the given day
export function getInterviewersForDay(state, day) {
  let returnArr = [];
  let interviewersArr = [];
  for (let oneDay in state.days) {
    if (state.days[oneDay].name === day){
      interviewersArr = (state.days[oneDay].interviewers);
    }
  }
  for (let interview in state.interviewers) {
    for (let oneID of interviewersArr) {
      if (oneID === state.interviewers[interview].id){
        returnArr.push(state.interviewers[interview]);
      }
    }
  }
  return returnArr;
};