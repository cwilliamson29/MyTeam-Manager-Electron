import {timeConvertT024} from "../../helpers/employeeList-helpers.tsx";

interface Props {
    name: string;
    keyValue: string;
    time: string[];
    error: boolean;
    value: string;
    setter: (key: string, val: string) => void;
}

function SelectBoxTime({name, keyValue, time, error, value, setter}: Props) {
    const noError = "text-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const hasError = "bg-red-50 border border-red-500 text-red-900 text-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    return (
        <div className="max-w-sm mx-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">{name}</label>
            <select id="shiftStart"
                    className={error ? hasError : noError}
                    value={value}
                    onChange={(e) => setter(keyValue, e.target.value)} required>
                <option value=""></option>
                {time.map((time) => <option key={time} value={timeConvertT024(time)}>{time}</option>)}
            </select>
        </div>
    )
}

export default SelectBoxTime
