import express, { type Request, type Response } from "express";
import redirectService from "./services/reroute";
import { limiter, redisInstance } from "./services/redis";
import 'dotenv/config'
import { fileService } from "./services/file";



const app = express();
const port = 8080;
// load qr to redis
// app.use(limiter)
Promise.all([fileService.loadAllCsvToRedis(redisInstance)]).then(()=>{

  console.log('csv parsing completed!')
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  })
}).catch(console.error)

app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!");
});


/*
    redirect


*/
app.get("/:codes", redirectService.redirectQR)
app.get("/test",redirectService.redirectQRTest)
/*

    admin router
*/
app.route('/regads')

app.get("/*",(req:Request, res:Response) => {
    res.status(404).send()
})