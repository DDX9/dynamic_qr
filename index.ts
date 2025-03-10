import express, { Request, Response } from "express";
import redirectController from "./dynamic_qr/reroute";

const app = express();
const port = 8080;

app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

/*
    redirect


*/
app.get("/:codes", redirectController.redirectQR)

/*

    admin router
*/
app.route('/regads')

app.get("/*",(req:Request, res:Response) => {
    res.status(404).send()
})