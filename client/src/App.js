import React from 'react'
import {Container} from '@material-ui/core'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/auth/Auth'
import { gapi } from "gapi-script";
import PostDetails from './components/posts/Postsdetails'

gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId:
      "*****.apps.googleusercontent.com",
    plugin_name: "chat",
  });
});


export default function App() {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter >
    <Container maxWidth="xl">
      <Navbar />
    <Routes>
      <Route path="/" exact element={<Navigate to="/posts"/>} />
      <Route path="/posts" exact element={<Home />} />
      <Route path="/posts/search" exact element={<Home />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/auth" element={(user === null ? <Auth /> : <Navigate to="/posts" />)} />
    </Routes>
    </Container>
    </BrowserRouter>
  )
}
