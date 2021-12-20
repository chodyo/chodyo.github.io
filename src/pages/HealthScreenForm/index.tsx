import React, { useEffect, useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";

import { LoadingIcon, SuccessIcon, ErrorIcon } from "../../components/Icons";

// https://dev.to/fuchodeveloper/dynamic-form-fields-in-react-1h6c

interface student {
    firstName: string;
    lastName: string;
    floor: string;
    location: string;

    // convenience to use bracket notation instead of building a switch
    [index: string]: string;
}

interface fields {
    email: string;
    students: student[];
}

const localStorageKey = "healthScreenFormFields";

export const Page: React.FC = () => {
    document.title = "Submit Health Screen";

    const [showModal, setShowModal] = useState(false);
    const [submittable, setSubmittable] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submittingResults, setSubmittingResults] = useState(new Map());
    const [fields, setInputFields] = useState<fields>({
        email: "",
        students: [],
    });

    useEffect(() => {
        console.debug("useEffect::");
        loadFromLocalStorage();
    }, []);

    const handleModalClose = () => {
        console.debug("handleModalClose::");
        setShowModal(false);
        setSubmittable(true);
        setSubmitting(false);
        setSubmittingResults(new Map());
    };

    const handleSubmittingBegin = () => {
        console.debug("handleSubmittingBegin::");
        saveToLocalStorage();
        setSubmittable(false);
        setSubmitting(true);
        setSubmittingResults(new Map());
        setShowModal(true);
    };

    const handleSubmittingResult = (firstName: string, succeeded: boolean) => {
        console.debug("handleSubmittingResult::", firstName, succeeded);
        const resultsMap = submittingResults;
        resultsMap.set(firstName, succeeded);
        setSubmittingResults(resultsMap);
    };

    const handleSubmittingDone = () => {
        console.debug("handleSubmittingDone::");
        setSubmitting(false);
    };

    const handleAddStudent = () => {
        console.debug("handleAddStudent::", JSON.stringify(fields));
        const students = [...fields.students];
        students.push({ firstName: "", lastName: "", floor: "", location: "" });
        setInputFields({
            ...fields,
            students: students,
        });
    };

    const handleRemoveStudent = (i: number) => {
        console.debug("handleRemoveStudent::", JSON.stringify(fields));
        const students = [...fields.students];
        students.splice(i, 1);
        setInputFields({
            ...fields,
            students: students,
        });
    };

    const handleInputChange = (i: number, e: React.ChangeEvent) => {
        // this is a hack around not being able to find `FormControlElement`
        const target = e.target as HTMLInputElement;

        console.debug("handleInputChange::", target.name, target.value, JSON.stringify(fields));

        if (target.name === "email") {
            setInputFields({
                ...fields,
                email: target.value,
            });
            return;
        }

        const students = [...fields.students];
        students[i][target.name] = target.value;
        setInputFields({
            ...fields,
            students: students,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        console.debug("handleSubmit::", JSON.stringify(fields));
        e.preventDefault();

        if (fields.students.length === 0) {
            alert("You must provide information for at least one student.");
            return;
        }

        handleSubmittingBegin();

        const requests = fields.students.map((student, i) => {
            const req = {
                FirstName: student.firstName,
                LastName: student.lastName,
                Email: fields.email,
                Floor: student.floor,
                Location: student.location,
                Type: "G",
                IsOther: "false",
                IsStudent: "1",
                State: "NY",
                Answer1: "0",
                Answer2: "0",
                Answer3: "0",
                ConsentType: "",
            };

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    handleSubmittingResult(student.firstName, true);
                    resolve(1);
                }, (i + 1) * 5000 * Math.random());
            });

            // fetch("https://healthscreening.schools.nyc/home/submit", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type":
            //             "application/x-www-form-urlencoded; charset=UTF-8",
            //     },
            //     body: new URLSearchParams(student),
            //     mode: "no-cors",
            //     // credentials: "same-origin",
            // })
            //     .then((response) => {
            //         alert(`Response, ${JSON.stringify(response)}`);
            //     })
            //     .catch((error) => {
            //         alert(`Error, ${error}`);
            //     });
        });

        Promise.all(requests)
            .then((response) => console.debug(response))
            .catch((error) => console.error("failed to send requests", error))
            .finally(() => handleSubmittingDone());
    };

    const saveToLocalStorage = () => {
        console.debug("saveToLocalStorage::");
        localStorage.setItem(localStorageKey, JSON.stringify(fields));
    };

    const loadFromLocalStorage = () => {
        console.debug("loadFromLocalStorage::");
        const fields = localStorage.getItem(localStorageKey) || `{"email": "","students": []}`;
        const parsedFields = JSON.parse(fields);
        setInputFields(parsedFields);
    };

    return (
        <Form onSubmit={handleSubmit} className="col-centered">
            <Row className="room-to-breathe">
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>Unofficial Health Screener Submission</h1>
                    <h2>For Your Students</h2>

                    <Form.Group style={{ margin: "2em 0em" }}>
                        <Form.Label htmlFor="email">Your email</Form.Label>
                        <Form.Control
                            type="email"
                            id="email"
                            name="email"
                            value={fields.email}
                            required={true}
                            onChange={(e) => handleInputChange(0, e)}
                        />
                    </Form.Group>

                    {fields.students.map((student, i) => (
                        <div
                            key={"student-" + i}
                            className="room-to-breathe"
                            style={{
                                borderTop: "2px solid rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <Form.Group key={"firstName-" + i} className="room-to-breathe">
                                <Form.Label key={"firstName-label-" + i} htmlFor="firstName">
                                    Student's first name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    key={"firstName-control-" + i}
                                    name="firstName"
                                    value={student.firstName}
                                    required={true}
                                    onChange={(e) => handleInputChange(i, e)}
                                />
                            </Form.Group>

                            <Form.Group key={"lastName-" + i} className="room-to-breathe">
                                <Form.Label key={"lastName-label-" + i} htmlFor="lastName">
                                    Student's last name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    key={"lastName-control-" + i}
                                    name="lastName"
                                    value={student.lastName}
                                    required={true}
                                    onChange={(e) => handleInputChange(i, e)}
                                />
                            </Form.Group>

                            <Form.Group key={"floor-" + i} className="room-to-breathe">
                                <Form.Label key={"floor-label-" + i} htmlFor="floor">
                                    Student's classroom floor
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    key={"floor-control-" + i}
                                    name="floor"
                                    value={student.floor}
                                    required={true}
                                    onChange={(e) => handleInputChange(i, e)}
                                />
                            </Form.Group>

                            <Form.Group key={"location-" + i} className="room-to-breathe">
                                <Form.Label key={"location-label" + i} htmlFor="location">
                                    School location code
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    key={"location-control" + i}
                                    name="location"
                                    value={student.location}
                                    placeholder="M217 for PS/IS 217"
                                    required={true}
                                    onChange={(e) => handleInputChange(i, e)}
                                />
                            </Form.Group>

                            <Button
                                variant="outline-secondary"
                                size="sm"
                                key={"remove-" + i}
                                className="room-to-breathe"
                                onClick={() => handleRemoveStudent(i)}
                            >
                                Remove student
                            </Button>
                        </div>
                    ))}

                    <div
                        className="room-to-breathe"
                        style={{
                            padding: "1em 0em",
                            borderTop: "2px solid rgba(0, 0, 0, 0.1)",
                            borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Button variant="outline-primary" onClick={() => handleAddStudent()}>
                            Add another student
                        </Button>
                    </div>

                    <Form.Group>
                        <Form.Label>By clicking submit, you affirm that:</Form.Label>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item>Your student is not experiencing any symptoms of COVID-19.</ListGroup.Item>
                            <ListGroup.Item>
                                Your student has not tested positive for COVID-19 in the past 10 days.
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Your student is considered fully vaccinated against COVID-19 by CDC guidelines.
                            </ListGroup.Item>
                        </ListGroup>
                        <Form.Text>
                            If any of the above conditons do not apply to you, please use the{" "}
                            <a href="https://healthscreening.schools.nyc/">official health screener</a> instead.
                        </Form.Text>
                    </Form.Group>

                    <Button
                        disabled={!submittable}
                        variant="primary"
                        size="lg"
                        className="room-to-breathe"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Body>
                    <ProgressBar animated={submitting}>
                        {fields.students.map((student, i) => (
                            <ProgressBar
                                key={"progress-" + i}
                                variant={
                                    submittingResults.has(student.firstName)
                                        ? submittingResults.get(student.firstName)
                                            ? "success"
                                            : "danger"
                                        : "warning"
                                }
                                animated={submitting}
                                now={100 / fields.students.length}
                            />
                        ))}
                    </ProgressBar>
                    <dl className="row room-to-breathe">
                        {fields.students.map((student, i) => {
                            return (
                                <Row key={"student-status-row-" + i}>
                                    <Col xs={{ span: 6, offset: 2 }} key={"student-status-name-col-" + i}>
                                        <dt style={{ textAlign: "left" }} key={"student-status-name-dt-" + i}>
                                            {student.firstName}
                                        </dt>
                                    </Col>
                                    <Col xs={{ span: 2, offset: -2 }} key={"student-status-result-col-" + i}>
                                        <dd style={{ textAlign: "right" }} key={"student-status-result-dd-" + i}>
                                            {submittingResults.has(student.firstName) ? (
                                                submittingResults.get(student.firstName) ? (
                                                    <SuccessIcon key={"student-status-result-success-" + i} />
                                                ) : (
                                                    <ErrorIcon key={"student-status-result-error-" + i} />
                                                )
                                            ) : (
                                                <LoadingIcon key={"student-status-result-loading-" + i} />
                                            )}
                                        </dd>
                                    </Col>
                                </Row>
                            );
                        })}
                    </dl>
                </Modal.Body>
            </Modal>
        </Form>
    );
};

export default Page;
