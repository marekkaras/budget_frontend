import React, { useState } from "react";
import { updateExpense, removeExpense, addExpense } from "./ManageExpensesHelpers.js";
import "../css/expenses.css";


export function ManageExpenses ( { expenses, category } ) {
    return (
        <>
            {expenses.map((expense) => (
                <RenderExpense key={expense.uuid} expense={expense}/>
            ))}
            <RenderNew category={category}/>
        </>
        
    )

}

function RenderNew ( {category, value = "", onChange} ) {
    const uuid_budget = category.uuid_budget;
    const uuid_category = category.uuid;
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0.0);
    const [baseCcy, setBaseCcy] = useState("");
    const [exchangeRate, setExchangeRate] = useState(0.0);
    
    function updateDate(event) {
        setDate(event.target.value);
        if (typeof onChange === "function") {
            onChange(event.target.value);
        }
    }
    
    function updateName(event) {
        setName(event.target.value);
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
    
    function updateBase(event) {
        setBaseCcy(event.target.value);
        if (typeof onChange === "function") {
            onChange(event.target.value);
        }
    }
    
    function updateRate(event) {
        setExchangeRate(event.target.value);
        if (typeof onChange === "function") {
            onChange(event.target.value);
        }
    }
    
    
    console.log(category);
    
    return (
        <>
            <label htmlFor="expense_date">Date:</label>
            <input type="text" id="expense_date" className="expense_date" onChange={updateDate}/>
            <label htmlFor="expense_name">Name: </label>
            <input type="text" id="expense_name" className="expense_name" onChange={updateName}/>
            <label htmlFor="expense_amount">Amount: </label>
            <input type="text" id="expense_amount" className="expense_amount" onChange={updateAmount}/>
            <label htmlFor="expense_base_ccy">Ccy: </label>
            <input type="text" id="expense_base_ccy" className="expense_base_ccy" onChange={updateBase}/>
            <label htmlFor="expense_exchange_rate">Rate: </label>
            <input type="text" id="expense_exchange_rate" className="expense_exchange_rate" onChange={updateRate}/>
            <button type ='button' onClick={() => addExpense({uuid_budget, uuid_category, date, name, amount, baseCcy, exchangeRate})}>Add New</button>
            <br></br>
        </>
        
    )
}


function RenderExpense ( { expense, value = "", onChange } ) {

    const [date, setDate] = useState(expense.date);
    const [name, setName] = useState(expense.name);
    const [amount, setAmount] = useState(expense.amount);
    const [baseCcy, setBaseCcy] = useState(expense.base_ccy);
    const [exchangeRate, setExchangeRate] = useState(expense.exchange_rate);
    const uuid = expense.uuid;

    function updateDate(event) {
        setDate(event.target.value);
        if (typeof onChange === "function") {
            onChange(event.target.value);
        }
    }
    
    function updateName(event) {
        setName(event.target.value);
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
    
    function updateBase(event) {
        setBaseCcy(event.target.value);
        if (typeof onChange === "function") {
            onChange(event.target.value);
        }
    }
    
    function updateRate(event) {
        setExchangeRate(event.target.value);
        if (typeof onChange === "function") {
            onChange(event.target.value);
        }
    }
        
    return (
        <>
            <label htmlFor="expense_date">Date:</label>
            <input type="text" id="expense_date" className="expense_date" placeholder={expense.date} onChange={updateDate}/>
            <label htmlFor="expense_name">Name: </label>
            <input type="text" id="expense_name" className="expense_name" placeholder={expense.name} onChange={updateName}/>
            <label htmlFor="expense_amount">Amount: </label>
            <input type="text" id="expense_amount" className="expense_amount" placeholder={expense.amount} onChange={updateAmount}/>
            <label htmlFor="expense_base_ccy">Ccy: </label>
            <input type="text" id="expense_base_ccy" className="expense_base_ccy" placeholder={expense.base_ccy} onChange={updateBase}/>
            <label htmlFor="expense_amount_budget">Base amount [{expense.budget_ccy}]: </label>
            <input type="text" id="expense_amount_budget" className="expense_amount_budget" value={expense.budget_amount} readOnly/>
            <label htmlFor="expense_exchange_rate">Rate: </label>
            <input type="text" id="expense_exchange_rate" className="expense_exchange_rate" placeholder={expense.exchange_rate} onChange={updateRate}/>
            <button type ='button' onClick={() => updateExpense({uuid, date, name, amount, baseCcy, exchangeRate})}>Update</button>
            <button type ='button' onClick={() => removeExpense({uuid})}>Delete</button>
            <br></br>
            
        </>
        
    )

}