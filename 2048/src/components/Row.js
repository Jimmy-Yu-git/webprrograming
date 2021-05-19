// import Grid from '../components/Grid'
// import React, { Component } from 'react'

// export default class Row extends Component {
//     constructor(props) {
//         super(props)
    
//         this.state = {
             
//         }
//     }
    
//     render() {
//         return (
//             <tr> 
//                 {this.props.column_idx.map((cell,column) => (<Grid key = {column} cellValue = {cell} column ={column} rows = {this.props.row}/> ))}
//             </tr>
//         )
//     }
// }











import Grid from '../components/Grid'
export default function Row ({ column_idx , row ,flag}) {
 //let row_idx = this.props.row_idx

    return (
        <tr> 
            {column_idx.map((cell,column) => (<Grid key = {column} cellValue = {cell} column ={column} row = {row} flag={flag}/> ))}
        </tr>
    );
};