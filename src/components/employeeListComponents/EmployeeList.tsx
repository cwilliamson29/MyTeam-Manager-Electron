import { colorOfDay, timeConvertT012, titleCase } from "../../helpers/employeeList-helpers.tsx";
import { useAppLoad, useAppSettings, useEmployeeData } from "../../state/store.ts";
import ModifyEmployee from "./modifyEmployee.tsx";

interface Props {
	id: any;
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

function EmployeeList({ id, shiftStart, shiftEnd, daysWorked, firstName, lastName, email, EEID, meetings, meetingsDay, warnings }: Props) {
	const color = colorOfDay(shiftStart);
	const settings = useAppSettings.use.appSettings();
	// ModifyID to show and hide the active modify section for each employee
	const modifyID = useEmployeeData.use.modifyID();
	const setModifyID = useEmployeeData.use.setModifyID();
	// AppLoad
	const appLoad = useAppLoad.use.appLoad();
	//const setAppLoad = useAppLoad.use.setAppLoad()
	// Arrange by First + Last ... or ... Last, First
	const firstLastName = titleCase(`${firstName + " " + lastName}`);
	const lastFirstName = titleCase(`${lastName + ", " + firstName}`);

	const css = " text-center text-[14px] border-r-[1px] border-dark ";
	const warning = "w-[9%] text-center text-[14px] bg-red-600 text-white";
	const noWarning = "w-[9%] text-center text-[14px]";

	const getById = useEmployeeData.use.getById();

	const handleClick = async () => {
		getById(id);

		if (modifyID === id.toString()) {
			setModifyID("");
		} else {
			setModifyID(id.toString());
		}
	};
	if (appLoad) {
		return <div>Loading....</div>;
	} else {
		return (
			<div key={id}>
				<div className={color + " flex align-start border-b border-dark justify-start font-bold hover:bg-blue-300"}>
					<div className={"w-[19%]" + css} onClick={() => handleClick()}>
						{settings.hours === 12 ? `${timeConvertT012(shiftStart) + " - " + timeConvertT012(shiftEnd)}` : `${shiftStart + " - " + shiftEnd}`}
					</div>
					<div className={"w-[10%]" + css} onClick={() => handleClick()}>
						{daysWorked}
					</div>
					<div className={"w-[22%]" + css} onClick={() => handleClick()}>
						{settings.sortByFirstName ? firstLastName : lastFirstName}
					</div>

					<div className={"w-[23%]" + css}>
						<a href={"mailto:" + email} className="underline text-blue-900 hover:text-slate-700">
							{email}
						</a>
					</div>

					<div className={"w-[12%]" + css} onClick={() => handleClick()}>
						{EEID.toUpperCase()}
					</div>
					<div className={"w-[22%]" + css} onClick={() => handleClick()}>
						{meetings === "none" ? "" : titleCase(meetings + " on " + meetingsDay)}
					</div>
					<div className={warnings === "none" ? noWarning : warning} onClick={() => handleClick()}>
						{warnings === "none" ? "" : warnings.toUpperCase()}
					</div>
				</div>
				{modifyID === id.toString() && <ModifyEmployee />}
			</div>
		);
	}
}

export default EmployeeList;
