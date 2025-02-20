import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";

interface Props {
    show: boolean;
}

//   {typeof con1 === "boolean" ? "Yes":con1}
function SettingsDropDown({show}: Props) {
    //let [checked, setChecked] = React.useState(false);
    let hide = show ? " open" : "";


    const buttonCreate = (forRole: any, con1: any, con2: any) => {
        return (
            <ToggleButtonGroup type="radio" name={forRole} className="mb-2 warning">
                <ToggleButton id={forRole + "-toggle-1"}
                              value={con1} className={"btn-dark"}>
                    {typeof con1 === "boolean" ? "Yes" : con1}
                </ToggleButton>
                <ToggleButton id={forRole + "-toggle-2"}
                              value={con2} className={"btn-dark"}>
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
            <div className="pe-3 align-self-center">{buttonCreate("sortFirst", true, false)}</div>
            <div className="pe-3 align-self-center">Color Mode:</div>
            <div className="pe-3 align-self-center">{buttonCreate("colorMode", "Light", "Dark")}</div>
        </div>
    );
}

export default SettingsDropDown;