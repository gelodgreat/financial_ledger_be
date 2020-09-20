import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import connection from './common/connection'
import IncomeAPI from './api/Income'
import UserAPI from './api/Users'
import ExpenseAPI from './api/Expenses'

const app: express.Application = express()
const { PORT } = process.env
connection.startSession()
//Connections
//Models

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)


//JSON Format Handling
app.use((err:Error,req:Request,res:Response, next:NextFunction) => {
  if (err instanceof SyntaxError && (err.message.includes("JSON at position") || err.message.includes("Unexpected end of JSON input"))) {
    res.status(400).send({ type: "SyntaxError", message: "Invalid JSON format." });
  }
  else{
    res.status(500).send({ type: "UnhandledError", message: err });
  }
})

app.use(cookieParser())

app.use('/', IncomeAPI)
app.use('/', ExpenseAPI)
app.use('/', UserAPI)

app.listen(PORT, () => {
  console.log(`Server Running @ ${PORT}`)
})


//404 Error Hanlding
app.use((req:Request, res: Response, next:NextFunction) => {
  var error = new Error("Not found");
  res.status(404).send({ type: "NotFound", message: 'Resource not Found.' });;
})
