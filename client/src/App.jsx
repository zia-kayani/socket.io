import React from 'react'
import {io} from 'socket.io-client'

export default function App() {
  const socket = io('http://localhost:3000/')
  return (
    <div>
        <h1>APP</h1>
    </div>
  )
}
