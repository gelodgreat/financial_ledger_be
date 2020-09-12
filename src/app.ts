import express from 'express'
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
app.use(cookieParser())

app.use('/', IncomeAPI)
app.use('/', ExpenseAPI)
app.use('/', UserAPI)

app.listen(PORT, () => {
  console.log(`Server Running @ ${PORT}`)
})
