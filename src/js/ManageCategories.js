import React, { useState } from "react";
import { updateCategory, removeCategory } from "./ManageCategoriesHelpers.js";


export function ManageCategories ( { categories } ) {
    return (
        <>
            {categories.map((category) => (
                <RenderCategory key={category.uuid} category={category}/>
            ))}
        </>
        
    )

}


function RenderCategory ( { category, value = "", onChange } ) {

    const [name, setName] = useState(category.category_name);
    const [amount, setAmount] = useState(category.amount);
    const cat_uuid = category.uuid;

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
    
    console.log(category)
    return (
        <>
            <input type="text" id="category_name" name="category_name" placeholder={category.category_name} onChange={updateName}/>
            <input type="text" id="category_amount" name="category_amount" placeholder={category.amount} onChange={updateAmount}/>
            {category.base_ccy}
            <button type ='button' onClick={() => updateCategory({cat_uuid, name, amount})}>Update</button>
            <button type ='button' onClick={() => removeCategory({cat_uuid})}>Delete</button>
            <br></br>
            <br></br>
        </>
        
    )

}