// import http from 'http';
// import express from 'express';
// import dotenv from 'dotenv-defaults';
// import mongoose from 'mongoose';
// import WebSocket from 'ws';
// import Message from './models/message.js';
// import { message } from 'antd';

// dotenv.config();

// if (!process.env.MONGO_URL) {
//   console.error('Missing MONGO_URL!!!')
//   process.exit(1)
// }

// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

// const db = mongoose.connection

// db.on('error', (error) => {
//   throw new Error("DB connection error: " + error);
// })

// const app = express()
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server })

// const wssConnect = ws => {
//   	ws.onmessages = async(byteString) =>{
//     const {data} = byteString
//     const [task,payload] = JSON.parse(data)

//     const sendData = (data) => {
//       	ws.send(JSON.stringify(data))
//     }
//     const sendStatus = (payload) => {
//       	sendData(['status', payload])
// 	}	
//     switch(task){
// 		case 'input' : {
// 			const{name,body} = payload
// 			const message = new Message({name,body})
		
// 			try{
// 			 await message.save();
// 			}catch(e){
// 			throw new Error('message db save error ' + e);
// 			}
// 			sendData(['output',[playload]])
// 			sendStatus({
// 				type : 'success',
// 				msg : 'message send'
// 			})
// 		break;

//     	}
// 		default : break;
//     }
//   	}
// }

// db.once('open', () => {
//   console.log('MongoDB connected!')
//   //bind wssconnect() to wss.on('connection'event)
//   //wss.on('connection', wssConnect)

//   const PORT = process.env.port || 4000

//   server.listen(PORT, () => {
//     console.log(`Listening on http://localhost:${PORT}`)
//   })
// })

import http from 'http';
import express from 'express';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import WebSocket from 'ws';
import Message from './models/message.js';

dotenv.config();

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
  throw new Error("DB connection error: " + error);
})

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

 	const wssConnect = (ws) => {
		const sendData = (data) => {
			ws.send(JSON.stringify(data))
		}
	 	const sendStatus = (payload) => {
			sendData(['status', payload])
	 	}
		Message.find().sort({created_at : -1}).limit(100).exec((err,res)=>{
			if(err) throw err
			//initialize app with existing messages
			sendData(['init',res])
		})
	  	ws.onmessage = async(byteString) =>{
	    const {data} = byteString
	    const [task,payload] = JSON.parse(data)
		console.log([task,payload])
	
	    // const sendData = (data) => {
	    //   	ws.send(JSON.stringify(data))
	    // }
	    // const sendStatus = (payload) => {
	    //   	sendData(['status', payload])
		// }
	    switch(task){
			case 'clear' :{
				Message.deleteMany({},()=>{
                	sendData(['cleared'])
					sendStatus({type : 'info' ,msg : 'message clear'})
                })
			}
			case 'input' : {
				const{name,body} = payload
				const message = new Message({name,body})
			
				try{
					await message.save();
					console.log('input')
				}catch(e){
				throw new Error('message db save error ' + e);
				}
				sendData(['output',[payload]])
				sendStatus({
					type : 'success',
					msg : 'message send'
				})
			break;
	
	    	}
			default : break;
	    }
	  	}
	}
// const wssConnect = ws => {
// }

db.once('open', () => {
	console.log('MongoDB connected!')

	wss.on('connection', wssConnect)
	function isOpen(ws) { return ws.readyState === ws.OPEN }
	if (isOpen(wss)) {console.log(111)};

	const PORT = process.env.port || 4000

	server.listen(PORT, () => {
		console.log(`Listening on http://localhost:${PORT}`)
	})
})


