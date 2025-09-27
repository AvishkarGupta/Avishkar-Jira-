import {Router} from "express"
import { verifyjwt } from "../middlewares/auth.middelware.js";
import { deleteFilter, getMyFilters, saveFilter } from "../controllers/filter.controller.js";

const router = Router()

router.route("/save-filter").post(verifyjwt, saveFilter)
router.route("/get-filters").get(verifyjwt, getMyFilters)
router.route("/delete-filter").post(verifyjwt, deleteFilter)


export default router;