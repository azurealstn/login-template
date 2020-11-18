const express = require('express');
const app = express();
const port = 5000;

const { auth } = require('./middleware/auth');
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
app.post('/api/users/register', (request, response) => {
  //회원 정보를 DB에 저장
  const user = new User(request.body);
  user.save((error, userInfo) => {
    if (error) return response.json({ saveSuccess: false, error });
    return response.status(200).json({ saveSuccess: true });
  });
});

app.post('/api/users/login', (request, response) => {
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

app.get('/api/users/auth', auth, (request, response) => {
  //미들웨어를 통과하면 auth: true
  response.status(200).json({
    _id: request.user._id, //auth.js에서 user, token을 request에 넣어서 가능
    isAdmin: request.user.role === 0 ? false : true, //role: 0이면 관리자가 아닌 일반유저
    isAuth: true,
    email: request.user.email,
    name: request.user.name,
    role: request.user.role,
    image: request.user.image,
  });
});

app.get('/api/users/logout', auth, (request, response) => {
  // 로그아웃하려면 DB에 있는 토큰 null로 만든다.
  User.findOneAndUpdate(
    { _id: request.user._id },
    { token: '' },
    (err, user) => {
      if (err) return response.json({ logoutSuccess: false, err });
      return response.status(200).send({ logoutSuccess: true });
    },
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 5000;
