import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/Posts.js'

const app = express()

app.use(cors());
app.use('/posts', postRoutes)


const connsectionURL = 'mongodb+srv://areebkhan:123@cluster0.gjq3j.mongodb.net/socialMedia?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(connsectionURL)
    .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

