const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv').config({path:'.env'})

const app = express()

try {
    mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch {
    console.log('ERROR')
  }

  app.use(express.json({ extended: false }))
  app.use('/api/customers', require('./routes/customerRouter'))
  app.use('/api/transaction', require('./routes/transactionRouter'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))