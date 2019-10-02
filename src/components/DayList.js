// check lecture notes: https://github.com/jensen/components-notes-sept30/blob/master/project/src/components/Tweet.js

import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  // need to include this
  // otherwise the page just shows underfined
  return <ul>{days}</ul>;
}