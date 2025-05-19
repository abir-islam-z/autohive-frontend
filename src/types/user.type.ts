export type TUserToken = {
  userId: string;
  avatar: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  bio: string;
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
  avatar: string;
  isBlocked: boolean;
};
