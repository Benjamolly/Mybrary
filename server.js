// if(process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

// // What files are needed
// const express = require('express')
// const app = express();
// const expressLayouts = require('express-ejs-layouts');
// const bodyParser = require('body-parser')


// //Routers call up
// const indexRouter = require('./routes/index')
// const authorRouter = require('./routes/authors')
// const bookRouter = require('./routes/books')

// //Tell them what files to use
// app.set('view engine', 'ejs')
// app.set('views', __dirname + '/views')
// app.set('layout', 'layouts/layout')
// app.use(expressLayouts)
// app.use(express.static('public'))
// app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

// const mongoose = require('mongoose')
// // You never want to hardcode your connection because it will change
// mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to Mongoose'))

// //When to use the routers
// app.use('/', indexRouter) //for url '/' use indexRouter
// app.use('/authors', authorRouter) 
// app.use('/books', bookRouter) 

// app.listen(process.env.PORT || 3000)

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').load()
// }

// const express = require('express')
// const app = express()
// const expressLayouts = require('express-ejs-layouts')
// const bodyParser = require('body-parser')

// const indexRouter = require('./routes/index')
// const authorRouter = require('./routes/authors')
// const bookRouter = require('./routes/books')

// app.set('view engine', 'ejs')
// app.set('views', __dirname + '/views')
// app.set('layout', 'layouts/layout')
// app.use(expressLayouts)
// app.use(express.static('public'))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to Mongoose'))

// app.use('/', indexRouter)
// app.use('/authors', authorRouter)
// app.use('/books', bookRouter)

// app.listen(process.env.PORT || 3000)

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const express = require('express')
  const app = express()
  const expressLayouts = require('express-ejs-layouts')
  const bodyParser = require('body-parser')
  
  const indexRouter = require('./routes/index')
  const authorRouter = require('./routes/authors')
  const bookRouter = require('./routes/books')
  
  app.set('view engine', 'ejs')
  app.set('views', __dirname + '/views')
  app.set('layout', 'layouts/layout')
  app.use(expressLayouts)
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

  // const MONGODB_URI = 'mongodb+srv://Benjamin:password1234@cluster0.yisqe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  
  const mongoose = require('mongoose')
  mongoose.connect( process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

  const db = mongoose.connection
  db.on('error', error => console.error(error))
  db.once('open', () => console.log('Connected to Mongoose'))
  
  app.use('/', indexRouter)
  app.use('/authors', authorRouter)
  app.use('/books', bookRouter)
  
  app.listen(process.env.PORT || 3000)