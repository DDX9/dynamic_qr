import 'dotenv/config'
import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import redirectService from './reroute'
import { redisInstance } from './redis'



const adminService = {
    adminCred: {
        ur: "dyadmin",
        ps: "Dynamic!Qr$ervice"
    },
    isAdminCheck: (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization']
        if (token === undefined)
            return res.status(401).send('Unauthorised')

        const tk = token.replace('Bearer ', "")

        if (!process.env.JWT_KEY)
            return res.status(500).send('Invalid signing')
        try {
            jwt.verify(tk, process.env.JWT_KEY)
        } catch (e) {
            console.error(e)
            return res.status(401).send('Unauthorised')
        }
        next()
    },
    adminLogin: (req: Request, res: Response) => {
        const { body } = req
        if (!body.username || !body.password)
            return res.status(401).send("Incomplete request")

        let token: string | null = null
        if (body.username === adminService.adminCred.ur && body.password === adminService.adminCred.ps) {
            if (!process.env.JWT_KEY)
                return res.status(500).send('Invalid signing')

            token = jwt.sign({ uuid: Math.random().toString().substring(2, 10), timestamp: Date.now() }, process.env.JWT_KEY)
        }

        if (token === null)
            res.status(404).send("Missing token")
        else
            res.status(200).send({ token })
    },
    getAllQrAndDestination: async(req: Request, res: Response) => {
        const d = await redirectService.getQrAndDestination(redisInstance)
        return res.status(200).send(d)
    },
    adminUpdateQrDestination: async (req: Request, res: Response) => {
        const { body }: { key: string, destination: string } | any = req
        if (!body || !body.key || !body.destination)
            return res.status(401).send("Incomplete request")

        const validQr = await redirectService.readDestinationFromKey(body.key, redisInstance)
        if (validQr === undefined)
            return res.status(404).send('Qr code not found')

        let error: string | null = null
        try {
            await redirectService.updateRedirectDestination(body.key, body.destination, redisInstance)
        } catch (e) {
            if (e instanceof Error)
                error = e.message
            else
                error = 'Internal Server Error'
        }
        if (error === null)
            res.status(200).send('Ok')
        else
            res.status(404).send(error)
    }

}

export default adminService