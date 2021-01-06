const fs = require('fs'); // file 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})

app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express!'});
});

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER where isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.use('/image', express.static('./upload')); // 사용자 입장에서 image라는 이름의 경로로 접근하나 실제 서버에 있는 upload와 매핑된다.

// post 요청 -> image , 남은 text 데이터 -> query -> mysql 삽입 -> rows를 보냄
app.post('/api/customers', upload.single('image'), (req,res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];

    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 where id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));