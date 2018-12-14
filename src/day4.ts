import * as fs from 'fs'
import * as path from 'path'

const data = fs.readFileSync(path.join(__dirname, './inputs/4'), 'utf-8').split('\n')

data.sort((a: string, b: string) => {
    return +new Date(extractTimeString(a)) - +new Date(extractTimeString(b))})


let activeGuard = ""
let sleepMap = new Object()
let listOfGuards = []
let sleepStart = 0

for(let line of data){
    if(line.split(' ')[3] == 'Guard'){
        activeGuard = line.split(' ')[4]
        listOfGuards.push(Number(activeGuard.slice(1,0)))
    }

    if(line.split(' ')[3] == 'falls'){
        activeGuard = line.split(' ')[4]
        listOfGuards.push(Number(activeGuard.slice(1,0)))
    }

}

function extractTimeString(line: string){
    return `${line.split(' ')[0]} ${line.split(' ')[1]}`.slice(1,-1)
}