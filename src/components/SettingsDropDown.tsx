import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {useAppSettings} from "../state/store.ts";

interface Props {
    show: boolean;
}

function SettingsDropDown({show}: Props) {
    let hide = show ? " open" : "";

    const settings = useAppSettings.use.appSettings()
    const setSettings = useAppSettings.use.setAppSettings()
    const saveToDB = useAppSettings.use.saveAppSettingsDB()
    const buttonCreate = (forRole: string, con1: any, con2: any) => {

        return (
            <ToggleButtonGroup type="radio" name={forRole} className="mb-2 warning" value={settings[forRole]}>
                <ToggleButton id={forRole + "-toggle-1"}
                              value={con1} className={"btn-dark"} onClick={() => setSettings(forRole, con1)}>
                    {typeof con1 === "boolean" ? "Yes" : con1}
                </ToggleButton>
                <ToggleButton id={forRole + "-toggle-2"}
                              value={con2} className={"btn-dark"} onClick={() => setSettings(forRole, con2)}>
                    {typeof con2 === "boolean" ? "No" : con2}
                </ToggleButton>
            </ToggleButtonGroup>
        )
    }

    return (
        <div className={"box d-flex justify-content-center " + hide}>
            <div className="pe-3 align-self-center">Sort By Time:</div>
            <div className="pe-3 align-self-center">{buttonCreate("sortByTime", true, false)}</div>
            <div className="pe-3 align-self-center">Time Display:</div>
            <div className="pe-3 align-self-center">{buttonCreate("hours", 12, 24)}</div>
            <div className="pe-3 align-self-center">Sort By First Name:</div>
            <div className="pe-3 align-self-center">{buttonCreate("sortByFirstName", true, false)}</div>
            <div className="pe-3 align-self-center">Color Mode:</div>
            <div className="pe-3 align-self-center">{buttonCreate("colorMode", "light", "dark")}</div>
            <button className="btn btn-primary" onClick={() => saveToDB()}>Save</button>
        </div>
    );
}

export default SettingsDropDown;