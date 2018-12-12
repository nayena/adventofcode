import * as fs from 'fs'
import * as rd from 'readline'
import * as path from 'path'

var reader = rd.createInterface(fs.createReadStream("src/inputs/1"))
const data = fs.readFileSync(path.join(__dirname, './inputs/1'), 'utf-8').split('\n')

let frequency = 0
var seen = new Object()
var found = false

while (!found) {
    for (const delta of data) {
        seen[frequency] = true;
        frequency += Number(delta);
        if (seen[frequency] == true) {
            console.log(frequency);
            found = true
        }
    }
}