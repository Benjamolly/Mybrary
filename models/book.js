// const mongoose = require('mongoose');
// const path = require('path');

// const coverImageBasePath = 'uploads/bookCovers'

// const bookSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String
//     },
//     publishDate: {
//         type: Date,
//         required: true
//     },
//     pageCount: {
//         type: Number,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         required: true,
//         default: Date.now
//     },
//     coverImageName: {
//         type: String,
//         required: true
//     },
//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         // The above simply tells Mongoose to reference another collection.
//         required: true,
//         ref: 'Author'
//         // The above must match the module.exports name on the referenced model
//     }

// })

// bookSchema.virtual('coverImagePath').get(function(){
//     // a function() is used instead of () => {} because we need to use this.object
//     if(this.coverImageName != null){
//         return path.join('/', coverImageBasePath, this.coverImageName)
//     }
// })
// // Virtual is like the properties above except that it derives its value from the paths above

// // 'Book' is essentialy the name of the table
// module.exports = mongoose.model('Book', bookSchema)
// module.exports.coverImageBasePath = coverImageBasePath

const mongoose = require('mongoose')
const path = require('path')

const coverImageBasePath = 'uploads/bookCovers'

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImageName: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  }
})

bookSchema.virtual('coverImagePath').get(function() {
  if (this.coverImageName != null) {
    return path.join('/', coverImageBasePath, this.coverImageName)
  }
})

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath