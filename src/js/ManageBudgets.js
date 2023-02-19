import React, { useState } from "react";
import Select from 'react-select';
import { deleteBudget } from "./ManageBudgetHelpers.js";


function ManagerLoader ( {bi, selected} ) {

    if (selected == null ) {
        return
    }
    if (selected.value == null ) {
        return
    }
    
    console.log(bi)
    console.log(selected.value)

    return (
        <>
            <p>something</p>
        </>
    
    
    )
}


export function Manager( bi ) {

    const [displayBudget, setdisplayBudget] = useState({
            visible: false,
    		uuid: "",
    	});
    const [selectedBudget, setSelectedBudget] = useState(null);
    var selectableOptions = [];
    if (typeof bi.budget_info[0] === 'string' || bi.budget_info[0] instanceof String) {
        selectableOptions = [ {value: null, label: 'No budgets', selectedBudget: null} ]
    } else {
        selectableOptions = bi.budget_info.map(
                (x => ({ 'value': x.uuid, 
                        'label': x.year + '-' + x.month })));
    }
    const selectableYears = [ {value: '2023', label: '2023'},
                            {value: '2024', label: '2024'},
                            {value: '2025', label: '2025'},
                            {value: '2026', label: '2026'},
                            {value: '2027', label: '2027'}]  
    const selectableMonths = [ {value: '1', label: 'January'},
                            {value: '2', label: 'February'},
                            {value: '3', label: 'March'},
                            {value: '4', label: 'April'},
                            {value: '5', label: 'May'},
                            {value: '6', label: 'June'},
                            {value: '7', label: 'July'},
                            {value: '8', label: 'August'},
                            {value: '9', label: 'September'},
                            {value: '10', label: 'October'},
                            {value: '11', label: 'November'},
                            {value: '12', label: 'December'}]
                            
    const handleChange = () => {
		setdisplayBudget({
			...displayBudget,
			visible: true
		});
	};
  
	return (
		<>
			<div className="settings">
    			<h1> Manage Budgets </h1>
    			
    			<h2> Add new budget: </h2>
    			<Select
                    className="input-year"
                    placeholder= "Select year"
                    options={selectableYears}
                  />
                  <Select
                    className="input-month"
                    placeholder= "Select month"
                    options={selectableMonths}
                  />
    			<button type ='button'>Add New</button>
    			<br/>
    			<br/>
    			
    			<h2> Manage budgets: </h2>
    			<Select
                    className="input-cont"
                    placeholder= "Select budget"
                    defaultValue={selectedBudget}
                    onChange={setSelectedBudget}
                    options={selectableOptions}
                  />
                <button onClick={handleChange}>Display Selected</button>                
                <button type ='button' onClick={() => deleteBudget({selectedBudget})}>Delete Selected</button>
                <br/>
    			<br/>
    			<>
    			{displayBudget.visible ?
                   <ManagerLoader bi={bi.budget_info} selected={selectedBudget}/>
                   :
                   null
                }
                </>
			</div>
		</>
	);
}