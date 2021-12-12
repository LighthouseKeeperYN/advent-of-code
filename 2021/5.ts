// 1.1....11. //
// .111...2.. //
// ..2.1.111. //
// ...1.2.2.. //
// .112313211 //
// ...1.2.... //
// ..1...1... //
// .1.....1.. //
// 1.......1. //
// 222111.... //

// const testGrid = new Array(10).fill('').map(_ => new Array(10).fill('.'))
// console.log(testGrid.map(row => row.join('')))
import { getInput } from './lib'

const part1Input = getInput(5).map(str => str.split(' -> ').map(str => str.split(',').map(n => Number(n))))
  .filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2)

const part1 = part1Input.reduce((grid, [[x1, y1], [x2, y2]]) => {
  const direction = x1 === x2 ? 'ver' : 'hor'
  const length = -[x1 - x2, y1 - y2].filter(Boolean)[0]
  const mod = length < 0 ? -1 : 1

  for (let i = 0; i !== length + 1 * mod; i += 1 * mod) {
    if (direction === 'hor') {
      if (!grid[y1]) grid[y1] = []
      if (!grid[y1][x1 + i]) grid[y1][x1 + i] = 0
      grid[y1][x1 + i] += 1
    } else {
      if (!grid[y1 + i]) grid[y1 + i] = []
      if (!grid[y1 + i][x1]) grid[y1 + i][x1] = 0
      grid[y1 + i][x1] += 1
    }
  }

  return grid
}, []).flat().reduce((points, overlap) => overlap > 1 ? points + 1 : points, 0)

// console.log(part1)

////////////////////////////////////////////

const part2Input = getInput(5).map(str => str.split(' -> ').map(str => str.split(',').map(n => Number(n))))

const part2 = part2Input.reduce((grid, [[x1, y1], [x2, y2]]) => {
  const directions = [['ver', x1 === x2], ['hor', y1 === y2], ['dia', true]]
  const direction = directions.find(([_, isDir]) => isDir)[0]


  if (direction === 'ver' || direction === 'hor') {
    const length = -[x1 - x2, y1 - y2].filter(Boolean)[0]
    const mod = length < 0 ? -1 : 1

    for (let i = 0; i !== length + 1 * mod; i += 1 * mod) {
      if (direction === 'hor') {
        if (!grid[y1]) grid[y1] = []
        if (!grid[y1][x1 + i]) grid[y1][x1 + i] = 0
        grid[y1][x1 + i] += 1
      } else if (direction === 'ver') {
        if (!grid[y1 + i]) grid[y1 + i] = []
        if (!grid[y1 + i][x1]) grid[y1 + i][x1] = 0
        grid[y1 + i][x1] += 1
      }
    }
  } else {
    const modX = x1 - x2 > 0 ? -1 : 1
    const modY = y1 - y2 > 0 ? -1 : 1
    // console.log(length)
    for (; x1 !== x2 + 1 * modX; x1 += 1 * modX, y1 += 1 * modY) {
      if (!grid[y1]) grid[y1] = []
      if (!grid[y1][x1]) grid[y1][x1] = 0
      grid[y1][x1] += 1
    }
  }

  return grid
}, []).flat().reduce((points, overlap) => overlap > 1 ? points + 1 : points, 0)

console.log(part2)