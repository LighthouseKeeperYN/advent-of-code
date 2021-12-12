import { read } from './lib'

const crabs = read(7).split(',').map(n => +n).sort((a, b) => a - b)
const max = crabs.at(-1)

const fuel1 = Array(max).fill(0)

fuel1.forEach((_, i) => {
  crabs.forEach(distance => fuel1[i] += Math.abs(i - distance));
});

const part1 = Math.min(...fuel1)

const fuel2 = Array(max).fill(0)

fuel2.forEach((_, i) => {
  crabs.forEach(distance => {
    const d = Math.abs(i - distance)
    const sum = d * (d + 1) /2
    fuel2[i] += sum
  });
});

const part2 = Math.min(...fuel2)

console.log(part1, part2)