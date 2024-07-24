import express from "express"
import cors from "cors"

import questionsRouter from "./src/questions/routes.js"
import authRouter from "./src/auth/routes.js"

import { authenticateToken } from "./src/middlewares/authenticateToken.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/api/questions", authenticateToken, questionsRouter)
app.use("/api/auth", authRouter)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`)
})
