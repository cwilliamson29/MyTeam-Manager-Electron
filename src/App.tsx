import EmployeeListTitle from "./components/EmployeeListTitle";
import {useEffect, useLayoutEffect} from "react";
import SettingsBar from "./components/SettingsBar";
import {DisplayEmployees} from "./components/DisplayEmployees.tsx";
import {useAppLoad, useAppSettings, useEmployeeData} from "./state/store.ts";
import {AddDummyData} from "./helpers/dummyData.tsx";

function App() {
    // AppLoad
    const appLoad = useAppLoad.use.appLoad()
    const setAppLoad = useAppLoad.use.setAppLoad()
    // Settings state
    const getAppSettings = useAppSettings.use.getAppSettings()
    const settings = useAppSettings.use.appSettings()
    // Employee state
    const getEmployees = useEmployeeData.use.getEmployees()

    useEffect(() => {
        getEmployees()
        getAppSettings()
        setAppLoad(false)
    }, []);


    useLayoutEffect(() => {
        document.body.style.backgroundColor = `var(--background-color-${settings.colorMode})`
    }, [settings]);

    if (appLoad) {
        return <div>Loading...</div>
    }

    return (
        <div className="container-fluid">
            <div className="titleBar"></div>
            <SettingsBar/>
            <EmployeeListTitle/>
            <DisplayEmployees/>

            <button onClick={() => AddDummyData()}>Add Dummy Data</button>
        </div>
    )
}

export default App;
