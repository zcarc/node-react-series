import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../_actions/user_actions";

export default function (SpecificComponent, option, adminRoute = null) {
  // option
  // null => 아무나 출입이 가능한 페이지
  // true => 로그인한 유저만 출입이 가능한 페이지
  // false => 로그인한 유저는 출입이 불가능한 페이지

  // adminRoute
  // true => 어드민 유저만 출입이 가능한 페이지

  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          // 로그인한 유저만 출입이 가능하므로 다른 페이지로 이동
          if (option) {
            navigate("/login");
          }
          // 로그인 한 상태
        } else {
          // 관리자만 출입 가능하지만 해당 유저가 관리자가 아닌 경우 다른 페이지로 이동
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            // 로그인 한 상태인 유저인데 로그인 한 유저는 방문할 수 없게 설정한 경우 다른 페이지로 이동
            if (option === false) {
              navigate("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
