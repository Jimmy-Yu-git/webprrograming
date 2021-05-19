import Row from './Row'
export default function Board2048 ({ board ,flag ,gameover,initializeBoard,win}) {

    let boardClassName = "board";
    let infoClassName = "info";
    let outSentence = "No funding this year QAO";
    let phdSentence = "You should study a PhD!";
    //console.log(flag)

    if(gameover === true){
        boardClassName += ' game-over-board';
        infoClassName += ' game-over-wrapper end-fade-in' 
    }
    if(win === true){
        boardClassName += ' game-over-board';
        infoClassName += ' game-over-wrapper end-fade-in'
        outSentence = phdSentence
    }

    return (
        <>
        <table className={boardClassName} id="board-full">
            <tbody>
                {board.map((row_vector, row_idx) => (<Row key={row_idx} column_idx={row_vector} row = {row_idx} flag={flag} />))}
            </tbody>
        </table>
        <div className={infoClassName} id="game-over-info">
            <span id="game-over-text">{outSentence}</span>
            <div className="button" id="game-over-button" onClick = {initializeBoard}>Try again</div>
        </div>
        </>
    );
};

// import React, { Component } from 'react'

// export default class Board2048 extends Component {

//     constructor(props) {
//         super(props)
    
//         this.state = {
             
//         }
//     }
    

//     render() {
//         let boardClassName = "board";
//         let infoClassName = "info";
//         let outSentence = "No funding this year QAO";
//         let phdSentence = "You should study a PhD!";
//         return (
//             <>
//                 <table className={boardClassName} id="board-full">
//                     <tbody>
//                         {this.props.board.map((row_vector, row_idx) => (<Row key={row_idx} column_idx={row_vector} row = {row_idx}/>))}
//                     </tbody>
//                 </table>
//                 <div className={infoClassName} id="game-over-info">
//                     <span id="game-over-text">{outSentence}</span>
//                     <div className="button" id="game-over-button">Try again</div>
//                 </div>
//             </>
//         )
//     }
// }

