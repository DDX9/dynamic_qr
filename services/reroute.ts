import type { Request, Response } from "express"
import type { RedisClientType } from "redis"

import {redisInstance} from "./redis.ts"

const redirectService = {
    redirectQR: async (req:Request,res:Response)=>{
        let des :string |undefined
        try {
            const code = redirectService.redirectCodesParamValidation(req,res)
            des = await redirectService.readDestinationFromKey(code,redisInstance)
        } catch(e){
            console.error(e)
            res.status(404).send('Invalid QR Code')
        }

        if(des !== undefined)
            res.redirect(des)
        else
            res.status(404).send('Invalid QR Code')
    },
    redirectQRTest: (req:Request,res:Response)=>{
        res.redirect("https://www.google.com")
    },
    readDestinationFromKey:async(key:string|undefined, redisInstance:RedisClientType):Promise<string | undefined>=>{
        const field = "dest"
        let dest:string | null | undefined=null
        if(key !== undefined) {
          dest =  await redisInstance.hGet(key,field) 
        }

        if(dest === null)
            dest = process.env.NOT_FOUND_DESTINATION

        return dest
    },
    redirectCodesParamValidation:(req:Request,res:Response):string=>{
        const {codes} = req.params

        if(codes === null || codes === undefined)
            throw new Error("Invalid url")
        else
            return codes
    }
}

export default redirectService