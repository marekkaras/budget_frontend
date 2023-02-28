import { render, screen } from "@testing-library/react";
import { ManageExpenses } from "./ManageExpenses";
import "@testing-library/jest-dom";
import {
  removeExpense,
  addExpense,
  updateExpense,
} from "./ManageExpensesHelpers.js";

jest.mock("./ManageExpensesHelpers.js", () => ({
  updateExpense: jest.fn(),
  addExpense: jest.fn(),
  removeExpense: jest.fn(),
}));
const stateChanger = jest.fn();

const expenses = [
  {
    uuid: 123,
    expense: {
      date: new Date(),
      name: "expense 1",
      amount: 100,
      base_ccy: "EUR",
      exchange_rate: 1.0,
    },
    stateChanger,
  },
  {
    uuid: 456,
    expense: {
      date: new Date(),
      name: "expense 2",
      amount: 100,
      base_ccy: "EUR",
      exchange_rate: 1.0,
    },
    stateChanger,
  },
];

const category = {
  uuid: "f2ebc58d-4312-436c-85f6-c0e3cd1ce254",
  uuid_budget: "d2c4744e-539e-4d58-8809-b992af432343",
};

describe("manage expenses", () => {
  describe("rendering", () => {
    it("renders expenses", () => {
      render(<ManageExpenses expenses={expenses} category={category} />);

      const renderedExpenses = screen.getAllByTestId("expense");

      expect(renderedExpenses.length).toBe(2);
    });

    it("renders a new expense input", () => {
      render(<ManageExpenses expenses={expenses} category={category} />);

      const newExpenseInput = screen.getByTestId("new-expense");
      expect(newExpenseInput).toBeInTheDocument();
    });
  });

  describe("behaviour", () => {
    it("can remove an expense", () => {
      render(<ManageExpenses expenses={expenses} category={category} />);

      const removeExpenseButtons = screen.getAllByRole("button", {
        name: /delete/i,
      });
      removeExpenseButtons[0].click();

      expect(removeExpense).toHaveBeenCalledTimes(1);
    });

    it("can add an expense", () => {
      render(<ManageExpenses expenses={expenses} category={category} />);

      const addExpenseButtons = screen.getAllByRole("button", {
        name: /add/i,
      });
      addExpenseButtons[0].click();

      expect(addExpense).toHaveBeenCalledTimes(1);
    });

    it("can update an expense", () => {
      render(<ManageExpenses expenses={expenses} category={category} />);

      const updateExpenseButtons = screen.getAllByRole("button", {
        name: /update/i,
      });
      updateExpenseButtons[0].click();

      expect(updateExpense).toHaveBeenCalledTimes(1);
    });
  });
});
