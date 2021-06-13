import User from "../models/User";
import getSignedToken from "../utils/signedToken";
import bcrypt from "bcrypt";

const createNewUser = async (payload) => {
  try {
    const user = await User.find({ email: payload.email });
    if (user.length > 0) {
      throw new Error("User already exist");
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const newUser = new User({
      email: payload.email,
      password: hashedPassword,
    });
    return newUser.save();
  } catch (error) {
    console.error(error);
    throw new Error("All field required");
  }
};
const signInUser = (payload) => {
  const { password } = payload;
  try {
    const user = User.findOne({ email: payload.email });
    if (!user) {
      throw new Error("Please enter email or password");
    }
    const res = bcrypt.compare(password, user.password);
    if (!res) {
      throw new Error("Incorrect password or email, try again");
    }
    const token = getSignedToken(user._id);
    return token;
  } catch (error) {
    throw new Error("All field required");
  }
};
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("something went wrong");
  }
};

export default { getAllUsers, createNewUser, signInUser };
