import EmployeeListTitle from "./components/EmployeeListTitle";
import { useEffect, useLayoutEffect } from "react";
import SettingsBar from "./components/SettingsBar";
import { DisplayEmployees } from "./components/DisplayEmployees.tsx";
import { useAppLoad, useAppSettings, useEmployeeData } from "./state/store.ts";
import { Titlebar, TitlebarColor } from "custom-electron-titlebar";

window.addEventListener("DOMContentLoaded", () => {
    return new Titlebar({
        backgroundColor: TitlebarColor.fromHex("#000000"),
        titleHorizontalAlignment: "center",
    });
});

function App() {
    // AppLoad
    const appLoad = useAppLoad.use.appLoad();
    const setAppLoad = useAppLoad.use.setAppLoad();
    // Settings state
    const getAppSettings = useAppSettings.use.getAppSettings();
    const settings = useAppSettings.use.appSettings();
    // Employee state
    const getEmployees = useEmployeeData.use.getEmployees();

    useEffect(() => {
        getEmployees();
        getAppSettings();
        setAppLoad(false);
    }, []);

    useLayoutEffect(() => {
        document.body.style.backgroundColor = `var(--background-color-${settings.colorMode})`;
    }, [settings]);

    if (appLoad) {
        return <div>Loading...</div>;
    }

    // Usage
    return (
        <div className="container-fluid">
            {/*<div*/}
            {/*    className={"titleBar w-[100%] " + settings.colorMode + "-mode"}*/}
            {/*></div>*/}
            {/*<TitleBar title={"My Team Manager"} />*/}
            <SettingsBar />
            <EmployeeListTitle />
            <DisplayEmployees />

            {/*<button onClick={() => AddDummyData()}>Add Dummy Data</button>*/}
        </div>
    );
}

export default App;
