const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//All authors route
// the '/' gets appended onto the route declared in server.js (/authors)
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== ''){
        // querry because: POST = body, GET = querry
        searchOptions.name = new RegExp(req.query.name, 'i')
        // 'i' means that it isn't case sensitive
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors, 
            searchOptions: req.query 
        })
    } catch {
        res.redirect('/')
    }
})

//New author route
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author() })
})

//Create new author route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
         // res.redirect(`authors/${newAuthor.id}`)
        res.redirect('authors')
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        })
    }
})

module.exports = router
