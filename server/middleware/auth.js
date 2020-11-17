const { User } = require('../models/User');

let auth = (request, response, next) => {
  //인증 처리 로직
  // 클라이언트에서 쿠키 토큰 가져오기
  let token = request.cookies.x_auth;

  // 가져온 토큰 복호화 한후 유저 찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return response.json({ isAuth: false, error: true });

    //request에 token, user 정보를 넣어준다.
    request.token = token;
    request.user = user;
    next(); // 미들웨어 수행하고 다음으로 이동할 수 있게 함수 호출
  });
};

module.exports = { auth };
