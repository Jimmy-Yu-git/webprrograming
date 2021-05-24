import React, { Component } from 'react'
import PropTypes from 'prop-types'
const selection = "#ADDBE6"
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
class Table extends Component {
  	constructor(props) {
		super(props);
		// const init_data = []
		// for(let i=0;i<this.props.row;i++){
		// 	const init_row = []
		// 	for(let j=0;this.props.col;j++){
		// 		let initObject = this.initTableObject()
		// 		init_row.push(initObject)
		// 	}
		// 	init_data.push(init_row)
		// }
		const init_head = []
		const init_data = []
		init_head.push("")
		for(let i=0;i<this.props.col;i++){
			let output = this.getcol(i)
			init_head.push(output)
		}
        for(let i=0;i<this.props.row;i++){
            const init_oneRow = []
            for(let j=0;j<this.props.col;j++){
                let initObject = this.initTableObject()
                init_oneRow.push(initObject)
            }
            init_data.push(init_oneRow)
        }
		this.state = {
			data :  init_data,
			header : init_head,
			highlightnode : null,
			col : this.props.col,
			row : this.props.row,
			formulaMode:false, 
            formulaRow:null,
            formulaCol:null,
            formulaContent:[],

		
		}
  	}

	clean = () =>{
		let init_head = []
		let init_data = []
		init_head.push("")
		for(let i=0;i<this.state.col;i++){
			let output = this.getcol(i)
			init_head.push(output)
		}
        for(let i=0;i<this.state.row;i++){
            const init_oneRow = []
            for(let j=0;j<this.props.col;j++){
                let initObject = this.initTableObject()
                init_oneRow.push(initObject)
            }
            init_data.push(init_oneRow)
        }
		this.setState({
			data : init_data,
			header : init_head,
			row : this.state.row,
			col : this.state.col,
			highlightnode : null,

		})
	}
	initTableObject=()=>{
        return(
            {
                row:null,
                col:null,
                symbol:"",
                formulaText:"",
                formulaElement:[],
                containFormula:false,
                computedText:"",
                displayText:""
            }
        )
    }
	getcol = (col) =>{
		let colCount = col
		let letter =[]
		this.checkword(colCount,letter)
		let output = ""
		letter.forEach((letter)=>{
			output += letter
		})
		return output
	}

	checkword = (number,letter) => {
		const q = Math.floor(number/26)
		const r = number % 26
		letter.splice(0,0,alpha[r])
		if( q === 0){
			return
		}
		this.checkword(q-1,letter)
	}

	onclick = (e) => {
		const mytd = e.target.closest('td');//找到click事件的td
		const myinput = mytd.children[0]
		const [row, col] = this.getposi(mytd)
		//console.log([row,col])
		let realposi = this.state.data[row-1][col-1]
		// this.setState((s)=>{
		// 	let clickedObject = this.state.data[row-1][col-1]
		// 	if(s.formulaMode === true){
		// 		let formulaobj = s.data[s.formulaRow-1][s.formulaCol-1]
		// 		if(formulaobj.formulaText.slice(-1) === '+'||formulaobj.formulaText.slice(-1) === '-'||formulaobj.formulaText.slice(-1) === '='){
		// 			const formulaTd = mytable.rows[s.formulaRow].cells[s.formulaCol]
		// 			formulaTd.children[0].focus()
		// 			if(row !== s.formulaRow || col !== s.formulaCol){
		// 				formulaobj.formulaElement.push(clickedObject)
		// 				formulaobj.formulaText += clickedObject.symbol
		// 				formulaobj.displayText = formulaobj.formulaText
		// 			}


		// 		}
		// 		else if (row !== s.formulaRow || col !== s.formulaCol){
        //             //others are clicked.
        //             this.computeFormula(s.formulaRow,s.formulaCol)
        //         }
		// 		else{
        //             // itself is clicked.
        //             formulaObject.displayText = formulaObject.formulaText
        //         }

		// 	}
		// 	return s;
		// })
	}

	onfocus =(e) => {
		const mytd = e.target.closest('td');
		console.log(mytd)
		const [row, col] = this.getposi(mytd)
		const mytable = document.getElementsByClassName("fakesheet")[0]
		for(let i=1;i<this.state.col+1;i++){
			let rowIndex = mytable.rows[row].cells[i].children[0]
			rowIndex.style.backgroundColor = selection;
		}
		for(let i=1;i<this.state.row+1;i++){
			let colIndex = mytable.rows[i].cells[col].children[0]
			colIndex.style.backgroundColor = selection;
		}
		const rowIndex = mytable.rows[row].cells[0]
		const colIndex = mytable.rows[0].cells[col]
		rowIndex.style.backgroundColor = selection;
        colIndex.style.backgroundColor = selection;
		this.setState({
			highlightnode : mytd
		})
	}

