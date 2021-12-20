import React, { useState } from "react";

export const Page: React.FC = () => {
    document.title = "Submit Health Screen";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [floor, setFloor] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const student = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Floor: floor,
            Location: location,
            Type: "G",
            IsOther: "false",
            IsStudent: "1",
            State: "NY",
            Answer1: "0",
            Answer2: "0",
            Answer3: "0",
            ConsentType: "",
        };

        fetch("https://healthscreening.schools.nyc/home/submit", {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: new URLSearchParams(student),
            mode: "no-cors",
            // credentials: "same-origin",
        })
            .then((response) => {
                alert(`Response, ${JSON.stringify(response)}`);
            })
            .catch((error) => {
                alert(`Error, ${error}`);
            });
    };

    return (
        <div>
            <input
                type="text"
                required={true}
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />
            <input
                type="text"
                required={true}
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />
            <input
                type="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="number"
                required={true}
                onChange={(e) => setFloor(e.target.value)}
                value={floor}
            />
            <input
                type="text"
                required={true}
                onChange={(e) => setLocation(e.target.value)}
                value={location}
            />
            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default Page;
