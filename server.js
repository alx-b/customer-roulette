import express from 'express'
import dotenv from 'dotenv'

const application = express()

application.use(express.json())

dotenv.config()
const { PORT, ENVIRONMENT } = process.env

try {
  application.listen(PORT, () => {console.log(`SERVER RUNNING ON PORT ${PORT}`)})
} catch (error) {
  console.error(`Could not listen on port ${PORT}`)
}
