import * as express from "express";

const app = express
const adminRoute = app.Router()

adminRoute.get('/')

export default adminRoute