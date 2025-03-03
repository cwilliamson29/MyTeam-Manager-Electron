import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {useAppLoad, useAppSettings, useEmployeeData} from "../state/store.ts";
import {css} from "../helpers/employeeList-helpers.tsx";

function EmployeeListTitle() {
    // App Load
    const appLoad = useAppLoad.use.appLoad()
    const setAppLoad = useAppLoad.use.setAppLoad()
    // Settings
    const settings = useAppSettings.use.appSettings()
    const setSettings = useAppSettings.use.setAppSettings()
    // Employee database
    const setEmployees = useEmployeeData.use.setEmployees()
    // State to change CSS styles
    let [timeClick, setTimeClick] = React.useState('')
    let [nameClick, setNameClick] = React.useState(' text-[#70ace4] ')

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
    }

    useEffect(() => {
        setAppLoad(true)
        setEmployees()

        if (settings.sortByTime) {
            setTimeClick(' text-[#70ace4] ')
        } else {
            setTimeClick('')
        }
        if (settings.sortByFirstName) {
            setNameClick(' text-[#70ace4] ')
        } else {
            setNameClick('')
        }
        // setEmployees()
        setAppLoad(false)
    }, [settings]);

    if (appLoad) {
        return <div>Loading...</div>
    }
    const styles = " text-center text-bold text-[16px] border-black border-b-[1px] "
    // Return statement displays the blue bar at the top that allows to sort by time and first / last name
    return (
        <div className={"flex align-start justify-start " + settings.colorMode + "-mode"}>
            <div className={"w-[19%] cursor-pointer" + styles + timeClick}
                 onClick={() => handleTimeClick(css(timeClick))}>
                Time <FontAwesomeIcon icon={faArrowDown} className={timeClick}/>
            </div>
            <div className={"w-[10%]" + styles}>Work Days</div>
            <div className={"w-[22%]" + styles}>
                <div className="flex justify-around cursor-pointer" onClick={() => handleNameClick(css(nameClick))}>
                    <div className={"hover:text-[#70ace4]" + styles + nameClick}>
                        <FontAwesomeIcon icon={faArrowDown} className={nameClick}/>
                        By First
                    </div>
                    <div className={"hover:text-[#70ace4]" + styles + css(nameClick)}>
                        By Last
                        <FontAwesomeIcon icon={faArrowDown} className={css(nameClick)}/>
                    </div>
                </div>

            </div>
            <div className={"w-[23%]" + styles}>Email</div>
            <div className={"w-[12%]" + styles}>EE ID</div>
            <div className={"w-[22%]" + styles}>
                Meetings
            </div>
            <div className={"w-[9%]" + styles}>
                Warnings
            </div>
        </div>
    );
}

export default EmployeeListTitle;
