import {Router} from "express";
import {signup, mailVerified, login,logout, addStudentDetails, getStudent} from "../controllers/student.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import {authSTD} from "../middlewares/stdAuth.middleware.js"
import { authSchema } from "../middlewares/joiLogin.middleware.js";

const router = Router()

router.route("/signup").post(
    signup
)

router.route("/verify").get(
    mailVerified
)

router.route("/login").post(
    authSchema, login
)

router.route("/logout").get(authSTD, logout)

router.route("/Verification/:id").post(authSTD,
    upload.fields([
        {
            name:"Aadhaar",
            maxCount:1,
        },
        {
            name:"Secondary",
            maxCount:1,
        },
        {
            name:"Higher",
            maxCount:1
        }
    ]) ,
    addStudentDetails)
     
router.route("/StudentDocument/:id").get(authSTD, getStudent)

export default router;