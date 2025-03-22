interface Props {
    name: string;
    type: string;
    placeHolder: string;
    value: string;
    keyValue: string;
    setter: (key: string, val: string) => void
}

function TextBox({name, type, placeHolder, value, keyValue, setter}: Props) {
    return (
        <div className="w-[175px] mb-5 pl-2">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-white text-left">{name}</label>
            <input type={type} id={keyValue} value={value} onChange={(e) => setter(keyValue, e.target.value)}
                   className="border  text-white text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 bg-gray-700 border-gray-500 placeholder-gray-400 "
                   placeholder={placeHolder} required/>
        </div>
    )
}

export default TextBox
