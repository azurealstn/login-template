const express = require('express');
const app = express();
const port = 5000;

const { User } = require('./models/User');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const key = require('./config/key');

//application/x-www-form-encoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());

//cookie-parser 사용
app.use(cookieParser());

const mongoose = require('mongoose');
const { response } = require('express');
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

app.post('/login', (request, response) => {
  // DB에서 찾기
  User.findOne({ email: request.body.email }, (error, user) => {
    if (!user) {
      return response.json({
        loginSuccess: false,
        message: '해당하는 이메일의 유저가 없습니다.',
      });
    }
    //비밀번호 확인하기
    user.confirmPassword(request.body.password, (error, isSame) => {
      if (!isSame)
        return response.json({
          loginSuccess: false,
          message: '패스워드가 틀렸습니다.',
        });

      //비밀번호가 맞다면 토큰 생성하기
      user.createToken((err, user) => {
        if (err) return response.status(400).send(err);

        //쿠키에 토큰 저장
        response
          .cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
