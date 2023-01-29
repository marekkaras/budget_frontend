import React, { Component } from "react";


class SummaryTab extends Component {
    constructor() {
        super();
        this.state = {
            name: "React"
        };
    }
    render() {
        return <div>This is summary component</div>;
    }
}


export default SummaryTab;