	onblur = (e) =>{
		const mytd = e.target.closest('td');
		//console.log(mytd)
		const [row, col] = this.getposi(mytd)
		const mytable = document.getElementsByClassName("fakesheet")[0]
		const rowIndex = mytable.rows[row].cells[0]
		const colIndex = mytable.rows[0].cells[col]
		rowIndex.style.backgroundColor = "white";
        colIndex.style.backgroundColor = "white";
		for(let i=1;i<this.state.col+1;i++){
			let rowIndex = mytable.rows[row].cells[i].children[0]
			rowIndex.style.backgroundColor = "white";
		}
		for(let i=1;i<this.state.row+1;i++){
			let colIndex = mytable.rows[i].cells[col].children[0]
			colIndex.style.backgroundColor = "white";
		}
		e.target.readOnly=true
		this.setState({
			highlightnode : null
		})
	}
	getposi = (td) =>{
		const mytd = td
		const mytr = mytd.parentElement;
		const row = mytr.rowIndex
		const col = mytd.cellIndex
		return [row,col]

	} 

	doubleclicck = (e) =>{
		const mytd = e.target.closest('td');
		const [row,col] = this.getposi(mytd)
		e.target.readOnly = false
		let clickobj = this.state.data[row-1][col-1]
		console.log (mytd)
		this.setState({
			highlightnode : mytd
		})
	}

	keypress = (e) =>{
		const mytd = e.target.closest('td')
		const [row,col] = this.getposi(mytd)
		if(e.target.readOnly === true){
			console.log("no")
			e.target.value = ""
			console.log(e.target.value)
		}
		//e.target.readOnly = false;
		const mytable = document.getElementsByClassName("fakesheet")[0]
		if(e.key === 'Enter'){
			if(this.state.formulaMode){
				this.compute(row,col)
			}
			if(row<=(this.state.row-1)){
				const nextElement = mytable.rows[row+1].cells[col]
				nextElement.readOnly = false
				console.log(nextElement.readOnly)
				//console.log(nextElement)
				nextElement.children[0].readOnly = false
				nextElement.children[0].focus()
			}
			
		}

	}

	compute = (row,col) =>{
		let computedObject = this.state.data[row-1][col-1]
		let formulaText = computedObject.formulaText
		if(this.state.formulaMode === true){
			// if(computedObject.formulaElement.length !== 0){
			// 	computedObject.computedText = computedObject.formulaElement[0].displayText
			// }
			// else{
				computedObject.computedText = eval(formulaText.slice(1))
			// }
		}
		computedObject.displayText = computedObject.computedText
		const mytable = document.getElementsByClassName("fakesheet")[0]
        const formulaTd = mytable.rows[this.state.formulaRow].cells[this.state.formulaCol]
		formulaTd.children[0].style.color = "black"
		this.setState({
			formulaMode : false,
			formulaRow : null,
			formulaCol : null
		})
	}

	addcol = (sign) =>{
		if(sign === '+'){
			if(this.state.highlightnode === null){
				let col = this.state.col + 1
				const output = this.getcolletter(col-1)
				let newhead = this.state.header
				newhead.push(output)
				this.setState({
					header : newhead,
					col : col
				})
				for(let i=0;i<this.state.row;i++){
					let initobj = this.initTableObject()
					let newdata = this.state.data
					newdata[i].push(initobj)
					this.setState({
						data : newdata
					})
				}
			}
			else{
				console.log('insert')
				let newcol = this.state.col + 1;
				const output = this.getcolletter(newcol-1)
				let newhead = this.state.header
				newhead.push(alpha[newcol-1])
				const nownode = this.state.highlightnode
				const [row,col] = this.getposi(nownode)
				let newdata = this.state.data
				newdata.forEach((row) => {
					let initobj = this.initTableObject()
					row.splice(col,0,initobj)
				})
				this.setState({
					data : newdata,
					header : newhead,
					col : newcol
				})
	
	
			}
		}
		else{
			if(this.state.highlightnode !== null){
				console.log('delete')
				let newcol = this.state.col -1
				let newhead = this.state.header.pop()
				const newnode = this.state.highlightnode
				const [row,col] = this.getposi(newnode)
				let newdata =this.state.data
				newdata.forEach((row)=>{
					row.splice(col-1,1)
				})
				this.setState({
					data : newdata,
					//header : newhead,
					col : newcol
				})
			}
		}
		

	}

