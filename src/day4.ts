import * as fs from 'fs'
import * as path from 'path'

const data = fs.readFileSync(path.join(__dirname, './inputs/4'), 'utf-8').split('\n')

data.sort((a: string, b: string) => {
    return +new Date(extractTimeString(a)) - +new Date(extractTimeString(b))})

let activeGuard = ""
let sleepMap = new Object()
let sleepGuardTimer = new Object()
let listOfGuards = []
let sleepStart = ""

for(let line of data){
    if(line.split(' ')[2] == 'Guard'){
        let guardId = line.split(' ')[3].slice(1)
        activeGuard = guardId
        listOfGuards.push(guardId)
    }

    if(line.split(' ')[2] == 'falls'){
        sleepStart = extractTimeString(line)
    }
    
    if(line.split(' ')[2] == 'wakes'){
        let start = Number(extractSeconds(sleepStart))
        let end = Number(extractSeconds(extractTimeString(line)))

        if(!sleepGuardTimer[activeGuard]){
            sleepGuardTimer[activeGuard] = end-start
        } else {
            sleepGuardTimer[activeGuard] += end-start
        }

        for(let i=start; i<=end; i++){
            if(!sleepMap[`${activeGuard}-${i}`]){
                sleepMap[`${activeGuard}-${i}`] = 1
            } else {
                sleepMap[`${activeGuard}-${i}`]++
            }
        }
    }
}

console.log('----')
console.log('----')
console.log('----')
console.log('----')

let mostSleptGuard = 0
let mostSleptGuardMinutes = 0

for(let guard of listOfGuards.filter(function(item, i, ar){ return ar.indexOf(item) === i; })){
    if(sleepGuardTimer[guard] > mostSleptGuardMinutes){
        mostSleptGuard = guard
        mostSleptGuardMinutes = sleepGuardTimer[guard]
        console.log(`Guard ${guard} slept ${sleepGuardTimer[guard]} minutes`)
    }
}

let mostSleptMinute = 0
let mostSleptMinutes = 0

for(let i=0;i<60;i++){
    let slept = sleepMap[`${mostSleptGuard}-${i}`]
    if(slept > mostSleptMinutes){
        mostSleptMinutes = slept
        mostSleptMinute = i
        console.log(`Slept more on minute ${i}, which was ${slept} times`)
    } 
}

console.log(`Final checksum is ${mostSleptGuard}x${mostSleptMinute} = ${mostSleptGuard*mostSleptMinute}`)

function extractTimeString(line: string){
    return `${line.split(' ')[0]} ${line.split(' ')[1]}`.slice(1,-1)
}

function extractSeconds(line: string){
    let timeArray = line.split(':')
    return timeArray[1]
}