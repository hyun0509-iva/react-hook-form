import { ZodType, z } from "zod";
import { emailPattern, passwordPattern } from "./lib/regex";

type TEmailSchemaType = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
};

export const customErrorMessage = {
  email: "이메일 형식이 아닙니다.",
  password: "비밀번호는 영문자, 숫자, 특수문자를 조합하여 6~24자리의 비밀번호",
  nickname: "닉네임은 6~24자리입니다.",
};

export const emailField = () =>
  // z.string().email(message.errorMsg.email)
  z
    .string({
      // required_error: "이메일을 입력해주세요.",
      // required_error는 필드값이 비어있는 경우 트리거되는게 아니라
      // input에 {...register("email")}이 없는 경우, 즉 필드가
      // react-hook-form에 등록되지 않는 경우에 트리거 된다.
      //빈문자열은 트리거되지 않음 (input에 입력하지 않아도 빈문자열이 반환됨)
      //필수로 입력하지 않는 경우 메시지를 출력하고 싶다면 .min(1)로 구현하기.
    })
    .min(1, { message: "이메일이 비어있습니다." })
    .regex(emailPattern, { message: customErrorMessage.email });

export const passwordField = () =>
  z
    .string({
      required_error: "비밀번호를 입력해주세요.",
    })
    .min(1, { message: "비밀번호이 비어있습니다." })
    .min(6, {
      message: customErrorMessage.password,
    })
    .max(24, {
      message: customErrorMessage.password,
    })
    .regex(passwordPattern, {
      message: customErrorMessage.password,
    });

export const nicknameField = () =>
  z
    .string({ required_error: "닉네임을 입력해주세요." })
    .min(1, { message: "비밀번호가 비어있습니다." })
    .min(6, { message: customErrorMessage.nickname })
    .max(24, { message: customErrorMessage.nickname });

export type TAuthschema = z.infer<typeof Authschema>;
//z.infer는 zod 스키마의 타입을 추론하기 위해 해당 스키마가 어떤 타입을 정의하는지를 알려줌
//즉, 정의한 해당 스키마의 타입을 가져올 때 사용

export const Authschema: ZodType<TEmailSchemaType> = z
  .object({
    email: emailField(),
    password: passwordField(),
    confirmPassword: passwordField(),
    nickname: nicknameField(),
  })
  // .required() //기본값 (필드 선택은 .optional() 사용)
  .refine((data) => data.password === data.confirmPassword, {
    //refine는 유효성 검사 규칙을 정의하거나 추가적인 조건을 정의
    //이것을 통해 유효성 검사를 좀 더 엄격하게 검사 가능
    //위에서 object에 넣은 스키마에서 정의한 타입외에 좀더
    //세밀하게 검증하고 싶을 때 사용
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });
