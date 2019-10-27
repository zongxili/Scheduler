export const SET_DAY = "SET_DAY";
export const REMINDING_SPOTS = "REMINDING_SPOTS";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { 
        ...state, 
        day: action.day 
      }

    case SET_APPLICATION_DATA:
      return { 
        ...state, 
        days: action.days, 
        appointments: action.appointments, 
        interviewers: action.interviewers 
      }

    case SET_INTERVIEW: {
      return { 
        ...state, 
        appointments: action.appointments 
      }
    }

    // update the remindind spots on the left side
    case REMINDING_SPOTS: {
      const newDays = [...action.days];
      const dayObj = newDays.find(dayObj => dayObj.name === action.day);
      let spots = 0;
      dayObj.appointments.forEach(appointmentId => {
        if (!state.appointments[appointmentId].interview) 
          spots++; // find the non-booking spot
      });
      // do decreasing
      newDays[dayObj.id - 1].spots = spots;
      return {
        ...state,
        days: newDays
      }
    }
    // for the rest case: we dont care them and just throw an error 
    default:
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
  }
}