const mongoose = require('mongoose')
const app = require('./app')

const mongoUrl = `mongodb+srv://reettapvirtanen_db_user:mz0ANpcfg8tHEp9f@cluster0.dhjqqa6.mongodb.net/blogilista?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(mongoUrl, { family: 4 })

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})