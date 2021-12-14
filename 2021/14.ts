import { read } from './lib'

const template = read(14).split('\n\n')[0].split('')
const rules: string[][] = read(14).split('\n\n')[1].split('\n').reduce((rules, rule) => {
  const [pair, product] = rule.split(' -> ')
  return [...rules, [pair, product]]
}, [])

let pairCounts: Record<string, number> = rules.reduce((dictionary, [pair]) => ({ ...dictionary, [pair]: 0 }), {})
const polymerCounts: Record<string, number> = template.reduce((counts, polymer) => {
  counts[polymer] === undefined ? counts[polymer] = 0 : counts[polymer] += 1
  return counts
}, {})

template.forEach((_, i) => {
  if (!i) return
  if (pairCounts[`${template[i - 1]}${template[i]}`] === undefined) return

  pairCounts[`${template[i - 1]}${template[i]}`]++
});

const upgradeChain = (pairCounts: Record<string, number>) => {
  const newPairCounts = { ...pairCounts }

  rules.forEach(([rule, product]) => {
    if (pairCounts[rule] > 0) {
      const count = pairCounts[rule]
      polymerCounts[product] = polymerCounts[product] ? polymerCounts[product] + count : count
      newPairCounts[rule] -= count
      newPairCounts[`${rule[0]}${product}`] += count
      newPairCounts[`${product}${rule[1]}`] += count
    }
  })

  return newPairCounts
}

for (let i = 0; i < 40; i++) {
  pairCounts = upgradeChain(pairCounts)
}

const counts = Object.values(polymerCounts).sort((a, b) => a - b)

console.log(Math.max(...counts) - Math.min(...counts))