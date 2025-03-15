interface Props {
    isOpen: boolean;
    onClose: () => void;
    message: any;
    setConfirm: () => void;
}

function ConfirmModal({isOpen, onClose, message, setConfirm}: Props) {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-yellow-200/50 ${isOpen ? "block " : "hidden "}`}>
            <div className={"bg-white text-black p-1 pl-2 pr-2 rounded shadow-lg w-[35%] max-h-[95%] "}>
                <div className="flex justify-between">
                    <div className="w-90 prose">
                        <h2>Confirm Changes</h2>
                    </div>
                    <div className=" bg-black text-white p-2 rounded-md cursor-pointer" onClick={onClose}>
                        Close
                    </div>
                </div>
                <div className={"prose"}>
                    <p>{message.title}</p>
                    <ul>
                        {message.list.map((item: string) => <li classname>{item}</li>)}
                    </ul>
                </div>
                <div className="bg-red-600 rounded-md hover:bg-red-700 p-2 w-[50%] text-center ml-[25%]" onClick={setConfirm}>Confirm Changes</div>
            </div>
        </div>
    )
}

export default ConfirmModal
