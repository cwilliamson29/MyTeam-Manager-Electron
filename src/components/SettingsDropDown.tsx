import {useAppSettings} from "../state/store.ts";
import RadioPill from "./TailwindElements/radioPill.tsx";

interface Props {
    show: boolean;
}

function SettingsDropDown({show}: Props) {
    let hide = show ? " open" : "";
    const saveToDB = useAppSettings.use.saveAppSettingsDB()

    return (
        <div className={"box " + hide}>
            <div className="flex">
                <div className="pe-3 align-self-center">Sort By Time:</div>
                <div className="pe-3 align-self-center">{RadioPill("sortByTime", true, false)}</div>
                <div className="pe-3 align-self-center">Time Display:</div>
                <div className="pe-3 align-self-center">{RadioPill("hours", 12, 24)}</div>
                <div className="pe-3 align-self-center">Sort By First Name:</div>
                <div className="pe-3 align-self-center">{RadioPill("sortByFirstName", true, false)}</div>
                <div className="pe-3 align-self-center">Color Mode:</div>
                <div className="pe-3 align-self-center">{RadioPill("colorMode", "light", "dark")}</div>
                <button className="btn btn-primary" onClick={() => saveToDB()}>Save</button>
            </div>

        </div>
    );
}

export default SettingsDropDown;