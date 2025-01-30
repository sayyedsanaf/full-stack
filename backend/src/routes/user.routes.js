import { Router } from "express";
import {
  changePassword,
  getUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

userRouter.route("/login").post(loginUser);

// secured routes
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);
userRouter.route("/user").get(verifyJWT, getUser);
userRouter.route("/change-password").patch(verifyJWT, changePassword);
userRouter.route("/update-account").patch(verifyJWT, updateAccountDetails);
userRouter.route("/avatar").patch(verifyJWT,upload.single("avatar"), updateUserAvatar);
userRouter.route("/cover-image").patch(verifyJWT,upload.single("coverImage"), updateUserCoverImage);

export default userRouter;
