// const express = require('express')
// const router = express.Router()
// const multer = require('multer')
// const Book = require('../models/book')
// const fs = require('fs')
// // Above is file system and used in our case to remove saved cover photos when there was an error on the form
// const path = require('path')
// // The above is required so we can access the path to the files that are saved for the cover upload. See below line
// const uploadPath = path.join('public', Book.coverImageBasePath) 
// // const upldPath = require('../public/uploads/bookCovers') //remove
// const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
// // The above is an array of all the image types that we accept
// const Author = require('../models/author')
// const { title } = require('process')
// const upload = multer({
//     dest: uploadPath, 
//     fileFilter: (req, file, callback) => {
//         callback(null, imageMimeTypes.includes(file.mimetype) )
//     }
// })

// //All books route
// // the '/' gets appended onto the route declared in server.js (/books)
// router.get('/', async (req, res) => {
//     let query = Book.find()
//     if(req.query.title != null && req.query.title != ''){
//         query = query.regex('title', new RegExp(req.query.title, 'i'))
//     }
//     if(req.query.publishedBefore != null && req.query.publishedBefore != ''){
//         query = query.lte('publishDate', req.query.publishedBefore)
//         // lte = less than or equal to
//     }
//     if(req.query.publishedAfter != null && req.query.publishedAfter != ''){
//         query = query.gte('publishDate', req.query.publishedAfter)
//         // gte >=
//     }
//     try{
//         const books = await query.exec()
//         res.render('books/index', {
//             books: books,
//             searchOptions: req.query
    
//         })
//     } catch {
//         res.redirect('/')
//     }
// })

// //New book route
// router.get('/new', async (req, res) => {
//     renderNewPage(res, new Book())
// })

// //Create new book route
// router.post('/', upload.single('cover'), async (req, res) => {
//     // 'cover' is the name of the input variable on the form
//     const fileName = req.file != null ? req.file.filename : null
//     const book = new Book({
//         title: req.body.title,
//         author: req.body.author,
//         publishDate: new Date(req.body.publishDate),
//         // Above is a new Date() because we are getting a string because we had to to remove the time.
//         pageCount: req.body.pageCount,
//         // cover: req.body.cover, we first need to create the file image on our file, get the name from that, and then save that into our Book object. Easiest way to do that is to use a library called multer. see below
//         coverImageName: fileName,
//         description: req.body.description
//     })
//     try{
//         const newBook = await book.save()
//         res.redirect(`books`)
        
//     } catch {

//         book.coverImageName && removeBookCover(book.coverImageName) 
//         renderNewPage(res, book, hasError = true)
//     }
// })

// function removeBookCover(fileName){
//     fs.unlink(path.join(uploadPath, fileName), err => {
//         if(err) console.error(err)
//     })
// }

// async function renderNewPage(res, book, hasError = false){
//     try{
//         const authors = await Author.find({})
//         // The above is so that if they imput data and we reject it then it autopopulates the fields with the data they already gave.
//         const params = {
//             authors: authors,
//             book: book
//         }
//         if(hasError) params.errorMessage = 'Error creating book'
//         res.render('books/new', params)
//     } catch {
//         res.redirect('/books')
//     }
// }


// module.exports = router


const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Book = require('../models/book')
const Author = require('../models/author')
const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']

const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
      callback(null, imageMimeTypes.includes(file.mimetype))
    }
  })

// All Books Route
router.get('/', async (req, res) => {
  let query = Book.find()
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('publishDate', req.query.publishedBefore)
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.gte('publishDate', req.query.publishedAfter)
  }
  try {
    const books = await query.exec()
    res.render('books/index', {
      books: books,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Book Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Book())
})

// Create Book Route
router.post('/', upload.single('cover'), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    coverImageName: fileName,
    description: req.body.description
  })
  
  try {
    const newBook = await book.save()
    // res.redirect(`books/${newBook.id}`)
    res.redirect('books')
  } catch {
    if (book.coverImageName != null) {
      removeBookCover(book.coverImageName)
    }
    renderNewPage(res, book, true)
  }
})

function removeBookCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), err => {
    if (err) console.error(err)
  })
}

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({})
    const params = {
      authors: authors,
      book: book
    }
    if (hasError) params.errorMessage = 'Error Creating Book'
    res.render('books/new', params)
  } catch {
    res.redirect('/books')
  }
}

module.exports = router