import * as jwt from "jsonwebtoken";

const getSignedToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "1hr" });
};

export default getSignedToken;
