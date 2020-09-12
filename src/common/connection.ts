'use strict'
import mongoose from 'mongoose'

const DatabaseConnection = process.env.MONGODB_URL
  ? process.env.MONGODB_URL
  : 'mongodb://admin:amdin@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false'

try {
  mongoose
    .connect(DatabaseConnection, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      poolSize: 10,
      autoIndex: true //in production this must be false
    })
    .catch(error => {
      console.log(error)
    })
  mongoose.Promise = global.Promise

  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${DatabaseConnection}`)
  })

  mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ' + err)
  })

  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected')
  })

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose  connection disconnected through app termination')
      process.exit(0)
    })
  })
} catch (error) {
  console.log(error)
}

export default mongoose
