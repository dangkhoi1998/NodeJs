const express = require('express')
const logger = require('morgan')
const mongoClient = require('mongoose')
const bodyParser = require('body-parser')

// aetup connect môngdb by mongoose
mongoClient.connect('mongodb://localhost/nodejsapistarter', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => console.log('connect thành công'))
.catch((error) => console.error('lỗi failed', error))

const app = express()
const users = require('./routes/user')

// Middlewares
app.use(logger('dev'))
app.use(bodyParser.json())

// Routes
app.use('/users', users)
// Routes
app.get('/', (req, res, next) => {
  return res.status(200).json({
    massage: 'server is Ok'
  })
})

// Catch 404 Error and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.state = 404
  next(err)
})

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {}
  const status = err.status || 500

  // response to cline
  return res.status(status).json({
    error: {
      massage: error.massage
    }
  })
})

// Start the server
const port = app.get('port') || 3000
app.listen(port, () => console.log(`server is listening on port ${port}`))