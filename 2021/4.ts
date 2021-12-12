import { getInput } from './lib'

const input = getInput(4)

const numbers = input[0].split(',').map(n => Number(n))

const boards = input.slice(2).join('\n').split('\n\n')
  .map(boardString => boardString.split('\n')
    .map(rowString => rowString.trim().split(/\s+/)
      .map(n => Number(n))))

const expandedBoards = boards.map((board) => [
  ...board,
  ...board[0].map((_, i) => board.map(row => row[i]))
])

const getRowWinTurn = (row: number[]) => row.reduce((latestTurn, n) => {
  const turn = numbers.indexOf(n)
  if (turn === -1 || latestTurn === -1) return -1
  return turn > latestTurn ? turn : latestTurn
}, 0) // -1 means row doesn't win

interface IBoardStats {
  nums: number[],
  winTurn: number,
}

const boardsWithStats: IBoardStats[] = expandedBoards.map(board => ({
  nums: board.slice(0, 5).flat(),
  winTurn: board.reduce((earliestWinTurn, row) => {
    const winTurn = getRowWinTurn(row)
    if (winTurn === -1) return earliestWinTurn
    return winTurn < earliestWinTurn ? winTurn : earliestWinTurn
  }, Infinity)
})).sort(({ winTurn: a }, { winTurn: b }) => a - b)

const getMagicNumber = (boardWithWinTurns: IBoardStats): number => {
  const calledNumbers = numbers.slice(0, boardWithWinTurns.winTurn + 1)
  const unmarkedNums = boardWithWinTurns.nums.filter(n => !calledNumbers.includes(n))
  return unmarkedNums.reduce((a, b) => a + b) * calledNumbers.at(-1)!
}

const part1 = getMagicNumber(boardsWithStats[0])
const part2 = getMagicNumber(boardsWithStats.at(-1)!)
console.log(part1, part2)
