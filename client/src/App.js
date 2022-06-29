import React from 'react'
import {Container} from '@material-ui/core'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './components/auth/Auth'
import { gapi } from "gapi-script";

gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId:
      "*****.apps.googleusercontent.com",
    plugin_name: "chat",
  });
});


export default function App() {

  return (
    <BrowserRouter >
    <Container maxWidth="lg">
      <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
    </Container>
    </BrowserRouter>
  )
}
