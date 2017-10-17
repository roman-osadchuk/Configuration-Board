import jwt from 'jsonwebtoken';
import config from '../config';
import firebaseRef from '../firebaseConfig.js';

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

export default (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Failed to authenticate' });
            } else {
                
                let user = usersArray.filter((value) => {
                    if (decoded.id === value._id) {
                        return value;
                    }
                });

                if (!user[0]) {
                    res.status(404).json({ error: 'No such user' });
                } else {
                    req.currentUser = user[0];
                    next();
                } 
            }
        });
    } else {
        res.status(403).json({
            error: 'No token provided'
        });
    }
}
