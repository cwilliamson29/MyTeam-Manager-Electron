import {colorOfDay, timeConvertT012, titleCase} from "../../../helpers/employeeList-helpers.tsx";
import {useAppSettings} from "../../../state/store.ts";

interface Props {
    shiftStart: string;
    shiftEnd: string;
    daysWorked: string;
    firstName: string;
    lastName: string;
    email: string;
    EEID: string;
    meetings: string;
    meetingsDay: string;
    warnings: string;
}

function TempDisplay({
                         shiftStart,
                         shiftEnd,
                         daysWorked,
                         firstName,
                         lastName,
                         email,
                         EEID,
                         meetings,
                         meetingsDay,
                         warnings,
                     }: Props) {
    const color = colorOfDay(shiftStart)
    const settings = useAppSettings.use.appSettings()
    // Arrange by First + Last ... or ... Last, First
    const firstLastName = titleCase(`${firstName + " " + lastName}`);
    const lastFirstName = titleCase(`${lastName + ", " + firstName}`);

    const css = " text-center text-[14px] border-r-[1px] border-dark "
    const warning = "w-[9%] text-center text-[14px] bg-red-600 text-white"
    const noWarning = "w-[9%] text-center text-[14px]"


    return (
        <div>
            <div className={color + " flex align-start border-b border-dark justify-start font-bold hover:bg-blue-300"}>
                <div className={"w-[19%]" + css}>
                    {settings.hours === 12 ? `${timeConvertT012(shiftStart) + " - " + timeConvertT012(shiftEnd)}` : `${shiftStart + " - " + shiftEnd}`}
                </div>
                <div className={"w-[10%]" + css}>{daysWorked}</div>
                <div className={"w-[22%]" + css}>
                    {settings.sortByFirstName ? firstLastName : lastFirstName}
                </div>
                <div className={"w-[23%]" + css}>{email}</div>
                <div className={"w-[12%]" + css}>{EEID.toUpperCase()}</div>
                <div className={"w-[22%]" + css}>
                    {meetings === "none" ? "" : titleCase(meetings + " on " + meetingsDay)}
                </div>
                <div
                    className={warnings === "none" ? noWarning : warning}>
                    {warnings === "none" ? '' : warnings.toUpperCase()}
                </div>
            </div>
        </div>

    );

}

export default TempDisplay;
