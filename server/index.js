import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/Posts.js'
import userRoutes from './routes/Users.js'
import dotenv from 'dotenv'



const app = express()

dotenv.config()

app.use(cors());
app.use(express.json())

//Routes
app.use('/posts', postRoutes)
app.use('/users', userRoutes)



const PORT = process.env.PORT || 5000; 

mongoose.connect(process.env.CONNECTION_URL)
    .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

