import jwt from "jsonwebtoken";

let generateToken = (propierties: any, key: any, minutes: number) =>
  jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + minutes * 60,
      data: propierties,
    },
    key
  );

export default generateToken;