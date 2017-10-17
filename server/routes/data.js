import express from 'express';
import mongoose from 'mongoose';
import authenticate from '../middlewares/authenticate';
import Application from '../../modules/Application.js';
//import MAIN_DATA from '../frontEndJSON.json';

let router = express.Router();

router.get('/', authenticate, (req, res) => {
    //res.json({ MAIN_DATA });
    Application.createJSONforFrontEnd(function(ourJSON) {
        res.json({ourJSON});
    });
});

router.patch('/definition', (req, res) => {
    Application.objectModelToXML(req.body);
    res.connection.setTimeout(0);
});

export default router;
