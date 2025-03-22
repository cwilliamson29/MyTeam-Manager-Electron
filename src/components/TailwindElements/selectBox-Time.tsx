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
    const noError = "text-xs bg-gray-700 border border-gray-500 white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
    const hasError = "bg-red-500 border border-red-500 text-red-900 text-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"

    return (
        <div className="w-[125px] mx-2">
            <label className="block mb-2 text-sm font-medium text-white text-left">{name}</label>
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
