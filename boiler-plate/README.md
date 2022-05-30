# 기본강의

## 필요한 설정

MongoDB를 사용하고 있고, DB에 연결하기 위한 설정이 필요합니다.

```js
module.exports = {
  mongoURI:
    "mongodb+srv://id:password@cluster0.example.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};
```

[Connection String URI Format](https://www.mongodb.com/docs/manual/reference/connection-string/)을 위와 같이 "server/config/dev.js" 경로에 작성해줍니다.

## 실행

"client", "server" 경로에서 다음 명령어로 패키지들을 설치해줍니다.

```js
npm i
```

명령어로 패키지들을 설치하고 "server" 경로에서 다음 명령어로 client와 server를 동시에 실행해줍니다.

```js
npm run dev
```

정상적으로 실행됐다면 시작 페이지 문구와 로그인, 로그아웃, 회원가입 버튼이 보일 것입니다.
로그인 상태에 따른 인증 처리가 되어 있으므로 버튼은 보이지만 이동은 되지 않을 수 있습니다.
