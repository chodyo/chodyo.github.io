import React from "react";
import { render, screen } from "@testing-library/react";
import ChodyoApp from "./ChodyoApp";

test("renders a nice greeting", () => {
    render(<ChodyoApp />);
    const greetingElement = screen.getByText("Hi, my name is Cody!");
    expect(greetingElement).toBeInTheDocument();
});
