# 따라하며 배우는 노드, 리액트 시리즈

- [ ] 기본 강의

---

## Troubleshooting

### React Hooks의 useEffect()가 두 번 호출되는 문제

React에서 Express로 작성한 GET 요청에 대한 응답 결과를 받는 테스트를 하는 중이었습니다. <br/>
RandigPage.js 컴포넌트에서 useEffect() Hook을 사용해서 요청에 대한 응답을 console.log()로 호출했는데 두 번 호출이 되었습니다.

"useEffect render twice" 라는 키워드로 검색해보니 관련된 글이 많았습니다. <br/>
문제가 발생할 수 있는 원인들 중 현재 상황과 비슷한 내용을 찾을 수 있었습니다.

> 결론은, CRA로 프로젝트를 생성하면 StrictMode가 적용되어 두 번 렌더링되는 문제였습니다.

문제의 코드는 GET 요청에 대한 응답이 두 번 렌더링 되는 간단한 코드입니다.

```js
import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((res) => {
      console.log(res); // 이 코드가 두 번 실행된다.
    });
  }, []);

  return <div>LandingPage</div>;
}

export default LandingPage;
```

응답의 결과를 출력하는 console.log() 메서드가 두 번 호출되는 것을 볼 수 있었습니다.

<br />

[useEffect() is called twice](https://stackoverflow.com/a/60619061) 글을 살펴보니 이유를 알 수 있었습니다.

![StrictMode1](./troubleshooting/boiler-plate/StrictMode1.png)
![StrictMode2](./troubleshooting/boiler-plate/StrictMode2.png)

[React 공식 문서](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)에서도 밝히고 있듯이, StrictMode를 적용해서 예상치 못한 사이드 이펙트를 발견할 수 있도록 도와주며
두 번 렌더링 되는 것은 버그가 아니라 의도된 기능이라는 것을 알 수 있었습니다.
