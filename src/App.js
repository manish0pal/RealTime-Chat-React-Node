import React from 'react';
import {useState,useEffect} from 'react';
import './App.css';
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'

const socket = io('http://192.168.43.228:4000');

function App() {

  const [state, setState] = useState({message : '',name : ''} )
  const [chat,setChat] = useState([])

  useEffect(()=>{
    socket.on('message',({name,message})=>{
      setChat([...chat,{name,message}])
    })
  })

  const onTextChange = (e)=>{
    setState({ ...state,[e.target.name]:e.target.value})
  }

  const onMessageSubmit = (e) =>{
    e.preventDefault()
    const {name,message} = state
    socket.emit('message',{name,message})
    setState({message:'',name})
  }

  const renderChat = () =>{
    return chat.map(({name,message},index)=>(
      <div key={index}>
        <h6>{name}: {message}</h6>
      </div>
    ))
  }


  return (
    <div className="card">
      <div className='render_chat'>
    {renderChat()}
   </div>
    <form onSubmit={onMessageSubmit} className='messagebox'>
      <TextField 
      name="name"
      onChange={e => onTextChange(e)}
      value={state.name}
      label='Name'/>
      <br/>
      <TextField 
      name="message"
      onChange={e => onTextChange(e)}
      id='outlined-multiline-static'
      value={state.message}
      label='Message'/>
      <br/>
     <button className='sendbtn'>Send Message</button>
    </form>
 
    </div>
  );
}

export default App;
