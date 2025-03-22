import express, { type Request, type Response } from "express";
import redirectController from "./services/reroute";
import { redisClient,limiter } from "./services/redisRateLimit";

const app = express();
const port = 8080;

app.use(limiter)

app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})

/*
    redirect


*/
app.get("/:codes", redirectController.redirectQR)
app.get("/test",redirectController.redirectQRTest)
/*

    admin router
*/
app.route('/regads')

app.get("/*",(req:Request, res:Response) => {
    res.status(404).send()
})