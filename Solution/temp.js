let dbparams = {
	host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'pleasedowokforall',
	port:3306
}

const xmysql = require('mysql2');
const conn = xmysql.createConnection(dbparams);

const express = require('express');
const app = express();
// const cors = require('cors');
// app.use(cors());

// const bodyParser = require('body-parser');

app.use(express.static('abc'));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not


//get all book from table URI
app.get('/getAll', function (req, res) {
    
		conn.query('select * from book',[],(err,rows)=>{
			console.log(rows)
			res.send(rows)
		})
		});

//add book URI
app.get('/addbook', function (req, res) {

		let input=
			{
			bookid : req.query.bookid ,
			bookname : req.query.bookname,
			price : req.query.price
			}
			 
		console.log(input)

		let output = false;

		conn.query(' insert into book(bookid,bookname,price) values(?,?,?);',[input.bookid,input.bookname,input.price],(err,res1)=>{
			if(err){
				console.log(err)	
			}
			else{
			console.log(res1)
			if(res1.affectedRows>0){
				output=true;
			}
		}
			console.log(output)
			res.send(output)
		})
	});		

app.listen(8081, function () {
    console.log("server listening at port 8081...");
});