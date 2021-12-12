import { getInput } from './lib'

const input = getInput(1).map((n) => +n)

const getAvg = (n3: number[]) => n3.reduce((prevN, curN) => prevN + curN) / n3.length

let prev3 = input.slice(0, 3)

const count = input.slice(3).reduce((count, depth) => {
  const cur3 = [...prev3.slice(1), depth]
  const newCount = getAvg(cur3) > getAvg(prev3) ? count + 1 : count
  prev3 = cur3
  return newCount
}, 0)

console.log(count)
