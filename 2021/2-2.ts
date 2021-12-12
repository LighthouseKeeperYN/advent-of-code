import { getInput } from './lib'

type action = 'forward' | 'down' | 'up'

const input = getInput(2).map(com => [com.split(' ')[0], +com.split(' ')[1]] as [action, number])

const actions = {
  forward: 1,
  down: 1,
  up: -1,
}

const sub = {
  depth: 0,
  horizontal: 0,
  aim: 0,
}

const verticalCommands = ['down', 'up']

input.forEach(([action, value]) => {
  if (verticalCommands.includes(action)) {
    sub.aim += actions[action] * value
  } else {
    sub.horizontal += value
    sub.depth += sub.aim * value
  }
})

const result = sub.depth * sub.horizontal

console.log(result)