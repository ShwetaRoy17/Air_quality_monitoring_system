import { Router } from "express";
import { postdata } from "../controllers/sensor.controllers.js";
import { registerUser } from "../controllers/user.controllers.js";
const router = Router();

router.route("")
.get((req,res)=>{ res.json(
    { 
        number: "humidity",
        temperature: 'John', 
        gas: '100'
      }
)})
router.route("/data").post(postdata)
router.route("/register").post(registerUser);

export default router;