# 따라하며 배우는 노드, 리액트 시리즈

- [x] 기본 강의
- [x] 영화 애플리케이션

---

## Troubleshooting

### React Hooks의 useEffect()가 두 번 호출되는 문제

React에서 Express로 작성한 GET 요청에 대한 응답 결과를 받는 테스트를 하는 중이었습니다. <br/>
RandigPage.js 컴포넌트에서 useEffect() Hook을 사용해서 요청에 대한 응답을 console.log()로 호출했는데 두 번 호출이 되었습니다.

검색해보니 해당 문제를 야기할 수 있는 원인들 중 현재 상황과 비슷한 내용을 찾을 수 있었습니다. <br />
원인은 CRA로 프로젝트를 생성하면 StrictMode가 적용되어 두 번 렌더링되는 문제였습니다.

---

### [React 18 Strict Mode](https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state)에서 새로 도입된 기능으로 useEffect가 두 번 호출되는 것입니다.

아래의 설명은 React 18의 useEffect에서 발생하는 두 번 호출되는 문제가 아닙니다.

---

참고한 [Answer](https://stackoverflow.com/a/60619061)에서 설명하는 세 번째 이슈가 원인이라는 것을 알 수 있었습니다.

![StrictMode1](./troubleshooting/boiler-plate/StrictMode1.png)
![StrictMode2](./troubleshooting/boiler-plate/StrictMode2.png)

다음 코드는 GET 요청에 대한 응답이 두 번 렌더링 되는 코드입니다.

```js
import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((res) => {
      console.log(res);
    });
  }, []);

  return <div>LandingPage</div>;
}

export default LandingPage;
```

응답의 결과를 출력하는 console.log() 메서드가 두 번 호출되는 것을 확인할 수 있었습니다.

<br />

[React 공식 문서](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)에서도 밝히고 있듯이,

### StrictMode를 활성화하면 예상치 못한 사이드 이펙트를 막는 것을 방지할 수 있습니다. <br />

렌더링 단계의 생명주기 메서드들은 여러 번 호출될 수 있기 때문에, 사이드 이펙트를 포함하지 않는 것이 중요합니다. <br />
이 규칙을 무시할 경우, 메모리 누수 혹은 잘못된 애플리케이션 상태 등 다양한 문제를 일으킬 가능성이 있습니다. <br />
자동으로 사이드 이펙트를 찾아주는 것은 불가능하지만, 조금 더 예측할 수 있게끔 만들어서 문제가 되는 부분을 발견할 수 있게 도와줍니다. <br />
이는 렌더링 단계의 메서드들을 의도적으로 이중으로 호출해서 사이드 이펙트를 찾을 수 있습니다. <br />

StrictMode는 개발모드에서만 적용되고 프로덕션 모드에서만 이중으로 호출되지 않습니다.

create-react-app으로 프로젝트를 생성하면 다음과 같이 StrictMode가 활성화 되어있습니다.

```js
// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

StrictMode를 비활성화하려고 한다면 App을 감싸고 있는 React.StrictMode를 제거 또는 주석처리를 해야합니다. <br />
이 문제는 작성한 코드의 의도와는 다르게 두 번 호출 되어 찾아보고 이해하는 과정에서 시간 소요가 생각보다 길어졌던 문제였습니다.

### React Router의 Props를 받아오지 못하는 문제

LoginPage 컴포넌트에서 로그인에 성공한 후에 랜딩 페이지로 이동하려고 컴포넌트에서 props를 받아왔으나 아무런 값을 받아오지 못하는 문제가 발생했습니다.
원인은 현재 React Router 버전은 v6, 강의 버전은 v5로 버전업에 따라 props를 받아오는 방식이 달라졌습니다. <br />
찾아보니 [React Router v5: The Complete Guide](https://www.sitepoint.com/react-router-complete-guide/)에서 이유를 찾을 수 있었습니다.

![react-router-dom_1](./troubleshooting/boiler-plate/react-router-dom_1.jpeg)

v5의 route props의 전달 방식은 React Router의 Router 컴포넌트를 사용해서 component prop으로 React 컴포넌트를 렌더링할 때,
암묵적으로 router props: match, location, history를 렌더링 될 컴포넌트의 props로 전달합니다.

하지만 [React router V6: Some of the new changes](https://dev.to/sgarciadev/comment/1jpl0)에서 router props를 v6에서 더 이상 전달할 수 없다고 합니다.

![react-router-dom_2](./troubleshooting/boiler-plate/react-router-dom_2.jpeg)

이 문제는 useNavigate hook을 사용하면 해결할 수 있습니다.

변경 전

```js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_actions";

function LoginPage(props) {

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push('/') // 변경 전
      } else {
        alert("Error");
      }
    });
  };

  ...

}

