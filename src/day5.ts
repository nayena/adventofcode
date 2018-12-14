import * as fs from 'fs'
import * as path from 'path'

const data = fs.readFileSync(path.join(__dirname, './inputs/5'), 'utf-8')

let final = data

while(true){
    let reduced = reduce(final)
    console.log(`Reduced to: ${reduced}`)
    if(final == reduced){
        break
    }

    final = reduced
}

console.log(`Part 1: Final length: ${final.length}`)


function reduce(polymer: string){
    let res = []
    let units = polymer.split('')
    for(let i = 0; i <= units.length - 2; i++){
        //console.log(units[i])
        //console.log(`${units[i]} == ${findOpposite(units[i+1])}`)

        if(units[i] !== findOpposite(units[i+1])){
            res.push(units[i])
            //console.log(`adding letter ${units[i]}`)
        } else {
            //console.log('skipping')
            i++
        }
    }

    if(units[units.length - 2] !== findOpposite(units[units.length -1])){
        res.push(units[units.length-1])
    }

    return res.join('')
}

function findOpposite(c: string){
    return c == c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()
}