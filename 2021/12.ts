import { getInput } from './lib'

const input = getInput(12).map(connection => connection.split('-'))

const part2 = (input) => {
  let map: Map<string, string[]> = new Map()
  for (let [from, to] of input) {
    if (map.has(from)) {
      map.get(from).push(to)
    } else {
      map.set(from, [to])
    }

    if (map.has(to)) {
      map.get(to).push(from)
    } else {
      map.set(to, [from])
    }
  }

  let paths = 0
  const smallRevisited = (history: string[]) => {
    let smalls = history.filter(cave => cave === cave.toLowerCase())
    return smalls.some(small => history.filter(cave => cave === small).length >= 2)
  }

  const walk = (current: string, history: string[]) => {
    if (current === 'end') return paths++

    for (let cave of map.get(current)) {
      if (cave === 'start') continue

      if (
        cave === cave.toLowerCase()
        && history.includes(cave)
        && smallRevisited(history)
      ) continue

      walk(cave, history.concat(cave))
    }
  }

  walk('start', [])

  return paths
}

console.log(part2(input))