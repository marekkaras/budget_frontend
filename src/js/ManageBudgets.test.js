/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { fireEvent, render, screen } from "@testing-library/react";
import { Manager } from "./ManageBudgets";
import "@testing-library/jest-dom";

describe("Manager component", () => {
  describe("rendering", () => {
    it("manager component renders", () => {
      const { container } = render(<Manager bi={[1]} />);

      const managers = container.getElementsByClassName("settings");
      expect(managers[0]).toBeInTheDocument();
    });

    it("manager has a delete button", () => {
      render(<Manager bi={[1]} />);

      const deleteButton = screen.getByRole("button", {
        name: /Delete/i,
      });

      expect(deleteButton).toBeInTheDocument();
    });

    it("manager has an add button", () => {
      render(<Manager bi={[1]} />);

      const addButton = screen.getByRole("button", {
        name: /Add \/ Update/i,
      });

      expect(addButton).toBeInTheDocument();
    });

    it("manager component has a header", () => {
      render(<Manager bi={[1]} />);

      const header = screen.getByRole("heading", {
        name: /Add \/ update budget/i,
      });

      expect(header).toBeInTheDocument();
    });
  });

  describe("Behaviour", () => {
    it("user can change year", () => {
      render(<Manager bi={[1]} />);

      const select = screen.getByTestId("year-selector");
      fireEvent.click(select, { target: { value: "2024" } });

      const options = screen.getAllByTestId("year-option");

      expect(options[0].selected).toBeFalsy();
      expect(options[1].selected).toBeTruthy();
    });

    it("user can change month", () => {
      render(<Manager bi={[1]} />);

      const select = screen.getByTestId("month-selector");
      fireEvent.click(select, { target: { value: "2" } });

      const options = screen.getAllByTestId("month-option");

      expect(options[0].selected).toBeFalsy();
      expect(options[1].selected).toBeTruthy();
    });
  });
});
