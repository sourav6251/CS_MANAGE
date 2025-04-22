import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
// import { userSchemas } from "../validations/user.valiation.js"
// import userController, { createUser, logInUser, sendOtpForVerifyAccount, VerifyOtpWithExpiry } from "../controller/user.controller.js"
import userValidation from "../validations/user.validation.js";
import userController from "../controller/user.controller.js";

const router = express.Router();

router
    .post("/create", validate(userValidation.create), userController.createUser)
    .get("/", userController.showAllUser);
    // .post("/create", validate(userSchemas.createUser),  createUser)
    // .post("/login", validate(userSchemas.login),  logInUser)
    // .post("/send-otp", validate(userSchemas.sendOtp),  sendOtpForVerifyAccount)
    // .post("/verify-otp", validate(userSchemas.verifyOtp),  VerifyOtpWithExpiry)
    // .patch("/change-profile-pic", validate(userSchemas.changeProfilePic),  changeProfilePic)
    // .patch("/update-role/:userId", validate(userSchemas.updateUserRole),  updateUserRoleByAdmin)
    // .patch("/two-step-auth", validate(userSchemas.addTwoStepVerification),  addTwoStepVerification)
    // .patch("/update/:id", validate(userSchemas.updateUser),  updateUser)
    // .post("/forgot-password", validate(userSchemas.forgotPassword),  forgotPassword)
    // .post("/reset-password", validate(userSchemas.changePasswordWithOtp),  changePassWithOtp)
    // .post(
    //     "/change-password",
    //     validate(userSchemas.changePasswordWithOldPassword),
    //      ChangePasswordWithOldPassword,
    // )

export const userRouter = router

