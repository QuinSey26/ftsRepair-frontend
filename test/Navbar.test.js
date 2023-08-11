import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../Navbar";

jest.mock("../hooks/useLogout", () => ({
  useLogout: () => ({ logout: jest.fn() }),
}));

jest.mock("../hooks/useAuthContext", () => ({
  useAuthContext: () => ({ user: { email: "test@example.com" } }),
}));

describe("Navbar", () => {
  it("should render the navbar with user logged in", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByText("Open Tickets")).toBeInTheDocument();
    expect(screen.getByText("Closed Tickets")).toBeInTheDocument();
    expect(screen.getByText("Add Tickets")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.queryByText("Signup")).not.toBeInTheDocument();
  });

  it("should render the navbar with user logged out", () => {
    jest.mock("../hooks/useAuthContext", () => ({
      useAuthContext: () => ({ user: null }),
    }));

    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.queryByText("Open Tickets")).not.toBeInTheDocument();
    expect(screen.queryByText("Closed Tickets")).not.toBeInTheDocument();
    expect(screen.queryByText("Add Tickets")).not.toBeInTheDocument();
    expect(screen.queryByText("Users")).not.toBeInTheDocument();
    expect(screen.queryByText("test@example.com")).not.toBeInTheDocument();
    expect(screen.queryByText("Log out")).not.toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Signup")).toBeInTheDocument();
  });
});
