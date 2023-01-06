const express = require("express");
const newUser = require("../models/register");
const router = express.Router();
const mongoose = require('mongoose')
const grocery = require("../models/products");
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Remixximer',
    database: 'drugdatabase'
});

connection.connect();
// connection.query('SELECT * FROM `customer`', function (error, results, fields) {
//     console.log(results);
// });


// Home page


router.get("/homepage", (req, res) => {


    connection.query('select pname,quantity from inventory', function (err, results, fields) {
        // console.log(results[0].pname, results[0].quantity);
        res.render("homepage", {
            i1: results[0].quantity,
            i2: results[1].quantity,
            i3: results[2].quantity,
            i4: results[3].quantity,
            i5: results[4].quantity,
            i6: results[5].quantity,
            i7: results[6].quantity,
            i8: results[7].quantity,
            i9: results[8].quantity,
            i10: results[9].quantity,

        })
    })


})

router.get('/bill', (req, res) => {
    connection.query("select pname,pid,quantity,price from orders", function (err, results, fields) {
        res.render("billsql", {
            foo: results
        });
    })
})



// router.post('/bill', (req, res) => {
//     console.log(req.body)
// })



router.post("/homepage", (req, res) => {
    const x = req.body;
    console.log(x);
    const userid = "12345";
    var i;
    x.forEach(item => {
        connection.query(`select pid from product where pname='${item.name}'`, function (err, results, fields) {
            console.log(results);
            connection.query(`insert into orders (pid,sid,uid,quantity,price,pname)values('${results[0].pid}','sss001','${userid}',${item.quantity},${item.price},'${item.name}')`, function (err, result, fields) {
                if (err) throw err;
            })
            connection.query(`insert into sellertable (pid,sid,uid,quantity,price,pname)values('${results[0].pid}','sss001','${userid}',${item.quantity},${item.price},'${item.name}')`, function (err, result, fields) {
                if (err) throw err;
            })
        })
        // console.log(item);
        i = i + 1;
    });
    res.redirect('/mysql');
})




// login page

router.get('/', (req, res) => {
    res.render("login");
})

router.post("/", (req, res) => {

    console.log(req.body.userPassword);
    console.log(req.body.userEmail);
    const pass = req.body.userPassword;
    const email = req.body.userEmail;
    connection.query(`SELECT * FROM 
        customer WHERE email='${email}' and pass='${pass}'`,
        function (error, results, fields) {
            if (results.length != 0) {
                connection.query(`select uid from customer where email='${email}'`, function (err, result, fields) {
                    // console.log(result[0].uid);
                    res.redirect(`/homepage`);
                });
                // : a$ {
                //     result[0].uid
                // }
            } else {
                res.render('invalid')
            }
        });


})




//Registration page
router.get("/register", (req, res) => {
    res.render("register");
})

router.get('/logout', (req, res) => {
    connection.query('truncate orders', function (err, results, fields) {})
    res.redirect('/');
})

router.post("/register", (req, res) => {
    const uid = req.body.uid;
    const fname = req.body.fName;
    const address = req.body.address;
    const lname = req.body.lName;
    const phnumber = req.body.userphoneNumber;
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    connection.query(`insert into customer values('${uid}','${password}','${fname}','${lname}','${email}','${address}',${phnumber})`);

    res.redirect('/');

})

module.exports = router;