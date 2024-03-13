import { Router } from "express";
import { getdata } from "../controllers/sensor.controllers.js";
const router = Router();

router.route("")
.get(()=>"hello world")
.post(getdata)


export default router;