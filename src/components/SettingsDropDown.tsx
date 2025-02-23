import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {useAppSettings} from "../state/store.ts";
import {useState} from "react";

interface Props {
    show: boolean;
}

function SettingsDropDown({show}: Props) {
    //let [checked, setChecked] = React.useState(false);
    const settings = useAppSettings((state) => state.appSettings)
    const [tempSettings, setTempSettings] = useState(settings)

    let hide = show ? " open" : "";

    const buttonCreate = (forRole: string, con1: any, con2: any) => {
        
        return (
            <ToggleButtonGroup type="radio" name={forRole} className="mb-2 warning" value={tempSettings[forRole]}>
                <ToggleButton id={forRole + "-toggle-1"}
                              value={con1} className={"btn-dark"} onClick={() => setTempSettings(currentState => ({
                    ...currentState,
                    [forRole]: con1
                }))}>
                    {typeof con1 === "boolean" ? "Yes" : con1}
                </ToggleButton>
                <ToggleButton id={forRole + "-toggle-2"}
                              value={con2} className={"btn-dark"} onClick={() => setTempSettings(currentState => ({
                    ...currentState,
                    [forRole]: con2
                }))}>
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
            <button onClick={() => console.log(tempSettings)}>submit</button>
        </div>
    );
}

export default SettingsDropDown;