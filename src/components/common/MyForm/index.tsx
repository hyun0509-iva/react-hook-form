import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Authschema,
  TAuthschema,
  emailField,
  nicknameField,
  passwordField,
} from "./schema";

const MyForm = () => {
  const [isDisabledField, setIsDisabledField] = useState(true);
  const {
    watch,
    control,
    register,
    setFocus,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid }, //formState에 대한 정보를 불러옴(여러 속성이 존재, 공식문서 참조)
  } = useForm<TAuthschema>({
    mode: "onChange", //실시간 검증
    resolver: zodResolver(Authschema),
    // 유효성 검증 라이브러리를 등록
    // zodResolver 파라미터로 아까 정의한 스키마를 넣어준다.
  });

  useEffect(() => {
    setFocus("email"); //포커스
  }, [setFocus]);

  useEffect(() => {
    setIsDisabledField(!isValid);
  }, [isValid]);

  const onSubmit = (data: TAuthschema) => {
    // 에러 없이 정상적으로 submit 될 때 실행됨.
    console.log("form submit", data);
    console.log(JSON.stringify(getValues()) === JSON.stringify(data)); // data랑 getValues랑 내용은 같음
    reset(); //입력한 필드 모두 초기화
    // resetField는 특정 필드만 초기화 ex) resetField('emmail') 이메일 필드만 초기화
  };
  // register은 첫번째 인자는 필수로 name(아까 지정한 스키마 속성으로 정의, 타입지정하지 않으면 아무거나 해도 상관은 없지만)
  // 두번째 인자는 options로 객체가 들어감, 해당 객체는 유효성 검사를 위한 프로퍼티들이 들어있음
  // -> required, min, max, minLength, maxLength, pattern 이렇게 많은 프로퍼티들이 있음
  // 사용법 register("name", {required: true, minLength: 10});
  // zod로 이미 유효성관련해서 정의해서 사용하지 않음.

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email"> Email </label>
        <input type="email" {...register("email")} autoComplete="off" />
        <br />
        {errors.email && <span className="error">{errors.email.message}</span>}
        <br />
        <label htmlFor="password"> Password: </label>
        <input type="password" {...register("password")} autoComplete="off" />
        <br />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
        <br />
        <label htmlFor="confirmPassword"> Confirm Password: </label>
        <input
          type="password"
          {...register("confirmPassword")}
          autoComplete="off"
        />
        <br />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}
        <br />
        <label htmlFor="nickname"> nickname </label>
        <input type="text" {...register("nickname")} autoComplete="off" />{" "}
        <br />
        {errors.nickname && (
          <span className="error">{errors.nickname.message}</span>
        )}
        <br />
        <button type="submit" disabled={isDisabledField}>
          제출
        </button>
      </form>
    </>
  );
};

/* 
   watch 
   : 필드 값을 구독하고, 실시간으로 체크
     - 파라미터를 넣으면 해당 필드만, 없다면 모든 필드를 구독함
     - 값을 반환하며 리랜더링 발생
      ㄴ> 조건에 따라 어떠한 처리를 하고 싶은 경우 사용할 수 있다.
          예를 들어 조건에 따라 다른 폼양식을 보여주거나 스타일링할 때
   vs getValues : 값이 반환하지만 랜더링하지는 않음
*/

export default MyForm;

/* 
  참고: https://www.youtube.com/watch?v=dldjCPa9ZW4&t=178s (강의)
  code: https://github.com/machadop1407/react-hook-form-zod


  참고할만한 포스팅
  - https://tech.osci.kr/introduce-react-hook-form/
  - https://www.daleseo.com/zod-schema/
*/