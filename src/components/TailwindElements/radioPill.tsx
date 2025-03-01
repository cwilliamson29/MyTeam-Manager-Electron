import {useAppSettings} from "../../state/store.ts";
import {Settings} from "../../interfaces/employeeInterface.tsx";
import {titleCase} from "../../helpers/employeeList-helpers.tsx";

function RadioPill(forRole: any, con1: any, con2: any) {
    const settings = useAppSettings.use.appSettings()
    const setSettings = useAppSettings.use.setAppSettings()

    const clicked = "bg-blue-600 rounded-full p-1"
    const notClicked = "rounded-full p-1"
    const labelCSS = "flex items-center cursor-pointer text-white text-sm font-normal pl-2 pr-2"

    let con1Title
    let con2Title

    if (typeof con1 === "string") {
        con1Title = titleCase(con1)
        con2Title = titleCase(con2)
    } else if (typeof con1 === "boolean" && forRole === "sortByFirstName") {
        con1Title = "First"
        con2Title = "Last"
    } else if (typeof con1 === "boolean" && forRole !== "sortByFirstName") {
        con1Title = "Yes"
        con2Title = "No"
    } else {
        con1Title = con1
        con2Title = con2
    }

    return (
        <div className="flex bg-gray-500 rounded-full">
            <div className={settings[forRole as keyof Settings] === con1 ? clicked : notClicked}>
                <div className="flex items-center">
                    <input id={forRole + "-toggle-1"} type="radio" name={forRole} value={con1} checked={settings[forRole as keyof Settings] === con1}
                           onChange={() => setSettings(forRole, con1)}/>
                    <label htmlFor={forRole + "-toggle-1"} className={labelCSS}>
                        {con1Title}
                    </label>
                </div>
            </div>
            <div className={settings[forRole as keyof Settings] === con2 ? clicked : notClicked}>
                <div className="flex items-center">
                    <input id={forRole + "-toggle-2"} type="radio" name={forRole} value={con2} checked={settings[forRole as keyof Settings] === con2}
                           onChange={() => setSettings(forRole, con2)}/>
                    <label htmlFor={forRole + "-toggle-2"} className={labelCSS}>
                        {con2Title}
                    </label>
                </div>
            </div>
        </div>
    )
}

export default RadioPill
