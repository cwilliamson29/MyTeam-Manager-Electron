import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {useAppSettings} from "../../../state/store.ts";

function TempTitle() {
    const styles = " text-center text-bold text-[16px] border-black border-b-[1px] "
    const settings = useAppSettings.use.appSettings()

    return (
        <div className={"flex align-start justify-start " + settings.colorMode + "-mode"}>
            <div className={"w-[19%] cursor-pointer" + styles}>
                Time <FontAwesomeIcon icon={faArrowDown} className={''}/>
            </div>
            <div className={"w-[10%]" + styles}>Work Days</div>
            <div className={"w-[22%]" + styles}>
                <div className="flex justify-around cursor-pointer">
                    <div className={"hover:text-[#70ace4]" + styles}>
                        <FontAwesomeIcon icon={faArrowDown} className={''}/>
                        By First
                    </div>
                    <div className={"hover:text-[#70ace4]" + styles}>
                        By Last
                        <FontAwesomeIcon icon={faArrowDown} className={''}/>
                    </div>
                </div>

            </div>
            <div className={"w-[23%]" + styles}>Email</div>
            <div className={"w-[12%]" + styles}>EE ID</div>
            <div className={"w-[22%]" + styles}>
                Meetings
            </div>
            <div className={"w-[9%]" + styles}>
                Warnings
            </div>
        </div>
    )
}

export default TempTitle
