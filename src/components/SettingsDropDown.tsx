import {useAppSettings} from "../state/store.ts";
import RadioPill from "./TailwindElements/radioPill.tsx";

interface Props {
    show: boolean;
}

function SettingsDropDown({show}: Props) {
    let hide = show ? " open" : "";
    const saveToDB = useAppSettings.use.saveAppSettingsDB()

    const grouper = "pr-4"
    const inner = "p-1"
    return (
        <div className={"box " + hide}>
            <div className="flex">
                <div className={grouper}>
                    <div className={inner}>Sort By Time:</div>
                    <div className={inner}>{RadioPill("sortByTime", true, false)}</div>
                </div>
                <div className={grouper}>
                    <div className={inner}>Time Display:</div>
                    <div className={inner}>{RadioPill("hours", 12, 24)}</div>
                </div>
                <div className={grouper}>
                    <div className={inner}>Sort By Name:</div>
                    <div className={inner}>{RadioPill("sortByFirstName", true, false)}</div>
                </div>
                <div className={grouper}>
                    <div className={inner}>Color Mode:</div>
                    <div className={inner}>{RadioPill("colorMode", "light", "dark")}</div>
                </div>
                <div className={grouper}>
                    <div className="pt-3">
                        <button
                            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
                            onClick={() => saveToDB()}>Save Settings
                        </button>
                    </div>
                    <div className="text-xs text-gray-500">** Settings will not be saved unless submitted</div>
                </div>

            </div>

        </div>
    );
}

export default SettingsDropDown;