import {Button, Form, Tab, Tabs} from 'react-bootstrap';
import {days, endTimes, meetingBasis, startTimes, warnings} from "../helpers/appSettings";
import {useState} from "react";
import {Employee} from "../employeeInterface.tsx";

interface Props {
    show: boolean;
}

function AddEmployee({show}: Props) {
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
    let [checked, setChecked] = useState({sunday: false, monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false});

    let hide = show ? " open" : "";

    const handleSubmit = (e:any) => {
        e.preventDefault();

        let daysWorked = ''
        let daysAbrv = ["S", "M", "T", "W", "R", "F", "Y"]

        for(let i = 0; i < 7; i++){
            let day = days[i].toLowerCase();
            // @ts-ignore
            if(checked[day] === true){
                daysWorked += daysAbrv[i]
            }else{
                daysWorked += "-"
            }
        }
        setEmployee(currentState => ({...currentState, daysWorked: daysWorked}))
        //console.log(employee)

    }

    const handleCheckBox =(e: any, key: string)=>{
        let day = key.toLowerCase()
        setChecked({...checked, [day]: e.target.checked})
        //console.log("value is: " + e.target.checked + ", and key is: " + key)
    }

    return (
        <div className={"box " + hide}>
            <Tabs
                defaultActiveKey="addEmployee"
                id="uncontrolled-tab"
                className="mb-3">

                <Tab eventKey="addEmployee" title="Add Team Member">
                    <Form onSubmit={handleSubmit}>
                        <div className="d-flex flex-row justify-content-start mb-3 secondary">
                            <Form.Group className="mb-3 ms-2" controlId="shiftStart">
                                <Form.Label>Shift Start</Form.Label>
                                <Form.Select id="shiftStart" className="w-10" value={employee.shiftStart} onChange={(e)=> setEmployee(currentState => ({...currentState, shiftStart: e.target.value}))}>
                                    <option value=""></option>
                                    {startTimes.map((time) => <option value={time}>{time}</option>)}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="shiftEnd">
                                <Form.Label>Shift End</Form.Label>
                                <Form.Select id="shiftEnd" className="w-10" value={employee.shiftEnd} onChange={(e)=> setEmployee(currentState => ({...currentState, shiftEnd: e.target.value}))}>
                                    <option value=""></option>
                                    {endTimes.map((time) => <option>{time}</option>)}
                                </Form.Select>
                            </Form.Group>
                            <div className="d-flex flex-column">
                                <Form.Label>Days Worked:</Form.Label>
                                <div className="">
                                    {days.map((day) => <Form.Check
                                        inline
                                        label={day}
                                        name={day}
                                        type="checkbox"
                                        id={day}
                                        className="checkbox-1"
                                        onChange={(e)=> handleCheckBox(e, day)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-start p-1 mb-3 secondary">
                            <Form.Group className="mb-3 w-10 ms-1" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Jane"/>
                            </Form.Group>
                            <Form.Group className="mb-3 w-10" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Doe"/>
                            </Form.Group>
                            <Form.Group className="mb-3 w-20" controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="text" placeholder="j.doe@example.com"/>
                            </Form.Group>
                            <Form.Group className="mb-3 w-20" controlId="EEID">
                                <Form.Label>EE ID</Form.Label>
                                <Form.Control type="text" placeholder="CCRJDOE"/>
                            </Form.Group>
                        </div>


                        <div className="d-flex flex-row justify-content-start p-1 mb-3 secondary">
                            <Form.Group className="mb-3 ms-2" controlId="meetings">
                                <Form.Label>Meeting Frequency</Form.Label>
                                <Form.Select id="meetings" className="w-10">
                                    {meetingBasis.map((basis) => <option>{basis}</option>)}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3 ms-2" controlId="meetingsDay">
                                <Form.Label>Meeting Day</Form.Label>
                                <Form.Select id="meetings" className="w-10">
                                    {days.map((day) => <option>{day}</option>)}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3 ms-2" controlId="warnings">
                                <Form.Label>Warning</Form.Label>
                                <Form.Select id="warning" className="w-10">
                                    {warnings.map((warning) => <option>{warning}</option>)}
                                </Form.Select>
                            </Form.Group>
                            <div className="d-flex align-items-center">
                                <Button variant="primary" type="submit">
                                    Add Team Member
                                </Button>
                            </div>

                        </div>

                    </Form>
                </Tab>
                <Tab eventKey="addExcel" title="Add From Excel">
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Upload File for Batch processing</Form.Label>
                        <Form.Control type="file" size="lg"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Upload File
                    </Button>
                </Tab>
                <Tab eventKey="update" title="Update From Excel">
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Upload File for Batch processing and UPDATING current list</Form.Label>
                        <Form.Control type="file" size="lg"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Upload File
                    </Button>
                </Tab>
            </Tabs>
        </div>
    );
}

export default AddEmployee;