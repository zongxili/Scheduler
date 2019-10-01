import React from "react";

import "components/DayListItem.scss"

import classNames from "classnames/bind";

// export default function DayListItems(props) {

//   const formatSpots = (spot) => {
//     if (!spot) return "no spots remaining";
//     if (spot === 1) return "1 spot remaining";
//     else return `${spot} spots remaining`;
//   };

//   const dayClass = classNames("day-list__item", {
//     "day-list__item--selected": props.selected,
//     "day-list__item--full": !props.spots
//   });

//   return (
//     <li 
//     className={dayClass}
//     onClick={() => props.setDay(props.name)}
//     >
//       <h2 className="text--regular">{props.name}</h2>
//       <h3 className="text--light">{formatSpots(props.spots)}</h3>
//     </li>
//   );
// }


export default function DayListItems(props) {

  // check the object and add the class names
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  // format props.spots to make tests pass
  const formatSpots = function(spots){
    if (spots === 0)
      return "no spots remaining"
    else if (spots === 1)
      return "1 spot remaining"
    else 
      return `${spots} spots remaining`
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}