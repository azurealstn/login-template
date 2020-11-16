const express = require('express');
const app = express();
const port = 5000;

const { User } = require('./models/User');
const bodyParser = require('body-parser');

const key = require('./config/key');

//application/x-www-form-encoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose
  .connect(key.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('Hello World! Nodemon Test');
});

// 회원가입 엔드포인트
app.post('/register', (request, response) => {
  //회원 정보를 DB에 저장
  const user = new User(request.body);
  user.save((error, userInfo) => {
    if (error) return response.json({ saveSuccess: false, error });
    return response.status(200).json({ saveSuccess: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
