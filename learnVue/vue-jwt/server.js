const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// 跨域配置
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method.toLowerCase() === 'options') {
    return res.end();
  }
  next();
});

app.use(bodyParser.json());

const secret = 'zfjg';

app.get('/test', (req, res) => {
  res.send({ test: 'test' });
});

// 登录
app.post('/login', (req, res) => {
  const { username } = req.body;
  // 如果访问的是admin 种植cookie
  if (username === 'admin') {
    res.json({
      code: 0,
      username: 'admin',
      // 生成token
      token: jwt.sign({ username: 'admin' }, secret, {
        expiresIn: 20,
      }),
    });
  } else {
    res.json({
      code: 1,
      data: '用户名不存在',
    });
  }
});

// 验证登录
app.get('/validate', (req, res) => {
  const token = req.headers.authorization;
  // 验证token的可靠性
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return res.json({
        code: 1,
        data: 'token失效了',
      });
    }
    res.json({
      username: decode.username,
      code: 0, // 延长tokne的过期时间
      token: jwt.sign({ username: 'admin' }, secret, {
        expiresIn: 20,
      }),
    });
  });
});

app.listen(3000);
