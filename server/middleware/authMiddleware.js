import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No Token , Authorization Denied" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`decoded user is `, req.user);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(400).json({ message: "token is not valid " });
  }
};
// export const requireRole = (role) => (req, res, next) => {
//   if (req.user && req.user.role === role) {
//     next();
//   } else {
//     res
//       .status(403)
//       .json({ message: "Forbidden: Insufficient role permissions" });
//   }
// };
export const requireRole =
  (...roles) =>
  (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Forbidden: Insufficient role permissions" });
    }
  };

export default verifyToken;
