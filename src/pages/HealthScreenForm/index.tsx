import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Student } from "../../components/Student";

export const Page: React.FC = () => {
    document.title = "Submit Health Screen";

    const [students, setStudents] = useState([]);
    const [email, setEmail] = useState([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        students.forEach((student) => {
            const req = {
                // FirstName: student.firstName,
                // LastName: student.lastName,
                Email: email,
                // Floor: student.floor,
                // Location: student.location,
                Type: "G",
                IsOther: "false",
                IsStudent: "1",
                State: "NY",
                Answer1: "0",
                Answer2: "0",
                Answer3: "0",
                ConsentType: "",
            };

            alert("sent");
            console.log("req", JSON.stringify(req));

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
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col xl={true} />
                <Col xl={true}>
                    <h1>Unofficial Health Screener Submission</h1>
                    <h2>For Your Students</h2>

                    <Form.Group>
                        <Form.Label>Your email</Form.Label>
                        <Form.Control type="email" name="Email" />
                    </Form.Group>

                    <br />

                    <Student />

                    <Form.Group>
                        <Form.Label>
                            By clicking submit, you affirm that:
                        </Form.Label>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item>
                                You are not experiencing any symptoms of
                                COVID-19.
                            </ListGroup.Item>
                            <ListGroup.Item>
                                You have not tested positive for COVID-19 in the
                                past 10 days.
                            </ListGroup.Item>
                            <ListGroup.Item>
                                You are considered fully vaccinated against
                                COVID-19 by CDC guidelines.
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

                    <br />

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
                <Col xl={true} />
            </Row>
        </Form>
    );
};

export default Page;
