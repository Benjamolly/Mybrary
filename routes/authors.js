const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')

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
//This has to go before any other get requests because the server goes from top to bottom. Therefore if this was at the bottom then it would think that 'new' is an id as it would follow the route of 'router.get('/:id')

//Create new author route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
         res.redirect(`authors/${newAuthor.id}`)
        // res.redirect('authors')
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        })
    }
})

router.get('/:id', async (req, res)=> {
    try {
        const author = await Author.findById(req.params.id)
        const books = await Book.find({author: author.id}).limit(6).exec()
        res.render('authors/show', {author: author, booksByAuthor: books})
    } catch{
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req, res)=>{
    try{
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', {author: author })
    } catch {
        res.redirect('/authors')
    }
})

// Browser only allows get and post, so we need to install method override
router.put('/:id', async (req, res) => {
    let author
    // The 'let author is used because we need to define the variable of author outside of the try catch to use it in both. 
    try{
        author = await Author.findById(req.params.id)
        author.name = req.body.name // changes the name
        await author.save()
        res.redirect(`/authors/${author.id}`)
        
    } catch {
        if(author == null){
            res.redirect('/')
            // using the home page because you can't edit an author that is null
        } else {
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error updating author'
            })
        }
    }

})

router.delete('/:id', async (req, res)=> {
    let author
    // The 'let author is used because we need to define the variable of author outside of the try catch to use it in both. 
    try{
        author = await Author.findById(req.params.id)
        await author.remove()
        //Delete is when you know the id, type etc. Remove is when it is a whole array
        res.redirect(`/authors`)
        
    } catch {
        if(author == null){
            res.redirect('/')
            // using the home page because you can't delete an author that is null
        } else {
            res.redirect(`/authors/${author.id}`)
        }
    }
})


module.exports = router