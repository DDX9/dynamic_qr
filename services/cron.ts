import { fileService } from "./file"
import { redisInstance } from "./redis"
import redirectService from "./reroute"

const cronService = {
    backupRedisAsCsv:async()=>{
        const d = await redirectService.getQrAndDestination(redisInstance)
        const csvArr:string[][]=[]
        Object.keys(d).forEach((f)=>{
            csvArr.push([f,d[f]])
        })

        console.log(csvArr)
        
        // read the most recent backup and compare the diff
        const latestD = await fileService.readLatestBackupCsv('backup/')
        console.log(latestD)
        if(latestD!==undefined){
            // compare and decide whether is the same else backup
            // const proceedBackup = csvArr.sort(())
        }
    }
}
