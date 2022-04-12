import { useRef, useState } from "react";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

export default function ProgressBar({ next, prev, percentage, submit }) {
  const [tooltip, setToltip] = useState(false);
  const tooltipRep = useRef();
  function toggleToltip() {
    if (tooltip) {
      setToltip(false);
      tooltipRep.current.style.display = "none";
    } else {
      setToltip(true);
      tooltipRep.current.style.left = `calc(${percentage}% - 65px)`;
      tooltipRep.current.style.display = "block";
    }
  }
  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRep}>
          {percentage} Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            onMouseOver={toggleToltip}
            onMouseOut={toggleToltip}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <Button
        className={classes.next}
        onClick={percentage === 100 ? submit : next}
      >
        <span>{percentage === 100 ? "Submit Quiz" : "Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
