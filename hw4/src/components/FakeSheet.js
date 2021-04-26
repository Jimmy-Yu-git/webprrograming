import React, { Component } from "react";
import Header from "./Header";
import Table from "./Table";

class FakeSheet extends Component {
    constructor(props){
        super(props);
        this.state = {
            row: 10,
            col: 6,
        }
    }
    render() {
        return (
            <>
                <Header text="Fake Sheet"/>
                <section className="fake-sheet__main">
                    <Table row={this.state.row} col={this.state.col}/>
                </section>
                
            </>
        );
    }
}

export default FakeSheet;