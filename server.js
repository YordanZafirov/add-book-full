const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config()
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

db.connect(err =>{
    if(err) throw err;
    console.log('MySql Connected');
})

const app = express();
let staticPath = path.join(__dirname, "front-end");


app.use(express.static(staticPath));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "/index.html"));

});

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const coordRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

app.post('/save-data', (req, res) => {
    let { firstName,
        lastName,
        email,
        number,
        address,
        coordinates } = req.body;

        if (firstName.length < 3) {
            return res.json({
                'alert': 'First name must be 3 characters long'
            });
        } else if (lastName.length < 3) {
            return res.json({
                'alert': 'Last name must be 3 characters long'
            });
        }  else if (!email.length) {
            return res.json({
                'alert': 'Enter your email'
            });
        } else if (!emailRegex.test(email)) {
            return res.json({
                'alert': 'Invalid email address'
            });
        } else if (!number.length) {
            return res.json({
                'alert': 'Enter your phone number'
            });
        } else if (!Number(number) || number.length != 10) {
            return res.json({
                'alert': 'Invalid phone number'
            });
        } else if (!address.length) {
            return res.json({
                'alert': 'Enter your address'
            });
        } else if (!coordRegex.test(coordinates)) {
            return res.json({
                'alert': 'Invalid coordinates'
            });
        }

        const query = `INSERT INTO users (first_name, last_name, 
        email, number, address, coordinates)
        VALUES ("${firstName}", "${lastName}", "${email}",
        "${number}", "${address}", "${coordinates}")`;

        db.query(query, (err, data)=>{
            if(err) throw err;
            console.log('Information inserted');
        })
});

app.get('/get-data', (req, res)=>{
    const query = 'SELECT * FROM users';
    db.query(query, (err, data)=>{
        if(err) throw err;
        res.status(200).json(data);
        db.destroy();
    });
});

app.post('/update-data', (req, res)=>{
    const {firstName, lastName, email, number, address, coordinates} = req.body;

    if (!email.length) {
        return res.json({
            'alert': 'Enter your email'
        });
    } else if (!emailRegex.test(email)) {
        return res.json({
            'alert': 'Invalid email address'
        });
    } else if (!number.length) {
        return res.json({
            'alert': 'Enter your phone number'
        });
    } else if (!Number(number) || number.length != 10) {
        return res.json({
            'alert': 'Invalid phone number'
        });
    } else if (!address.length) {
        return res.json({
            'alert': 'Enter your address'
        });
    } else if (!coordRegex.test(coordinates)) {
        return res.json({
            'alert': 'Invalid coordinates'
        });
    }

    const query = `UPDATE users SET 
    email = "${email}", number = "${number}", address = "${address}", coordinates = "${coordinates}"
    WHERE first_name = "${firstName}" AND last_name = "${lastName}"
    `;
    db.query(query, (err, data)=>{
        if(err) throw err;
        console.log("Information updated");
    })
})

app.post('/delete-data', (req, res)=>{
    let {id} = req.body;
    const query = `DELETE FROM users WHERE id = "${id}"`;
    db.query(query, (err, data)=>{
        if(err) throw err;
        console.log("Information deleted");
    })
    
});

app.listen(PORT, () => {
    console.log(`Connected to ${PORT}`);
});