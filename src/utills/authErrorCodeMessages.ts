type AuthErrorCodeMessages = {
  [key: string]: string;
  default: string;
};

const authErrorCodeMessages: AuthErrorCodeMessages = {
  "auth/email-already-in-use": "이미 사용중인 이메일입니다.",
  "auth/user-not-found": "이메일 혹은 비밀번호가 일치하지 않습니다.",
  "auth/wrong-password": "이메일 혹은 비밀번호가 일치하지 않습니다.",
  "auth/weak-password": "비밀번호를 6글자 이상으로 지정해주세요.",
  "auth/network-request-failed": "네트워크 연결에 실패했습니다.",
  "auth/invalid-email": "이메일 형식이 올바르지 않습니다.",
  default: "요청에 실패했습니다. 잠시 후 실행해주세요",
};

export default authErrorCodeMessages;
