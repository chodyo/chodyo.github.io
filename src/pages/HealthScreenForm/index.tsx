import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

export const Page: React.FC = () => {
    document.title = "Submit Health Screen";

    const [fields, setInputFields] = useState<fields>({
        email: "",
        students: [],
    });

    const handleAddStudent = () => {
        console.log("handleAddStudent::", JSON.stringify(fields));
        const students = [...fields.students];
        students.push({ firstName: "", lastName: "", floor: "", location: "" });
        setInputFields({
            ...fields,
            students: students,
        });
    };

    const handleRemoveStudent = (i: number) => {
        console.log("handleRemoveStudent::", JSON.stringify(fields));
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

        console.log(
            "handleInputChange::",
            target.name,
            target.value,
            JSON.stringify(fields)
        );

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
        console.log("handleSubmit::", JSON.stringify(fields));
        e.preventDefault();

        if (fields.students.length === 0) {
            alert("Click the + button to add student information.");
            return;
        }

        fields.students.forEach((student) => {
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

            console.log("req sent", JSON.stringify(req));

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
    };

    return (
        <Form
            onSubmit={handleSubmit}
            className="col-centered"
            style={{ marginTop: "1em" }}
        >
            <Row>
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
                            onChange={(e) => handleInputChange(0, e)}
                        />
                    </Form.Group>

                    {fields.students.map((student, i) => (
                        <div
                            style={{
                                borderTop: "2px solid rgba(0, 0, 0, 0.1)",
                                padding: "1em",
                                margin: "1em 0em",
                            }}
                        >
                            <Form.Group className="room-to-breathe">
                                <Form.Label htmlFor="firstName">
                                    Student's first name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={student.firstName}
                                    onChange={(e) => handleInputChange(i, e)}
                                />
                            </Form.Group>

                            <Form.Group className="room-to-breathe">
                                <Form.Label htmlFor="lastName">
                                    Student's last name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={student.lastName}
                                    onChange={(e) => handleInputChange(i, e)}
                                />
                            </Form.Group>

                            <Form.Group className="room-to-breathe">
                                <Form.Label htmlFor="floor">
                                    Student's classroom floor
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    id="floor"
                                    name="floor"
                                    value={student.floor}
                                    onChange={(e) => handleInputChange(i, e)}
                                />
                            </Form.Group>

                            <Form.Group className="room-to-breathe">
                                <Form.Label htmlFor="location">
                                    School location code
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={student.location}
                                    placeholder="M217 for PS/IS 217"
                                    onChange={(e) => handleInputChange(i, e)}
                                />
                            </Form.Group>

                            <Button
                                className="room-to-breathe"
                                onClick={() => handleRemoveStudent(i)}
                            >
                                Remove student
                            </Button>
                        </div>
                    ))}

                    <Button
                        onClick={() => handleAddStudent()}
                        style={{ margin: "1em 0em" }}
                    >
                        Add student
                    </Button>

                    <Form.Group>
                        <Form.Label>
                            By clicking submit, you affirm that:
                        </Form.Label>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item>
                                Your student is not experiencing any symptoms of
                                COVID-19.
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Your student has not tested positive for
                                COVID-19 in the past 10 days.
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Your student is considered fully vaccinated
                                against COVID-19 by CDC guidelines.
                            </ListGroup.Item>
                        </ListGroup>
                        <Form.Text>
                            If any of the above conditons do not apply to you,
                            please use the{" "}
                            <a href="https://healthscreening.schools.nyc/">
                                official health screener
                            </a>{" "}
                            instead.
                        </Form.Text>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        style={{ margin: "1em 0em" }}
                    >
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default Page;
