const { Router } = require('express');
const router = Router();
const fs = require('fs');   

const json_contacts = fs.readFileSync('src/contacts.json', 'utf-8');
const contact = JSON.parse(json_contacts);

router.get('/', (req, res) => {
    res.render('index.ejs', {
        contact
    })
});

router.get('/new-entry', (req,res) => {
    res.render('new-entry');
});

router.post('/new-entry', (req, res) => {
    const {name, lastName, number, email} = req.body;
    if (!name || !lastName || !number || !email) {
    res.status(400).send('Todas las entradas son requeridas');
    return;
    }      
    
    let newContact = {
        name: name,
        lastName: lastName,
        number: number,
        email: email
    };
    contact.push(newContact);

    const json_contacts = JSON.stringify(contact)
    fs.writeFileSync('src/contacts.json', json_contacts, 'utf-8');

    res.send('received');
});

module.exports = router;