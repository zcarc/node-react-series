# 쇼핑몰 애플리케이션

## 소개 영상

제공된 소개 영상에서 [애플리케이션 시연](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%87%BC%ED%95%91%EB%AA%B0/lecture/41242?tab=curriculum&volume=1.00)을 미리 확인해볼 수 있습니다.

## 필요한 설정

### MongoDB Connection URI

MongoDB를 사용하고 있고, DB에 연결하기 위한 설정이 필요합니다.

```js
// boiler-plate-shop/server/config/dev.js
module.exports = {
  mongoURI:
    "mongodb+srv://id:password@cluster0.example.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};
```

[Connection String URI Format](https://www.mongodb.com/docs/manual/reference/connection-string/)을 위와 같이 "server/config/dev.js" 경로에 작성해줍니다.

### Paypal Client ID

쇼핑몰에 담긴 상품들을 페이팔을 통해 결제하므로 Paypal Client ID가 필요합니다.

Paypal에 로그인 하고
[https://developer.paypal.com/developer/accounts](https://developer.paypal.com/developer/accounts)
에서 Sandbox Accounts를 통해서 Personal, Business 계정을 만들어줍니다.

그런 다음 [https://developer.paypal.com/developer/applications](https://developer.paypal.com/developer/applications) 로 이동해서 Rest API app을 생성해줍니다. App type은 Merchant로 설정하고 생성한 Business 계정으로 Sandbox Business Account를 설정해서 생성해줍니다.

```js
// boiler-plate-shop/client/src/config/dev.js
module.exports = {
  paypalClientID: "Client_ID",
};
```

client/src/config 경로에 dev.js를 생성하고 Paypal에서 생성한 App의 Client ID를 할당해줍니다.

## 실행

"client", "server" 경로에서 다음 명령어로 패키지들을 설치해줍니다.

```js
npm i
```

명령어로 패키지들을 설치하고 "server" 경로에서 다음 명령어로 client와 server를 동시에 실행해줍니다.

```js
npm run dev
```
