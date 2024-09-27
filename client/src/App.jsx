import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import { Box, Button, Container, TextField, Typography,Stack } from '@mui/material';

export default function App() {
  // const socket = io('http://localhost:3000/');
  const socket = useMemo(()=>io('http://localhost:3000/'), [])
  const[message , setMessage]= useState('');
  const [room,  setRoom] =  useState('');
  const [socketId, setSocketId]= useState('');
  const [messages , setMessages] = useState([])

  console.log(messages)

  //send data to backend 
  const handleSubmit = (e)=>{
    e.preventDefault();
    socket.emit("message" , {message, room})
    setMessage(" ")
  }

  useEffect(() => {
    socket.on("connect", ()=>{
      setSocketId(socket.id);
      console.log('socket connected', socket.id)
    })

    socket.on("wellcome", (s) => { console.log(s) })

    //recieved data from backend 
    socket.on("recieved-message", (data)=>{
      setMessages((messages)=>[...messages , data ])
      console.log(data)
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  return (
    <Container maxWidth='sm'>

      <Box sx={{height:100}}/>

      <Typography variant='h3' component='div' gutterBottom>
        {socketId}
      </Typography>
 
      <form onSubmit={handleSubmit}>
        <TextField id='outlined-basic' value={message} onChange={(e)=>setMessage(e.target.value)} label="message" variant="outlined"></TextField>
        <TextField id='outlined-basic' value={room} onChange={(e)=>setRoom(e.target.value)} label="room" variant="outlined"></TextField>

        <Button type="submit" variant='contained' color="primary">send</Button>
      </form>

      <Stack>
        {messages.map((m, i) => (
          <Typography key={i} variant="h6" component="div" gutterBottom>
            {m}
          </Typography>
        ))}
      </Stack>
    </Container>
  )
}
