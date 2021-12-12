import { getInput } from './lib'

const bracketLines = getInput(10).map(str => str.split(''))

const errorCost = { ')': 3, ']': 57, '}': 1197, '>': 25137, }
const autocompleteCost = { ')': 1, ']': 2, '}': 3, '>': 4, }
const closers = { '(': ')', '[': ']', '{': '}', '<': '>', }

const scanBrackets = (brackets: string[]): string | string[] => {
  const stack: string[] = []

  for (let bracket of brackets) {
    if (closers[bracket]) {
      stack.push(bracket)
    } else {
      if (closers[stack.at(-1)] === bracket) {
        stack.pop()
      } else {
        return bracket
      }
    }
  };

  return stack.reverse().map(bracket => closers[bracket])
}
const validationResults = bracketLines.map(scanBrackets)
const invalidCharacters = validationResults.filter(result => typeof result === 'string') as string[]
const autocompletes = validationResults.filter(result => typeof result === 'object') as string[][]

const part1 = invalidCharacters.reduce((a, b) => a + errorCost[b], 0)
const part2 = autocompletes
  .map((autocomplete) => autocomplete.reduce((acc, bracket) => acc * 5 + autocompleteCost[bracket], 0))
  .sort((a, b) => a - b)[Math.floor(autocompletes.length / 2)]
