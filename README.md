# 따라하며 배우는 노드, 리액트 시리즈

- [ ] 기본 강의

---

## Troubleshooting

### React Hooks의 useEffect()가 두 번 호출되는 문제

React에서 Express로 작성한 GET 요청에 대한 응답 결과를 받는 테스트를 하는 중이었습니다. <br/>
RandigPage.js 컴포넌트에서 useEffect() Hook을 사용해서 요청에 대한 응답을 console.log()로 호출했는데 두 번 호출이 되었습니다.

검색해보니 해당 문제를 야기할 수 있는 원인들 중 현재 상황과 비슷한 내용을 찾을 수 있었습니다. <br />
원인은 CRA로 프로젝트를 생성하면 StrictMode가 적용되어 두 번 렌더링되는 문제였습니다.

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
