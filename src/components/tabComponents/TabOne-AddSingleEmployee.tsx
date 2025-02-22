import {useEffect, useState} from "react";
import {Employee} from "../../employeeInterface.tsx";
import {addEmployeeHelper} from "../../helpers/addEmployeeHelper.tsx";
import {Button, Form} from "react-bootstrap";
import {
    days,
    employeeBooleanTemplate,
    endTimes,
    meetingBasis,
    startTimes,
    warnings
} from "../../helpers/appSettings.tsx";
import {EmployeeValidator} from "../../helpers/TabOneValidation.tsx";
import {EmployeeValidation} from "../../interfaces/employeeInterface.tsx";

interface Props {
    submit: () => boolean;
}

export default function TabOneAddSingleEmployee({submit}: Props) {
    let [error, setError] = useState<EmployeeValidation>(employeeBooleanTemplate)
    let [valid, setValid] = useState(true)
    let [employee, setEmployee] = useState<Employee>({
        id: 0,
        shiftStart: '',
        shiftEnd: '',
        daysWorked: '',
        firstName: '',
        lastName: '',
        email: '',
        EEID: '',
        meetings: '',
        meetingsDay: '',
        warnings: ''
    })
    let [checked, setChecked] = useState({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
    });
    let [daysWorked, setDaysWorked] = useState('-------')

    useEffect(() => {
        const days = daysWorked.split('')

        // If statments to change string position values based on day abbreviation and boolean
        // Sunday
        if (checked.sunday && days[0] === "-") days[0] = "S";
        if (!checked.sunday) days[0] = "-";
        // Monday
        if (checked.monday && days[1] === "-") days[1] = "M";
        if (!checked.monday) days[1] = "-";
        // Tuesday
        if (checked.tuesday && days[2] === "-") days[2] = "T";
        if (!checked.tuesday) days[2] = "-";
        // Wednesday
        if (checked.wednesday && days[3] === "-") days[3] = "W";
        if (!checked.wednesday) days[3] = "-";
        // Thursday
        if (checked.thursday && days[4] === "-") days[4] = "R";
        if (!checked.thursday) days[4] = "-";
        // Friday
        if (checked.friday && days[5] === "-") days[5] = "F";
        if (!checked.friday) days[5] = "-";
        // Sunday
        if (checked.saturday && days[6] === "-") days[6] = "Y";
        if (!checked.saturday) days[6] = "-";
        // Combine back to string and save
        let result = days.join('')
        setDaysWorked(result)
        setEmployee(currentState => ({...currentState, daysWorked: result}))

    }, [checked]);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Validate Employee
        let result = EmployeeValidator(employee)

        if (result.result) {
            // Send to database via Dexie
            submit(true);
            addEmployeeHelper(employee);
        } else if (!result.result) {
            setError(result.error)
            setValid(false)
            console.log(result.error)
        }

        //console.log(employee)

    }

    const handleCheckBox = (e: any, key: string) => {

        //Determines checked with true/false and saves to checked variable
        let day = key.toLowerCase()
        setChecked({...checked, [day]: e.target.checked})
        //console.log("value is: " + e.target.checked + ", and key is: " + key)
    }

    return (

        <Form onSubmit={handleSubmit}>
            {!valid &&
                <div className="d-flex flex-row justify-content-start mb-3 ps-3 secondary bg-danger ">
                    <span>*Fields required</span>
                </div>
            }
            <div className="d-flex flex-row justify-content-start mb-3 secondary">
                <Form.Group className="mb-3 ms-2" controlId="shiftStart">
                    <Form.Label>Shift Start</Form.Label>
                    <Form.Select id="shiftStart"
                                 className={error.shiftStart ? "w-10 border border-2 border-danger" : "w-10"}
                                 value={employee.shiftStart}
                                 onChange={(e) => setEmployee(currentState => ({
                                     ...currentState,
                                     shiftStart: e.target.value
                                 }))}>
                        <option value=""></option>
                        {startTimes.map((time) => <option key={time} value={time}>{time}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="shiftEnd">
                    <Form.Label>Shift End</Form.Label>
                    <Form.Select id="shiftEnd"
                                 className={error.shiftEnd ? "w-10 border border-2 border-danger" : "w-10"}
                                 value={employee.shiftEnd}
                                 onChange={(e) => setEmployee(currentState => ({
                                     ...currentState,
                                     shiftEnd: e.target.value
                                 }))}>
                        <option value=""></option>
                        {endTimes.map((time) => <option key={time} value={time}>{time}</option>)}
                    </Form.Select>
                </Form.Group>
                <div className="d-flex flex-column">
                    <Form.Label>Days Worked:</Form.Label>
                    <div className="">
                        {days.map((day) => <Form.Check
                                key={day}
                                inline
                                label={day}
                                name={day}
                                type="checkbox"
                                id={day}
                                className="checkbox-1"
                                onChange={(e) => handleCheckBox(e, day)}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-start p-1 mb-3 secondary">
                <Form.Group className="mb-3 w-10 ms-1" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Jane"
                                  className={error.firstName ? "border border-2 border-danger" : ""}
                                  onChange={(e) => setEmployee(currentState => ({
                                      ...currentState,
                                      firstName: e.target.value
                                  }))}/>
                </Form.Group>
                <Form.Group className="mb-3 w-10" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Doe"
                                  className={error.lastName ? "border border-2 border-danger" : ""}
                                  onChange={(e) => setEmployee(currentState => ({
                                      ...currentState,
                                      lastName: e.target.value
                                  }))}/>
                </Form.Group>
                <Form.Group className="mb-3 w-20" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="text" placeholder="j.doe@example.com"
                                  className={error.email ? "border border-2 border-danger" : ""}
                                  onChange={(e) => setEmployee(currentState => ({
                                      ...currentState,
                                      email: e.target.value
                                  }))}/>
                </Form.Group>
                <Form.Group className="mb-3 w-20" controlId="EEID">
                    <Form.Label>EE ID</Form.Label>
                    <Form.Control type="text" placeholder="CCRJDOE"
                                  className={error.email ? "border border-2 border-danger" : ""}
                                  onChange={(e) => setEmployee(currentState => ({
                                      ...currentState,
                                      EEID: e.target.value
                                  }))}/>
                </Form.Group>
            </div>


            <div className="d-flex flex-row justify-content-start p-1 mb-3 secondary">
                <Form.Group className="mb-3 ms-2" controlId="meetings">
                    <Form.Label>Meeting Frequency</Form.Label>
                    <Form.Select id="meetings"
                                 className={error.meetings ? "w-10 border border-2 border-danger" : "w-10"}
                                 onChange={(e) => setEmployee(currentState => ({
                                     ...currentState,
                                     meetings: e.target.value
                                 }))}>
                        <option value=""></option>
                        {meetingBasis.map((basis) => <option key={basis} value={basis}>{basis}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 ms-2" controlId="meetingsDay">
                    <Form.Label>Meeting Day</Form.Label>
                    <Form.Select id="meetings"
                                 className={error.meetings ? "w-10 border border-2 border-danger" : "w-10"}
                                 onChange={(e) => setEmployee(currentState => ({
                                     ...currentState,
                                     meetingsDay: e.target.value
                                 }))}>
                        <option value=""></option>
                        {days.map((day) => <option key={day} value={day}>{day}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 ms-2" controlId="warnings">
                    <Form.Label>Warning</Form.Label>
                    <Form.Select id="warning" className={error.warnings ? "w-10 border border-2 border-danger" : "w-10"}
                                 onChange={(e) => setEmployee(currentState => ({
                                     ...currentState,
                                     warnings: e.target.value
                                 }))}>
                        <option value=""></option>
                        {warnings.map((warning) => <option key={warning} value={warning}>{warning}</option>)}
                    </Form.Select>
                </Form.Group>
                <div className="d-flex align-items-center">
                    <Button variant="primary" type="submit">
                        Add Team Member
                    </Button>
                </div>

            </div>

        </Form>

    )
}