export default LoginPage;
```

변경 후

```js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_actions";

function LoginPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

  dispatch(loginUser(body)).then((response) => {
    if (response.payload.loginSuccess) {
      navigate("/"); // 변경 후
    } else {
      alert("Error");
    }
  });
  };

  ...

}

export default LoginPage;



```

v5에서는 Route 컴포넌트에서 React 컴포넌트를 render할 때, implicit으로 props를 전달했었는데 v6에서는 Hook을 사용하여 explicit으로 props 전달하는 것을 인지할 수 있어서 더 나은 방법이라고 생각되었습니다.

## Troubleshooting - Movie

무비 앱에서 Load More 버튼으로 영화들을 추가로 가져오는 작업을 하던 중에 에러가 발생했습니다.

![shorthand-properties_1](./troubleshooting/boiler-plate-movie/shorthand-properties_error_1.png)

에러 내용은 "충돌하는 속성이 설정되었을 때, 리렌더를 하는 중 스타일 속성을 바꾸는 과정 중에 스타일을 바꾸는 것에 대한 버그를 일으킬 수 있습니다.
이를 해결 하기 위해서는, 'shorthand'(기존의 문장 소리, 단어 구를 약어 또는 기호로 대체하여 쓰는 방법) 및 'non-shorthand'를 혼합하지 않아야 합니다.
대신에 분리된 값들로 바꾸면 됩니다."

MDN web docs의 [Shorthand properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)에서 문제를 해결할 수 있는 방법을 찾을 수 있었습니다.

![shorthand-properties_2](./troubleshooting/boiler-plate-movie/shorthand-properties_error_2.png)

공식문서의 내용처럼, shorthand properties로 작성하는 방법 대신 longhand properties로 대신하여 시도를 해보았습니다.

다음은 에러가 발생한 코드입니다.

```js
// components/views/LandingPage/Sections/MainImage.js
<div
  style={{
    position: "relative",
    width: "100%",
    height: "500px",
    background: `linear-gradient(to bottom, rgba(0,0,0,0) 39%, 
    rgba(0,0,0,0) 41%, rgba(0,0,0,0.65) 100%),
    url('${props.image}')`,
    backgroundSize: "100%, cover",
    backgroundPosition: "center, center",
  }}
>
  ...
</div>
```

이 코드를 다음과 같이 수정하여 에러를 해결할 수 있었습니다.

```js
// components/views/LandingPage/Sections/MainImage.js
<div
  style={{
    position: "relative",
    width: "100%",
    height: "500px",
    background: `linear-gradient(to bottom, rgba(0,0,0,0) 39%, 
    rgba(0,0,0,0) 41%, rgba(0,0,0,0.65) 100%)`,
    backgroundImage: `url("${props.image}")`,
    backgroundSize: "100%, cover",
    backgroundPosition: "center, center",
  }}
>
  ...
</div>
```

이 에러는 수정하지 않아도 정상적으로 애플리케이션이 동작하지만 그 점을 간과하여 나중에 발생할 수도 있는 잠재적 위험에 대한 대비를 하는 것이 좋을 것이라고 생각되었습니다.
