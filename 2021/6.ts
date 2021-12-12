const input: number[] = require('fs').readFileSync(`./6-input.txt`, 'utf-8').split(',').map((n: string) => +n)

const countFish = days => [...Array(days).keys()].reduce(
  fish => [...fish.slice(1, 7), fish[7] + fish[0], fish[8], fish[0]],
  [...Array(9).keys()].map(i => input.filter(days => days === i).length)
).reduce((a, b) => a + b)

console.log(countFish(256))

// for (let i = 0; i < 256; i++) {
//   const newborns = input.shift();
//   input[6] += newborns
//   input.push(newborns)
// }

// console.log(input.reduce((a, b) => a + b))
