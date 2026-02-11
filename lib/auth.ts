const jwt =  require("jsonwebtoken")

const SECRET = process.env.JWT_SECRET;

export function signToken(payload: any) {
  console.log("*****Signing token", payload.userEmail);
  
  return jwt.sign(payload, SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET)
}
