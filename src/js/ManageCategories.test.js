import { render, screen } from "@testing-library/react";
import { ManageCategories } from "./ManageCategories";
import "@testing-library/jest-dom";

const categories = [
  {
    name: "cat1",
    amount: 100,
    uuid: "123",
    expenses: [],
  },
  {
    name: "cat2",
    amount: 200,
    uuid: "456",
    expenses: [],
  },
];
const budget = {
  username: "user1",
  uuid: "123",
};

describe("manage categories", () => {
  it("renders categories", () => {
    render(<ManageCategories categories={categories} budget={budget} />);

    const renderedCategories = screen.getAllByTestId("category");

    expect(renderedCategories.length).toBe(2);
  });

  it("renders a new category input", () => {
    render(<ManageCategories categories={categories} budget={budget} />);

    const newCategoryInput = screen.getByTestId("new-category");
    expect(newCategoryInput).toBeInTheDocument();
  });
});
