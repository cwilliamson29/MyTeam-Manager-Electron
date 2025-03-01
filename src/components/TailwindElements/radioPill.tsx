import {useAppSettings} from "../../state/store.ts";
import {Settings} from "../../interfaces/employeeInterface.tsx";

function RadioPill(forRole: any, con1: any, con2: any) {
    const settings = useAppSettings.use.appSettings()
    const setSettings = useAppSettings.use.setAppSettings()

    return (
        <div className="flex bg-black rounded-2">
            <div className="p-3">
                <div className="flex items-center">
                    <input id={forRole + "-toggle-1"} type="radio" name={forRole} value={con1} checked={settings[forRole as keyof Settings] === con1}
                        // focus={settings[forRole as keyof Settings] === con1}
                           className="apperance-none checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                           onChange={() => setSettings(forRole, con1)}/>
                    <label htmlFor={forRole + "-toggle-1"} className="flex items-center cursor-pointer text-gray-600 text-sm font-normal">

                        {typeof con1 === "boolean" ? "Yes" : con1}
                    </label>
                </div>
            </div>
            <div className="bg-red inline-flex" dir="ltr">
                <div className="flex items-center rounded-s-lg">
                    <input id={forRole + "-toggle-2"} type="radio" name={forRole} value={con2} checked={settings[forRole as keyof Settings] === con2}
                           className="checked:bg-teal"
                           onChange={() => setSettings(forRole, con2)}/>
                    <label htmlFor={forRole + "-toggle-2"} className="flex items-center cursor-pointer text-gray-600 text-sm font-normal  mr-4">
                        {typeof con2 === "boolean" ? "No" : con2}
                    </label>
                </div>
            </div>
        </div>
    )
}

export default RadioPill
