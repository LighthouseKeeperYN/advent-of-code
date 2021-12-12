import { getInput } from './lib'

const input = getInput(1).map(n => +n)

let count = 0

input.reduce((prevDepth, depth) => {
  if (depth > prevDepth) {
    count++
  }

  return depth
})

console.log(count)
