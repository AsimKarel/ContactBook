import express = require('express');
import { DatabaseService } from '../DBLayer/DBService';
import { Contact } from '../Models/Contact';
import { RequestModel } from '../Models/Request';
var router = express.Router()


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.post('/getContacts', function (req, res) {
    const d = new DatabaseService();
    console.log(req.body)
    const conditions = req.body as RequestModel;
    d.getContacts(conditions).then((x) => {
        res.send(x);
    })
        .catch((er: Error) => {
            res.statusCode = 500;
            res.send(er);
        })

});

router.post('/save', function (req, res) {
    const d = new DatabaseService();
    d.saveContact(req.body).then((x) => {
        res.send(x);
    })
        .catch((er) => {
            const response = {
                code: '',
                reason: ''
            };
            if (er.code == 'ER_DUP_ENTRY') {
                response.code = 'EXIST'
                res.statusCode = 401;
                if (er.sqlMessage.indexOf('phone') != -1) {
                    response.reason = 'PHONE'
                }
                else {
                    response.reason = 'EMAIL'
                }
            }
            else {
                res.statusCode = 500;
                response.code = "SERVER_ERROR";
            }
            res.send(response)
        })
});

router.put('/update', function (req, res) {
    const d = new DatabaseService();
    console.log(req.body)
    d.updateContact(req.body).then((x) => {
        res.send(x);
    })
        .catch((er) => {
            const response = {
                code: '',
                reason: ''
            };
            if (er.code == 'ER_DUP_ENTRY') {
                response.code = 'EXIST'
                res.statusCode = 401;
                if (er.sqlMessage.indexOf('phone') != -1) {
                    response.reason = 'PHONE'
                }
                else {
                    response.reason = 'EMAIL'
                }
            }
            else {
                res.statusCode = 500;
                response.code = "SERVER_ERROR";
            }
            res.send(response)
        })
});

router.delete('/delete/:id', function (req, res) {
    const d = new DatabaseService();
    console.log(req.params.id)
    d.deleteContact(parseInt(req.params.id)).then((x) => {
        res.send(x);
    })
        .catch((er: Error) => {
            res.statusCode = 500;
            res.send(er);
        })
});


module.exports = router;
