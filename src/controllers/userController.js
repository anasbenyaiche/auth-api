import userService from "../services/userService";
const getAllUsers = async (req, res) => {
  const userList = await userService.getAllUsers();
  return res.send(userList);
};
const signUp = async (req, res, next) => {
  try {
    const newUser = req.body;
    const savedUser = await userService.createNewUser(newUser);

    res.status(200).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    console.log(error);
  }
};
const signIn = async (req, res, next) => {
  try {
    const payload = req.body;
    const token = await userService.signInUser(payload);
    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

export default { signIn, signUp, getAllUsers };
