import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  console.log({ errors });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <input defaultValue="test" {...register("example")} />
    <input
      {...register("exampleRequired", {
        required: true,
        pattern: {
          value:
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
          message: "이메일 형식에 맞지 않습니다.",
        },
      })}
    />
    <input type="submit" />
  </form>
  )
}

export default Login