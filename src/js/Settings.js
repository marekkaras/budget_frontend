import React, { Component, useState } from "react";
import '../css/test.css';

class SettingsTab extends Component {
    constructor() {
        super();
        this.state = {
            name: "React"
        };
    }
    render() {
        return (
            <div>
                <p>This is settings component</p>
                <Settings/>
            </div>
        );
    }
}


export default SettingsTab;

function Settings () {
    const [userPreferences, setUserPreferences] = useState( {
        displayCurrency: "USD",
        manualConversion: false,
        dateFormat: "dd/mm/yyyy",
        currencyFormat: "before"
    });
    
    const handleChange = (event) => {
        setUserPreferences( {
            ...userPreferences,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        // Prevent reload (default behavior)
        event.preventDefault();

        // Testing successful form input handling
        console.log(userPreferences.displayCurrency);
        console.log(userPreferences.manualConversion);
        console.log(userPreferences.dateFormat);
        console.log(userPreferences.currencyFormat);
    }

    return (
        <>
            <div className="settings">
                <form onSubmit={handleSubmit}>
                    <section className="displayCurrency">
                        <p>Display Currency</p>
                        <select name="displayCurrency" value={userPreferences.displayCurrency} onChange={handleChange}>
                            {/* <!-- TODO: add an option for each currency in database --> */}
                            <option value="USD">USD</option>
                            <option value="GBP">GBP</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </section>
                    <section className="conversionTypes">
                    <p>Default currency conversion rate:</p>
                        {/* TODO: add toggle for each currency in database */}
                        <div className="toggleTitles">
                            <span name="auto"><p>Auto</p></span>
                            <span name="manual"><p>Manual</p></span>
                        </div>
                        {/* Unchecked (false) means auto, Checked (true) means manual -- will be clearer when CSS is added */}
                        <input type="checkbox" name="manualConversion" checked={userPreferences.manualConversion} onChange={handleChange}></input>
                        {/* TODO: support separate toggles for each currency in user database */}
                        {/* <div className="userCurrencies">
                            <label className="toggle" name="USD">SD
                                <input type="checkbox" name="USDConversionType" onChange={handleChange}></input>
                            </label>
                            <label className="toggle" name="GBP">BP
                                <input type="checkbox" name="GBPConversionType" onChange={handleChange}></input>
                            </label>
                            <label className="toggle" name="EUR">UR
                                <input type="checkbox" name="EURConversionType" onChange={handleChange}></input>
                            </label>
                        </div> */}
                    </section>
                    <section className="dateFormat">
                    <p>Date format</p>
                    <select name="dateFormat" value={userPreferences.dateFormat} onChange={handleChange}>
                        <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                        <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                        <option value="yyyy/mm/dd">yyyy/mm/dd</option>
                        <option value="yyyy/dd/mm">yyyy/dd/mm</option>
                        <option value="dd-mm-yyyy">dd-mm-yyyy</option>
                        <option value="mm-dd-yyyy">mm-dd-yyyy</option>
                        <option value="yyyy-mm-dd">yyyy-mm-dd</option>
                        <option value="yyyy-dd-mm">yyyy-dd-mm</option>
                        <option value="dd.mm.yyyy">dd.mm.yyyy</option>
                        <option value="mm.dd.yyyy">mm.dd.yyyy</option>
                        <option value="yyyy.mm.dd">yyyy.mm.dd</option>
                        <option value="yyyy.dd.mm">yyyy.dd.mm</option>
                    </select>
                    </section>
                    <section className="currencyFormat">
                    <p>Currency format</p>
                        <label htmlFor="before">Before amount ($123,456.78)
                        <input type="radio" name="currencyFormat" value="before" checked={userPreferences.currencyFormat === "before"} onChange={handleChange} /></label>
                        <label htmlFor="after">After amount (123,456.78$)
                        <input type="radio" name="currencyFormat" value="after" checked={userPreferences.currencyFormat === "after"} onChange={handleChange} /></label>
                        <label htmlFor="neither">Don't display symbol (123,456.78)
                        <input type="radio" name="currencyFormat" value="neither" checked={userPreferences.currencyFormat === "neither"} onChange={handleChange} /></label>
                    </section>
                    <section className="saveButton">
                        <input type="submit" value="Save"></input>
                    </section>
                </form>
            </div>
        </>
        );
}