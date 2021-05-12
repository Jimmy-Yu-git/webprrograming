import {useState} from "react";
//import Message from "../../backend/models/message";

const client = new WebSocket('ws://localhost:4000')
const useChat = () => {
    const sendData = async (data) => {
        //console.log(data) [input,payload]
        await client.send(
                JSON.stringify(data));
    };    
    const [messages,setMessages] = useState([]);
    const [status,setStatus] = useState({});

    const clearMessages = () =>{
        sendData(['clear']);
    }

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);    
        switch (task) {
            case 'init' :{
                setMessages(payload);
            }break;
            case 'output': {
                setMessages(() =>  
                [...messages , ...payload]); break; }
            case 'status' :{   
                setStatus(payload);
                console.log(payload)
                break;
            }
            case 'cleared' :{
                setMessages([]);
                break;
            }
            default: break;
        }
    }
    
    const sendMessage = (payload) => { 
        //setMessage([msg.name,msg.body])
        sendData(["input",payload]);
        //console.log(messages.length);
        console.log(payload);
    }
    return{
        status,
        messages,
        sendMessage,
        clearMessages
    };
};
export default useChat;