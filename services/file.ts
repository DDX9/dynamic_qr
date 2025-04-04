import type { RedisClientType } from "redis"
import { parse } from "csv-parse";
import fs from "fs"
import path from "path"

export const filePath = 'data_store/data.csv'

export const fileService = {
    parseCsvFile:async(relativePath:string):Promise<string[][]>=>{
        // const fullPath = path.resolve(relativePath)
        // const fileStream = fs.createReadStream(fullPath);
        // const parser = parse()
        // const arr:(string | number | boolean | null)[][]=[]
        // parser.on('data', (record) => {
        //     arr.push(record);
        // });
        
        //   // Catch any error
        //   parser.on("error", function (err) {
        //     console.error(err.message);
        //     throw err
        //   });
        // fileStream.pipe(parser);
        // await finished(parser)
        // console.log('arr',arr)
        // return arr
        const file = Bun.file(path.resolve(relativePath));
        const text = await file.text();
        return new Promise((resolve, reject) => {
          parse(text, (err, records) => {
            if (err) reject(err);
            else resolve(records as string[][]);
          });
        });
    },
    readLatestBackupCsv:async(relativePath:string): Promise<string[][] |undefined>=>{
        const allFiles = fs.readdirSync(path.resolve(relativePath))
        const allCsv = allFiles.filter((filePath:string)=>{return filePath.indexOf('.csv') !== -1}).sort((a,b)=>{return parseInt(a)-parseInt(b)})
        console.log(allCsv)
        if(allCsv.length >0){
            return await fileService.parseCsvFile(allCsv[0])
        } else return undefined

    },
    loadAllCsvToRedis:async(redisInstance:RedisClientType)=>{
        fs.stat(filePath,(exists)=>{
            console.log('data store exist',exists === null)
        })
        const csvContent = await fileService.parseCsvFile(filePath)
        console.log('csv content',csvContent,filePath)
        for await (const eachRow of csvContent) {
            let hasQr = false
            let hasDestination = false

       await Promise.all( eachRow.map((col,index)=>{

        if(index === 0 && col !== null)
            hasQr= true
        if(index ===1 && col !== null )
            hasDestination = true

        if(hasQr && hasDestination  && typeof(eachRow[0]) === 'string' && typeof(eachRow[1]) === 'string' ){
          return redisInstance.hSet("dest",eachRow[0],eachRow[1])
        }
       }))

        }
        console.log('loaded csv')
    },

}