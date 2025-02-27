import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {css} from "../helpers/employeeList-helpers";
import {useAppLoad, useAppSettings, useEmployeeData} from "../state/store.ts";

function EmployeeListTitle() {
    // App Load
    const appLoad = useAppLoad.use.appLoad()
    const setAppLoad = useAppLoad.use.setAppLoad()
    // Settings
    const settings = useAppSettings.use.appSettings()
    const setSettings = useAppSettings.use.setAppSettings()
    // Employee database
    const setEmployees = useEmployeeData.use.setEmployees()
    // State to change CSS styles and sort, uses the SortClick interface
    let [timeClick, setTimeClick] = React.useState('')
    let [nameClick, setNameClick] = React.useState(' title-buttons-clicked ')

    // handleTimeClick function that takes the properties as an object and stores them
    // state and returns them to the main element with setTimeReorder
    const handleTimeClick = (args: string) => {
        if (timeClick) {
            setTimeClick(args)
            setSettings("sortByTime", false)
        } else {
            setTimeClick(args)
            setSettings("sortByTime", true)
        }
        setEmployees()
    }
    // handleNameClick function that takes the properties as an object and stores them in
    // state and returns them to the main element with setTimeReorder
    const handleNameClick = (args: string) => {
        if (nameClick) {
            setNameClick(args)
            setSettings("sortByFirstName", false)
        } else {
            setNameClick(args)
            setSettings("sortByFirstName", true)
        }
        setEmployees()
    }

    useEffect(() => {
        if (settings.sortByTime) {
            setTimeClick(' title-buttons-clicked ')
        } else {
            setTimeClick('')
        }
        if (settings.sortByFirstName) {
            setNameClick(' title-buttons-clicked ')
        } else {
            setNameClick('')
        }
        setAppLoad(false)
    }, [settings]);

    if (appLoad) {
        return <div>Loading...</div>
    }

    // Return statement displays the blue bar at the top that allows to sort by time and first / last name
    return (
        <div
            className={"d-flex flex-row align-items-center justify-content-between title " + settings.colorMode + "-mode"}>
            <div className={"col flex-grow-1 h-100 time time-button title-button " + timeClick}
                 onClick={() => handleTimeClick(css(timeClick))}>
                Time <FontAwesomeIcon icon={faArrowDown} className={timeClick}/>
            </div>
            <div className="col-sm border-slate h-100 days">Work Days</div>
            <div className="col border-slate h-100 name">
                <div className="row" onClick={() => handleNameClick(css(nameClick))}>
                    <div className={"col text-align-right title-button " + nameClick}>
                        <FontAwesomeIcon icon={faArrowDown} className={css(nameClick)}/>
                        By First
                    </div>
                    <div className={"col title-button " + css(nameClick)}>
                        By Last
                        <FontAwesomeIcon icon={faArrowDown} className={css(nameClick)}/>
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
