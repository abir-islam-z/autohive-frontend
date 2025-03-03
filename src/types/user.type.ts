export type TUserToken = {
  userId: string;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isBlocked: boolean;
};
