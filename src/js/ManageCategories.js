import React, { useState } from "react";
import { updateCategory, removeCategory, addCategory } from "./ManageCategoriesHelpers.js";
import { ManageExpenses } from "./ManageExpenses.js";


export function ManageCategories ( { stateChanger, categories, budget } ) {
    return (
        <>
            {categories.map((category) => (
                <RenderCategory key={category.uuid} category={category} stateChanger={stateChanger}/>
            ))}
            <NewCategory budget={budget} stateChanger={stateChanger}/>
        </>
    )

}


function NewCategory ( { stateChanger, budget, value = "", onChange  } ) {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0.0);
    const username = budget.username;
    const uuid_budget = budget.uuid;

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
    
    return (
        <>
            <b>Category: </b> 
            <input type="text" id="new_cat_name" name="new_cat_name" onChange={updateName}/>
            <input type="number" id="new_cat_amount" name="new_cat_amount" onChange={updateAmount}/>
            {budget.base_ccy}
            <button type ='button' onClick={() => addCategory({stateChanger, username, uuid_budget, name, amount})}>Add New</button>
            <br></br>
            <br></br>
        </>
        
    )

}


function RenderCategory ( { stateChanger, category, value = "", onChange } ) {

    const [name, setName] = useState(category.category_name);
    const [amount, setAmount] = useState(category.amount);
    const cat_uuid = category.uuid;
    const expenses = category.expenses;

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
    
    return (
        <>
            <b>Category: </b> 
            <input type="text" id="category_name" name="category_name" placeholder={category.category_name} onChange={updateName}/>
            <input type="number" id="category_amount" name="category_amount" placeholder={category.amount} onChange={updateAmount}/>
            {category.base_ccy}
            <button type ='button' onClick={() => updateCategory({stateChanger, cat_uuid, name, amount})}>Update</button>
            <button type ='button' onClick={() => removeCategory({stateChanger, cat_uuid})}>Delete</button>
            <br></br>
            <ManageExpenses expenses={expenses} category={category} stateChanger={stateChanger}/>
            <br></br>
        </>
        
    )

}
