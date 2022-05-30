# 영화 애플리케이션

## 필요한 설정

### MongoDB Connection URI

MongoDB를 사용하고 있고, DB에 연결하기 위한 설정이 필요합니다.

```js
module.exports = {
  mongoURI:
    "mongodb+srv://id:password@cluster0.example.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};
```

[Connection String URI Format](https://www.mongodb.com/docs/manual/reference/connection-string/)을 위와 같이 "server/config/dev.js" 경로에 작성해줍니다.

### 영화 정보 API Key

영화 정보를 받아오기 위한 API key가 필요합니다.

[themoviedb](https://www.themoviedb.org/)에 로그인을 한 뒤
[https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)에서 API Key를 생성해줍니다.

```js
module.exports = {
  API_KEY: "api_key",
};
```

client/src/config/keys.js 파일을 생성하고 발급받은 API Key를 위와 같이 설정해줍니다.

## 실행

"client", "server" 경로에서 다음 명령어로 패키지들을 설치해줍니다.

```js
npm i
```

명령어로 패키지들을 설치하고 "server" 경로에서 다음 명령어로 client와 server를 동시에 실행해줍니다.

```js
npm run dev
```

정상적으로 실행됐다면 시작 페이지에 영화 목록이 보일 것 입니다.
