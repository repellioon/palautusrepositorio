const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://reedsi:${password}@cluster0.j70e0vx.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 }) //muodostetaan yhteys tietokantaan

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/*const note = new Note({ //muistiinpano-olio
  content: 'HTML is easy',
  important: true,
})*/

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

/*//tallennus tietokantaan metodilla save
note.save().then(result => { //tallennusoperaation tulos on takaisinkutsun parametrissa 'result'
  console.log('note saved!')
  mongoose.connection.close() //komennolla suljetaan tietokantaan yhteys
})*/