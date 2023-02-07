import React, { Component } from "react";


class HistoryTab extends Component {
    constructor() {
        super();
        this.state = {
            name: "React"
        };
    }
    render() {
        return (
            <div>
                <p>This is history component</p>
                <History />
            </div>
        );
    }
}

export default HistoryTab;

function History() {
    return (
        <>
        <div className="history">
            <section className="datePicker">
                <label htmlFor="historyDate">Date</label>
                {/* TODO: customize datepicker as per survey results */}
                <input type="date" id="historyDate"></input>
            </section>
            <section className="historyTable">
                <table>
                    <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Notes</th>
                        </tr>
                        {/* TODO: iterate through table in database + display here */}
                        <tr>
                            <td>06/02/2023</td>
                            <td>$0.25</td>
                            <td>Luxuries</td>
                            <td>For good luck!</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
        </>
    )
}