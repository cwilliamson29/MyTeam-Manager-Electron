import {Button, Form, Tab, Tabs} from 'react-bootstrap';
import {days, endTimes, meetingBasis, startTimes, warnings} from "../helpers/appSettings";

interface Props {
    show: boolean;
}

function AddEmployee({show}: Props) {
    let hide = show ? " open" : "";
    return (
        <div className={"box " + hide}>
            <Tabs
                defaultActiveKey="addEmployee"
                id="uncontrolled-tab"
                className="mb-3">

                <Tab eventKey="addEmployee" title="Add Team Member">
                    <Form>
                        <div className="d-flex flex-row justify-content-start mb-3 secondary">
                            <Form.Group className="mb-3 ms-2" controlId="shiftStart">
                                <Form.Label>Shift Start</Form.Label>
                                <Form.Select id="shiftEnd" className="w-10">
                                    {startTimes.map((time) => <option>{time}</option>)}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="shiftEnd">
                                <Form.Label>Shift End</Form.Label>
                                <Form.Select id="shiftEnd" className="w-10">
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
                                        className="checkbox-1"/>
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