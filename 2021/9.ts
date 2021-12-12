import { getInput } from './lib'

const map = getInput(9).map(row => row.split('').map(n => +n))

const isLow = (y: number, x: number) => [
  y > 0 ? map[y - 1][x] : Infinity,
  y < map.length - 1 ? map[y + 1][x] : Infinity,
  x > 0 ? map[y][x - 1] : Infinity,
  x < map[y].length - 1 ? map[y][x + 1] : Infinity
].every(neighbor => neighbor > map[y][x])

let lows: number[] = []
let lowCoordinates: [number, number][] = []

map.forEach((row, y) => row.forEach((height, x) => {
  if (isLow(y, x)) {
    lows.push(height)
    lowCoordinates.push([y, x])
  }
}))

const fill = (map, y, x, peak, basin) => {
  if (y < 0 || x < 0) return
  if (y > map.length - 1) return
  if (x > map[y].length - 1) return
  if (map[y][x] === 9) return

  basin.push(map[y][x])
  map[y][x] = peak;

  fill(map, y - 1, x, peak, basin);
  fill(map, y + 1, x, peak, basin);
  fill(map, y, x - 1, peak, basin);
  fill(map, y, x + 1, peak, basin);
}

const floodFill = (map, y, x, peak = 9, basin = []) => {
  const current = map[y][x];

  if (current === peak) return map;

  fill(map, y, x, peak, basin);

  return basin;
};

let basins = []

lowCoordinates.forEach(([y, x]) => basins.push(floodFill(map, y, x)))

const part2 = basins.sort((a, b) => b.length - a.length).slice(0, 3).reduce((sum, basin) => sum * basin.length, 1)

console.log(part2)
