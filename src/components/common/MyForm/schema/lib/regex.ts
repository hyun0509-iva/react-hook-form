export const emailPattern: RegExp =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{3,6}(?:\.[a-z]{2})?)$/;
export const passwordPattern: RegExp = /(?=.*[a-zA-ZS])(?=.*?[#?!@$%^&*-])/;
