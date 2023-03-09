import React, { useState } from "react";
import "../css/manage.css";
import { BudgetPicker } from "./BudgetPicker";
import { deleteBudget, addBudget } from "./ManageBudgetHelpers.js";
import { ManageCategories } from "./ManageCategories.js";

function ManagerLoader({ stateChanger, bi, selected }) {
  if (selected == null) {
    return;
  }
  if (selected.value == null) {
    return;
  }

  let current_budget;
  bi.map((x) => {
    if (x.uuid === selected.value) {
      current_budget = x;
    }
    return null;
  });

  var categories = current_budget.categories;

  return (
    <>
      Selected budget:
      <br></br>
      Year: {current_budget.year}
      <br></br>
      Month: {current_budget.month}
      <br></br>
      Amount: {current_budget.amount}
      <br></br>
      Base currency: {current_budget.base_ccy}
      <br></br>
      <br></br>
      <ManageCategories
        stateChanger={stateChanger}
        categories={categories}
        budget={current_budget}
      />
    </>
  );
}

export function Manager({
  bi,
  handler,
  budgetCache,
  cachedBudget,
  value = "",
  onChange,
}) {
  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(1);
  const [ccy, setCcy] = useState("USD");
  const [amount, setAmount] = useState(0.0);
  const [selectedBudget, setSelectedBudget] = useState(cachedBudget);
  var selectableOptions = [];
  if (typeof bi[0] === "string" || bi[0] instanceof String) {
    selectableOptions = [
      { value: null, label: "No budgets", selectedBudget: null },
    ];
  } else {
    selectableOptions = bi.map((x) => ({
      value: x.uuid,
      label: x.year + "-" + x.month,
    }));
  }

  function updateCcy(event) {
    setCcy(event.target.value);
    if (typeof onChange === "function") {
      onChange(event.target.value);
    }
  }

  function updateAmount(event) {
    setAmount(event.target.value);
    if (typeof onChange === "function") {
      onChange(event.target.value);
    }
  }

  function updateYear(event) {
    setYear(event.target.value);
    if (typeof onChange === "function") {
      onChange(event.target.value);
    }
  }

  function updateMonth(event) {
    setMonth(event.target.value);
    if (typeof onChange === "function") {
      onChange(event.target.value);
    }
  }

  const stateChanger = () => {
    budgetCache(selectedBudget);
    handler();
  };

  const stateChangerRemoveBudget = () => {
    budgetCache(null);
    handler();
  };

  return (
    <>
      <div className="settings">
        <h2> Add / update budget: </h2>
        <label htmlFor="year">Year:</label>
        <select
          data-testid="year-selector"
          name="year"
          id="year"
          onChange={updateYear}
        >
          <option data-testid="year-option" value="2023">
            2023
          </option>
          <option data-testid="year-option" value="2024">
            2024
          </option>
          <option data-testid="year-option" value="2025">
            2025
          </option>
          <option data-testid="year-option" value="2026">
            2026
          </option>
        </select>
        <label htmlFor="month">Month:</label>
        <select
          data-testid="month-selector"
          name="month"
          id="month"
          onChange={updateMonth}
        >
          <option data-testid="month-option" value="1">
            January
          </option>
          <option data-testid="month-option" value="2">
            February
          </option>
          <option data-testid="month-option" value="3">
            March
          </option>
          <option data-testid="month-option" value="4">
            April
          </option>
          <option data-testid="month-option" value="5">
            May
          </option>
          <option data-testid="month-option" value="6">
            June
          </option>
          <option data-testid="month-option" value="7">
            July
          </option>
          <option data-testid="month-option" value="8">
            August
          </option>
          <option data-testid="month-option" value="9">
            September
          </option>
          <option data-testid="month-option" value="10">
            October
          </option>
          <option data-testid="month-option" value="11">
            Novemeber
          </option>
          <option data-testid="month-option" value="12">
            December
          </option>
        </select>
        <label htmlFor="new_budget_amount">Amount:</label>
        <input
          type="number"
          id="new_budget_amount"
          name="new_budget_amount"
          defaultValue={0.0}
          onChange={updateAmount}
        />
        <label htmlFor="new_budget_ccy">Ccy::</label>
        <input
          type="text"
          id="new_budget_ccy"
          name="new_budget_ccy"
          defaultValue="USD"
          onChange={updateCcy}
        />
        <button
          type="button"
          className="add-button"
          onClick={() => addBudget({ stateChanger, amount, ccy, year, month })}
        >
          Add / Update
        </button>
        <br />
        <br />

        <h2> Manage budgets: </h2>
        <button
          type="button"
          className="delete-button"
          onClick={() =>
            deleteBudget({
              stateChangerRemoveBudget,
              selectedBudget,
            })
          }
        >
          Delete Selected
        </button>

        <BudgetPicker
          className="input-cont"
          placeholder="Select a budget"
          defaultValue={selectedBudget}
          onChange={setSelectedBudget}
          options={selectableOptions}
        />
        <br />
        <br />
        <ManagerLoader
          bi={bi}
          selected={selectedBudget}
          stateChanger={stateChanger}
        />
        <></>
      </div>
    </>
  );
}
