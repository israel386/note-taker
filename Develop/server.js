const fs = rewuire('fs');
const path = require('path');
const express = require('.express');
const dbJson = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static("public"));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    const notes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const parsedNotes = JSON.parse(notes);
    res.json(parsedNotes);
});

app.post('/api/notes', (req, res) => {
    const notes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const parsedNotes = JSON.parse(notes);
    req.body.id = parsedNotes.length.toString();
    parsedNotes.push(req.body);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(parsedNotes), "utf-8");
    res.json("You have successfully added a note!");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.delete("/api/notes/:id", function (req, res) {
    console.log(uuidv1())
    console.log("Req.params:", req.params);
    let removeNotes = parseInt(req.params.id);
    console.log(removeNotes);

    for (let i = 0; i < dbJson.length; i++) {
        if (removeNotes === dbJson[i].id) {
            dbJson.splice(i, 1);

            let noteJson = JSON.stringify(dbJson, null, 2);
            console.log(noteJson);
            fs.writeFile("./db/db.json", noteJson, function (err) {
                if (err) throw err;
                console.log("Your note has been deleted!");
                res.json(dbJson);
            });
        }
    }
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
