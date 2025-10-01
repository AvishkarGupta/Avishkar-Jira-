import {Router} from "express"
import { verifyjwt } from "../middlewares/auth.middelware.js"
import { searchData } from "../controllers/search.controller.js";

const router = Router()

router.route("/q=:query").get(verifyjwt, searchData)

export default router;