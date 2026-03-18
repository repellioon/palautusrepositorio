const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://reettapvirtanen_db_user:${password}@cluster0.dhjqqa6.mongodb.net/blogilista?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const blogSchema = new mongoose.Schema({
  aurhor: String,
  title: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  author: 'Sakko  Lappunen',
  title: 'uusi blogi 18.3.2026',
  url: '',
  likes: 1,
})

blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})