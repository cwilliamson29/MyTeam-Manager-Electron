interface Props {
	isOpen: boolean;
	onClose: () => void;
}

function Help({ isOpen, onClose }: Props) {
	return (
		<div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 ${isOpen ? "block " : "hidden "}`}>
			<div className={"bg-gray-500 text-black p-1 pl-2 pr-2 rounded shadow-lg w-[95%] max-h-[93%] overflow-auto "}>
				<div className="flex justify-between">
					<div className="w-90 prose">
						<h2>Help FAQ</h2>
					</div>
					<div className=" bg-black text-white p-2 rounded-md cursor-pointer" onClick={onClose}>
						Close
					</div>
				</div>
				<div className="w-[100%] px-5 pb-3 help bg-white rounded-md mt-3">
					<h3>How do I add multiple team members by excel?</h3>
					<p>
						When adding team members by excel its best to keep in mind a specific format for the excel otherwise you will have problems importing data. Below is a
						screen shot of the base layout of your excel file.
						<br />
						add image...
						<br />
						Once your excel file meets this criteria then click "Add" at the top and then click "Add From Excel". Click the white space where it says "Choose File".
						Select your excel file and click open. Once excel file is selected you can click the "Upload File" button to show a preview of your team members. Be sure to
						select your team lead name before clicking "Generate".
					</p>

					<h3>What if my team members(s) EEID has changed?</h3>
					<p> Not a problem! Before importing the new file just change the employee(s) new EEID making sure it matches 100%.</p>

					<h3>Why does my team member display as a black bar?</h3>
					<p>
						By default a black bar indicates an overnight team member, however in the case of a team member who is not overnight it indicates an issue with shift start
						time. At this moment only times of XX:00 and XX:30, or 30 minute increments, is recognized. Current work around is to modify start time to allowed increment
						or leave it black. This is a known bug and currently being worked on.
					</p>

					<h3>Can I remove all team members at once?</h3>
					<p> Yes! By adding team members by excel (NOT update by excel) it will remove all current team members saved.</p>

					<h3>Will I loose my notes for team members when I update by excel?</h3>
					<p>
						No! By updating from excel it leaves all team members saved notes. Updating by excel uses the "EEID" column to find and update current team members with
						their new information like shift and work days.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Help;
