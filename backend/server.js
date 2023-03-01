const express = require("express");
const app = express();
const mongoose  = require("mongoose");
const employeeCRUD = require("./controllers/MovieeCrud");
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/moviedata", {
    useNewUrlParser: true
})
.then(() => {
    app.get('/findAllMovies', employeeCRUD.findAllmoviees)

    app.post('/addNewMoviee', employeeCRUD.createUser)

    app.patch('/editMovies/:id', employeeCRUD.updatemoviees)

    app.delete('/deleteMovies/:id', employeeCRUD.deletemoviees)
})
.catch(() => {
    console.log("Database connection failed!");
})

app.listen(3001, () => {
    console.log("Server listening on 3001")
})