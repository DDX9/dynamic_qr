import { Request, Response } from "express"


const redirectController = {
    redirectQR: (req:Request,res:Response)=>{
        res.redirect("https://www.google.com")
    },

}

export default redirectController