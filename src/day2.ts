import * as fs from 'fs'
import * as path from 'path'

const data = fs.readFileSync(path.join(__dirname, './inputs/2'), 'utf-8').split('\n')

let twice = 0
let thrice = 0

for(const boxID of data){
    analyseID(boxID)
}

console.log(`twice: ${twice}, thrice: ${thrice} == ${twice * thrice}`)

function analyseID(id: string){
    const sortedStringArray = sortString(id)

    let found2 = false // O(1)
    let found3 = false // O(1)

    for(let position = 0; position < sortedStringArray.length; position++){
        if(sortedStringArray[position] == sortedStringArray[position + 1]){
            if(sortedStringArray[position] == sortedStringArray[position + 2]){
                found3 = true
                position += 2
            } else {
                found2 = true
            }
        }
    }

    if(found2) {twice++}
    if(found3) {thrice++}
}

function sortString(str: string){
    var arr = str.split('');
    var sorted = arr.sort();
    return sorted;
}


// PART 2
for(let i = 0; i < data.length - 1 ; i++){
    for(let j = i+1; j < data.length ; j++){
        findSingleDiff(data[i], data[j])
    }
}

function findSingleDiff(a: string, b: string) {
    let foundOne = false
    let commonString = ""
    for(var i = 0; i < a.length ; i++){
        if(a[i] == b[i]){
            commonString += a[i]
        } else {
            if(foundOne){
                return
            } else {
                foundOne = true
            }
        }
    }
    console.log(commonString)
}