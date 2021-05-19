export default function Grid ({cellValue,column,row,flag}) {
    let grid_id = `grid-${row}-${column}`;
    let value_id = `value-${row}-${column}`;
    let temp_class_name = 'grid';
    let color = `level-${cellValue}`;
    let value =(cellValue===0)? '' : cellValue;
    //let boardflagnow = {boardflag}
    // #########################
    const mapping = {'':"", 2:"NCTU", 4:"NYMU", 8:"NTU", 16:"UCSD", 32:"UBC", 64:"CUHK", 128:"UCLA", 256:"NYU",512:"UCB",1024:"HKUST", 2048:"UTokyo", 4096:"Columbia", 8192:"Yale", 16384:"Cambridge", 32768:"Stanford", 65536:"MIT"}
    const school = mapping[value]
    if(value){
                temp_class_name+= ` level-${cellValue}`;//記得要空行
    }
    //console.log(flag)
    //alert(boardflagnow)
     if(flag[row][column]){
        // console.log(`grid-${row}-${column}`)
         temp_class_name+=' school-fade-in'
     }

    //# 1 #2 Modify everything here (including the above one) yourself
    // #########################
    return (
        <>
            <td>
                <div className={temp_class_name} id={grid_id}>
                    <div className="school-name" id={value_id}>{value}</div>
                </div>
                
            </td>
        </>
    );
   
}
//import MergeSchool.css from ../


// import React, { Component } from 'react'

// export default class Grid extends Component {

//     constructor(props) {
//         super(props)
    
//         this.state = {
             
//         }
//     }
    
//     render() {
//             let grid_id = `grid-${this.props.rows}-${this.props.column}`;
//             let value_id = `value-${this.props.rows}-${this.props.column}`;
//             let temp_class_name = 'grid';
//             let color = `level-${this.props.cellValue}`;
//             let value =(this.props.cellValue===0)? '' : this.props.cellValue ;
//             const mapping = {'':"", 2:"NCTU", 4:"NYMU", 8:"NTU", 16:"UCSD", 32:"UBC", 64:"CUHK", 128:"UCLA", 256:"NYU",512:"UCB",1024:"HKUST", 2048:"UTokyo", 4096:"Columbia", 8192:"Yale", 16384:"Cambridge", 32768:"Stanford", 65536:"MIT"}
//             //const school = value.replace({'':"", )
//             const school = mapping[value]
//             if(value){
//                 temp_class_name+=color;
//             }
//             const posiotion = `${this.props.rows}-${this.props.column}`
//             //document.querySelector('#gird-'+posiotion).
//         return (
//             <>
//                 <td>
//                     <div className={temp_class_name} id={grid_id}>
//                         <div className="school-name" id={value_id}>{school}</div>
//                     </div>         
//                 </td>

//             </>
//         )
//     }
// }
