import express from 'express'
import router from './routes'
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = 3000

app.use(router)

app.listen(3000, () => {
  console.log(`Server running at ${PORT}`)
})