import { getInput } from './lib'

interface IOctopus {
  readonly y: number,
  readonly x: number,
  energy: number,
  flashed: boolean
}

const grid: IOctopus[][] = getInput(11)
  .map((row, y) => row.split('')
    .map((n, x) => ({ y, x, energy: +n, flashed: false })))



const transferEnergy = (y: number, x: number) => {
  if (y < 0 || x < 0 || y >= grid.length || x >= grid[y].length) return

  if (grid[y][x].energy === 9) {
    triggerFlash(grid[y][x])
  } else if (!grid[y][x].flashed) {
    grid[y][x].energy += 1
  }
}

const triggerFlash = ({ y, x, flashed }: IOctopus) => {
  if (flashed) return

  flashes += 1
  grid[y][x].energy = 0
  grid[y][x].flashed = true
  transferEnergy(y - 1, x)
  transferEnergy(y + 1, x)
  transferEnergy(y, x - 1)
  transferEnergy(y, x + 1)
  transferEnergy(y - 1, x - 1)
  transferEnergy(y + 1, x + 1)
  transferEnergy(y - 1, x + 1)
  transferEnergy(y + 1, x - 1)
}

const isSynced = () => grid.every(row => row.every(({ energy }) => energy === grid[0][0].energy))

let flashes = 0;
let turn = 0
for (; !isSynced(); turn++) {
  if (turn === 100) console.log(flashes)

  grid.forEach((row, y) => row.forEach((_, x) => transferEnergy(y, x)))
  grid.forEach((row) => row.forEach((octopus) => octopus.flashed = false))
}

console.log(turn)