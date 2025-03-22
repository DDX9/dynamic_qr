import type { Request, Response } from "express"


const redirectController = {
    redirectQR: (req:Request,res:Response)=>{
        res.redirect("https://www.google.com")
    },
    redirectQRTest: (req:Request,res:Response)=>{
        res.redirect("https://www.google.com")
    },

}

export default redirectController