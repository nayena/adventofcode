import * as fs from 'fs'
import * as path from 'path'

const data = fs.readFileSync(path.join(__dirname, './inputs/3'), 'utf-8').split('\n')

const map = new Object
let overlapCounter = 0

for(let line of data){
    const order = line.split(' ')
    const orderID = order[0]
    const size = order[2].slice(0,-1).split(',')
    const x = Number(size[0])
    const y = Number(size[1])

    const dimensions = order[3].split('x')
    const width = Number(dimensions[0])
    const height = Number(dimensions[1])

    addSquareToMap(orderID, x, y, width, height)
}

console.log(`${overlapCounter} overlapping fields`)

for(let line of data){
    const order = line.split(' ')
    const orderID = order[0]
    const size = order[2].slice(0,-1).split(',')
    const x = Number(size[0])
    const y = Number(size[1])

    const dimensions = order[3].split('x')
    const width = Number(dimensions[0])
    const height = Number(dimensions[1])

    if(isNonOverlapping(x, y, width, height)){
        console.log('Found the unique one!')
        console.log(orderID)
    }
}

function addSquareToMap(claimID: string, x: number, y: number, width: number, height: number){
    for(let i=0;i<width;i++){
        for(let j=0;j<height;j++){
            let pos = `${x+i},${y+j}`
            let val = map[pos]
            if(val){
                map[pos]++
                if(map[pos] == 2){
                    overlapCounter++
                }
            } else {
                map[pos] = 1
            }
        }
    }
}

function isNonOverlapping( x: number, y: number, width: number, height: number){
    for(let i=0;i<width;i++){
        for(let j=0;j<height;j++){
            let pos = `${x+i},${y+j}`
            if(map[pos] > 1){
                return false
            }
        }
    }
    return true
}
