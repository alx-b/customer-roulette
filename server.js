import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import CustomerRoutes from './src/routes/Customer.routes.js'

dotenv.config()
const { PORT, ENVIRONMENT, MONGO_DB_URI } = process.env

const application = express()
application.use(express.json())
application.use(cors({credential: true}))

CustomerRoutes.routes(application)

const connectToPort = async () => {
  try {
    application.listen(PORT, () => {console.log(`SERVER RUNNING ON PORT ${PORT}`)})
  } catch (error) {
    console.error(`Could not listen on port ${PORT}`)
  }
}

const connectToDB = async () => {
  const DB_URI = ENVIRONMENT === 'DEVELOPMENT' ? MONGO_DB_URI : "NONE"
  try {
    await mongoose.connect(
      DB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    console.log('Successfully connected to the database.')
  } catch (error) {
    console.error(`Error while trying to connect to the database: ${error}`)
    process.exit()
  }
}

connectToPort()
connectToDB()
