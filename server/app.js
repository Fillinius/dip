const express = require('express')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const initDateBase = require('./startUp/initDataBase')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', routes)

const PORT = config.get('port') ?? 1808
const baseUri = config.get('baseUri')

if ((process.env.NODE_ENV = 'production')) {
  console.log(chalk.yellow('production'))
  app.use('/', express.static(path.join(__dirname, 'client')))

  const indexPath=path.join(__dirname, 'client', 'index.html')

  app.get('*',(req,res)=>{
    res.sendFile(indexPath)
  })
} else {
  console.log(chalk.yellow('Development'))
}

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDateBase()
    })
    await mongoose.connect(baseUri)
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port: ${PORT}`))
    })
  } catch (error) {
    console.log(chalk.red(error.message))
    process.exit(1)
  }
}

start()