	addrow = (sign) => {
		if(sign === '+'){
			if(this.state.highlightnode === null){
				let newrow = this.state.row+1
				const newobj = []
				for(let i=0;i<this.state.col;i++){
					
					newobj.push(this.initTableObject())
				}
				let newdata = this.state.data
				newdata.push(newobj)
				this.setState({
					row : newrow,
					data : newdata,
				})
			}
			else{
				console.log('insert row')
				let newrow = this.state.row+1
				const newnode = this.state.highlightnode
				const [row,col] = this.getposi(newnode)
				const newobj = []
				for(let i=0;i<this.state.col;i++){					
					newobj.push(this.initTableObject())
				}
				let newdata = this.state.data
				newdata.splice(row,0,newobj)
				this.setState({
					row : newrow,
					data : newdata,
				})
			}
		}
		else{
			if(this.state.highlightnode !== null){
				let newrow = this.state.row-1
				const newnode = this.state.highlightnode
				const [row,col] = this.getposi(newnode)
				let newdata = this.state.data
				newdata.splice(row-1,1)
			}
		}
	}

	getcolletter = (col) => {
		let colcount = col
		let letter = []
		this.checkword(colcount,letter)
		let output = ""
		letter.forEach((letter) => {
			output = output + letter
		})
		return output

	}

	oninput = (e) => {
		const mytd = e.target.closest('td');
		const [row,col] = this.getposi(mytd);
		let dataval = this.state.data
		console.log(e.target.readOnly)
		if(e.target.readOnly===false){
		dataval[row-1][col-1].displayText = e.target.value
		console.log(dataval[row-1][col-1].displayText)
		}
		else{
			dataval[row-1][col-1].displayText = ""
		}
		this.setState({		
			data : dataval		
		})

		if(e.target.value.replace(/\s+/g, "")[0] === '='){
			mytd.children[0].style.color = "red"//input變為紅色
			this.state.data[row-1][col-1].containFormula = true;
			//console.log(this.state.data[row-1][col-1].containFormula)
			this.setState({
				formulaMode : true,
				formulaRow : row,
				formulaCol : col,
			})

		}
		else{
			mytd.children[0].style.color = "black"
			this.state.data[row-1][col-1].containFormula = false;
			this.setState({
				formulaMode : false,
				formulaRow : null,
				formulaCol : null,
			})
		}
		this.state.data[row-1][col-1].formulaText = e.target.value
		console.log(this.state.data[row-1][col-1].formulaText)

		

	}
  
  
  	render() {
   
    return (
    <>
		<button onClick = {() => this.clean()}>HAHA cleanall</button>
		<div >
			<ul className="btaddcolumn" style={{margin:"0px",marginLeft:"157px"}}>
				<button onMouseDown = {()=>this.addcol('+')}>+</button>
				<button onMouseDown = {()=>this.addcol('-')}>-</button>
			</ul>
		</div>

        <div style={{float:"left",width:"5%",marginTop:"30px"}}>
			<ul className="btaddrow" style={{margin:"0px", padding:"0px", marginRight:"0px"}}>
				<button onMouseDown = {()=>this.addrow('+')}>+</button>
				<br></br>
				<button onMouseDown = {()=>this.addrow('-')}>-</button>
			</ul>
		</div>
		<div style={{float:"left",width:"50%"}}>
			<table className = "fakesheet">
				<thead>
					<tr>
					{
						this.state.header.map((head,index)=>
						<th key={index}>{head}</th> ) 
                    }

					</tr>
				</thead>

				<tbody>
					{
						this.state.data.map((row,rowindex) =>{
							return(
								<tr key = {rowindex}>
								{
									<>
									<td>
										{rowindex+1}
									</td>
									{row.map((Cell,colindex) =>{
										return(
											<td key = {colindex}>
												<input 
													className = "fakesheet_input"
													type = 'text'
													onClick = {(e)=>this.onclick(e)}
													onFocus = {(e)=>this.onfocus(e)}
													onKeyPress = {(e) => this.keypress(e)}
													onBlur = {(e)=>this.onblur(e)}
													onDoubleClick = {(e) => this.doubleclicck(e)}
													readOnly = {true}
													value = {Cell.displayText}
													onInput = {(e) => this.oninput(e)}
													
												/>
												
											</td>
										)
									

									})}
									</>
								}
								</tr>
							)
						})

					}
				</tbody>

			</table>

		</div>
    </>
    )
  	}
}

export default Table;

