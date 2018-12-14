import * as fs from 'fs'
import * as path from 'path'

const polymer = fs.readFileSync(path.join(__dirname, './inputs/5'), 'utf-8')

let reducedPolymer = fullyReduce(polymer)
console.log(`Part 1: Final length: ${reducedPolymer.length}`)

let shortestPolymerLength = 99999999999999

for(let i = 0; i < 26; i++){
    let letterPair = `${String.fromCharCode(97+i)}${findOpposite(String.fromCharCode(97+i))}`

    let partialPolymer = removeLetters(polymer, letterPair)
    let reducedWithRemovedPair = fullyReduce(partialPolymer)
    if(reducedWithRemovedPair.length < shortestPolymerLength){
        shortestPolymerLength = reducedWithRemovedPair.length
        console.log(`Found a shorter with letters ${letterPair}, that is ${shortestPolymerLength}`)
    }
}

console.log(`Part 2: Final length: ${shortestPolymerLength}`)

function fullyReduce(polymer: string){
    let final = polymer

    while(true){
        let reduced = reduce(final)
        if(final == reduced){
            return final
        }
    
        final = reduced
    }
}

function reduce(polymer: string){
    let res = []
    let units = polymer.split('')
    for(let i = 0; i <= units.length - 2; i++){
        if(units[i] !== findOpposite(units[i+1])){
            res.push(units[i])
        } else {
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

function removeLetters(polymer: string, letters: string){
    let final = []
    for(let unit of polymer){
        let found = false
        for(let letter of letters){
            if(unit == letter) { found = true }
        }
        if(!found) { final.push(unit) }
    }
    return final.join('')
}