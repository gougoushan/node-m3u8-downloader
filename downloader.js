const util = require('util')
const request = require('request')
const fs = require('fs')
const https = require('https')
const http = require('http')
const readline = require('readline')


// 下载ts文件
const rl = readline.createInterface({
  input: fs.createReadStream('zhanlang.m3u8')
})

let i = 0, count = 0
rl.on('line', (line) => {
  if (line.startsWith('http')) {
    let j = i++
    request(line).pipe(fs.createWriteStream('download/' + j + '.ts')).on('close', () => {
      console.log(count++)
    })
  }
}).on('close', () => {
  console.log('readline end')
})


// 合并ts文件
let ws = fs.createWriteStream('download/0000.ts')
for (let i = 0; i < 688; i++) {
  fs.appendFileSync('download/0000.ts', fs.readFileSync('download/' + i + '.ts'))
}