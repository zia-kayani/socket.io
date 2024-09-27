import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import { Button, Container, TextField, Typography } from '@mui/material';

export default function App() {
  // const socket = io('http://localhost:3000/');
  const socket = useMemo(()=>io('http://localhost:3000/'), [])
  const[message , setMessage]= useState('');

  const handleSubmit = (e)=>{
    e.preventDefault();
    socket.emit("message" , message)
    setMessage(" ")
  }

  useEffect(() => {
    console.log('socket connected', socket.id)

    socket.on("wellcome", (s) => { console.log(s) })

    return () => {
      socket.disconnect()
    }
  }, [])
  return (
    <Container maxWidth='sm'>
      <Typography variant='h1' component='div' gutterBottom>
        Wellcome to socket io
      </Typography>
 
      <form onSubmit={handleSubmit}>
        <TextField id='outlined-basic' value={message} onChange={(e)=>setMessage(e.target.value)} label="outlined" variant="outlined"></TextField>
        <Button type="submit" variant='contained' color="primary">send</Button>
      </form>
    </Container>
  )
}
