import express from 'express';
import authenticate from '../middlewares/authenticate';
import Application from '../../modules/Application.js';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
    Application.createJSONforFrontEnd(function(ourJSON) {
        res.json({ourJSON});
    });
});

router.patch('/definition', (req, res) => {
    Application.objectModelToXML(req.body);
    res.connection.setTimeout(0);
});

export default router;
