import * as fs from 'fs'
import * as path from 'path'

const data = fs.readFileSync(path.join(__dirname, './inputs/1'), 'utf-8').split('\n')

let frequency = 0
var seen = new Object()
var found = false

while (!found) {
    for (const delta of data) {
        frequency += Number(delta);
        if (seen[frequency]) {
            console.log(frequency);
            found = true
            break
        }
        seen[frequency] = true;
    }
    console.log("looped")
}