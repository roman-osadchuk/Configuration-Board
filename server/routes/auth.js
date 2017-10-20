import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config';
import firebaseRef from '../firebaseConfig.js';

const router = express.Router();

let userObject;
let usersArray = [];

firebaseRef.on('value', (snapshot) => {
    userObject = snapshot.val();

    for (let userIndex in userObject.users) {
        usersArray.push(userObject.users[userIndex]);
    }

}, (error) => {
    console.log('Error: ' + error.code);
});

router.post('/', (req, res) => {
    const { username, password } = req.body;

    var user = usersArray.filter(function(value) {
        if (req.body.username === value.username) {
            return value;
        }
    });

    if (user[0]) {
        const users_login_password = req.body.password;

        if(bcrypt.compareSync(users_login_password, user[0].password)) {
            const token = jwt.sign({
                id: user[0]._id,
                username: user[0].username
            }, config.jwtSecret);

            res.json({ token });
        } else {
            res.status(401).json({ errors: { form: 'Invalid Credentials' } });
        }
    } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
});

export default router;
