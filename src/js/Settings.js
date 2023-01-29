import React, { Component } from "react";


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
    return (
        <>
            <div class="settings">
                <section class="display_currency">
                    <p>Position Summary Display Currency</p>
                    <select name="display_currency" id="display_currency">
                        {/* <!-- Must be populated from database --> */}
                        <option value="">Populate from database</option>
                    </select>
                </section>
                <section class="user_currencies">
                <p>Rates for Position Summary Conversion</p>
                {/* <!-- For each currency in database: --> */}
                    <label for="currency_name">USD</label>
                    <select id="currency_name">
                        <option value="auto">Automatic</option>
                        <option value="custom">Custom</option>
                    </select>
                </section>
                <section class="date_format">
                <p>Date format</p>
                <select name="date_format" id="date_format">
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
                <section class="currency_format">
                <p>Currency format</p>
                    <label for="before">Before amount ($123,456.78)
                    <input type="radio" id="before" name="currency_format" value="before" /></label>
                    <label for="after">After amount (123,456.78$)
                    <input type="radio" id="after" name="currency_format" value="after" /></label>
                    <label for="neither">Don't display symbol (123,456.78)
                    <input type="radio" id="neither" name="currency_format" value="neither" /></label>
                </section>
            </div>
        </>
        );
}