import * as express from "express";

const app = express()
const adminRoute = app.route()

adminRoute.get('/')

export default adminRoute