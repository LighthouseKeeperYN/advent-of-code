import { read } from './lib'

const [dots, instructions] = read(13).split('\n\n').map((input, i) => i === 0
  ? input.split('\n').map(dots => dots.split(',').map(Number))
  : input.split('\n').map(instruction => {
    const parsedInstruction = instruction.replace('fold along ', '').split('=')
    return [parsedInstruction[0], Number(parsedInstruction[1])]
  })) as [number[][], [string, number][]]

const [sizeX, sizeY] = dots.reduce((size: number[], [x, y]) => [Math.max(size[0], x + 1), Math.max(size[1], y + 1)], [0, 0])

const makeEmptyRow = (x = sizeX) => new Array(x).fill('.')
const makeEmptyCol = (y = sizeY + 1, x = sizeX) => new Array(y).fill(0).map(_ => makeEmptyRow(x))

const paper = dots.reduce((paper: string[][], [x, y]) => { paper[y][x] = '#'; return paper }, makeEmptyCol())

const fold = (paper: string[][], position: number, vertical: boolean = false) => {
  const [a, b] = vertical
    ? [paper.map(row => row.slice(0, position)), paper.map(row => row.slice(position + 1).reverse())]
    : [paper.slice(0, position), paper.slice(position + 1).reverse()]

  return a.map((row, y) => row.map((point, x) => point === '.' ? b[y][x] : point))
}

const foldedPaper = instructions.reduce((paper, [direction, position]) => fold(paper, position, direction === 'x'), paper)

console.log('part1', foldedPaper.flat().flat().filter(point => point === '#').length)

console.log(foldedPaper.map(row => row.join(' ')).join('\n'))
