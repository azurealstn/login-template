const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 6,
  },
  role: {
    type: Number,
    default: 0, //0: 일반유저
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// mongodb save() 하기 전에 password 암호화(bcrypt)
// next(): 바로 mongodb save() 로 이동
// user.password === myPlaintextPassword: 암호화가 아닌 사용자가 입력한 password
userSchema.pre('save', function (next) {
  let user = this; //userSchema

  //password가 변경될 때에만 암호화를 해준다.
  //만약 password가 아닌 email변경시 다시 암호화 해주기 때문에 error 발생
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash; //hash로 변경
        next();
      });
    });
  } else {
    next();
  }
});

//myPlaintextPassword와 bcrypt password가 서로 같은지 확인
userSchema.methods.confirmPassword = function (myPlaintextPassword, fn) {
  bcrypt.compare(myPlaintextPassword, this.password, function (err, isSame) {
    if (err) return fn(err);
    fn(null, isSame);
  });
};

//토큰 생성
userSchema.methods.createToken = function (fn) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), 'secretToken');

  user.token = token;
  user.save(function (err, user) {
    if (err) return fn(err);
    fn(null, user);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
