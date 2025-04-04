import * as express from "express";
import adminService from "../services/adminService";

const app = express
const adminRoute = app.Router()

adminRoute.post('/adlogin',adminService.adminLogin)
adminRoute.get('/getAllKeys',adminService.isAdminCheck,adminService.getAllQrAndDestination)
adminRoute.post('/updateKey',adminService.isAdminCheck,adminService.adminUpdateQrDestination)
export default adminRoute