import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {EmployeeSorting, SortClick} from "../interfaces/employeeInterface";
import {css} from "../helpers/employeeList-helpers";

interface Props {
    setTimeReorder: (sort: EmployeeSorting) => void;
}

function EmployeeListTitle({setTimeReorder}: Props) {
    // State to change CSS styles and sort, uses the SortClick interface
    let [timeClick, setTimeClick] = React.useState({css: '', sort: false})
    let [nameClick, setNameClick] = React.useState({css: ' title-buttons-clicked ', sort: true})

    // handlTimeClick function that takes the properties as an object and stores them
    // state and returns them to the main element with setTimeReorder
    const handleTimeclick = (args: SortClick) => {
        if (timeClick.sort) {
            setTimeClick({css: args.css, sort: false})
            setTimeReorder({time: args.sort, firstName: nameClick.sort})
        } else {
            setTimeClick({css: args.css, sort: true})
            setTimeReorder({time: args.sort, firstName: nameClick.sort})
        }
    }
    // handleNameClick function that takes the properties as an object and stores them in
    // state and returns them to the main element with setTimeReorder
    const handleNameClick = (args: SortClick) => {
        //console.log(args)
        if (nameClick.sort) {
            setNameClick({css: args.css, sort: false})
            setTimeReorder({time: timeClick.sort, firstName: args.sort})
        } else {
            setNameClick({css: args.css, sort: true})
            setTimeReorder({time: timeClick.sort, firstName: args.sort})
        }
    }

    // Return statement displays the blue bar at the top that allows to sort by time and first / last name
    return (
        <div
            className={"d-flex flex-row align-items-center justify-content-between dark-mode title"}>
            <div className={"col flex-grow-1 h-100 time time-button title-button " + timeClick.css}
                 onClick={() => handleTimeclick({css: css(timeClick.css), sort: !timeClick.sort})}>
                Time <FontAwesomeIcon icon={faArrowDown} className={timeClick.css}/>
            </div>
            <div className="col-sm border-slate h-100 days">Work Days</div>
            <div className="col border-slate h-100 name">
                <div className="row" onClick={() => handleNameClick({css: css(nameClick.css), sort: !nameClick.sort})}>
                    <div className={"col text-align-right title-button " + nameClick.css}>
                        <FontAwesomeIcon icon={faArrowDown} className={css(nameClick.css)}/>
                        By First
                    </div>
                    <div className={"col title-button " + css(nameClick.css)}>
                        By Last
                        <FontAwesomeIcon icon={faArrowDown} className={css(nameClick.css)}/>
                    </div>
                </div>

            </div>
            <div className="col start border-slate h-100 email">Email</div>
            <div className="col border-slate h-100 EEID">EE ID</div>
            <div className="col border-slate h-100 meetings">
                Meetings
            </div>
            <div className="col h-100 border-slate titleWarnings">
                Warnings
            </div>
        </div>
    );
}

export default EmployeeListTitle;
