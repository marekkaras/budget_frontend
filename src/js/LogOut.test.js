import { render, screen } from "@testing-library/react";
import LogOutButton from "./LogOut";
import * as router from "react-router";
import "@testing-library/jest-dom";

let removeItem;
const mockedUsedNavigate = jest.fn();

beforeEach(() => {
  jest
    .spyOn(router, "useNavigate")
    .mockImplementation(() => mockedUsedNavigate);
  removeItem = jest.spyOn(Storage.prototype, "removeItem");
});

it("logout button exists", () => {
  render(<LogOutButton />);
  const button = screen.getByText(/sign out/i);
  expect(button).toBeInTheDocument();
});

it("logout button removes item from localstorage", () => {
  render(<LogOutButton />);
  const button = screen.getByText(/sign out/i);

  button.click();

  expect(removeItem).toHaveBeenCalledWith("login_token");
});

it("logout button navigates to home", () => {
  render(<LogOutButton />);
  const button = screen.getByText(/sign out/i);

  button.click();

  expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
});
