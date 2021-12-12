import { getInput } from './lib'

const input = getInput(3).map(binary => binary.split(''))

const transformInput = (sample: string[][]) => sample[0].map((_, i) => sample.map(binary => binary[i]))

const getOccurrence = (binary: string[]) => binary.reduce((counter, bit) => {
  counter[Number(bit)]++
  return counter
}, [0, 0])

const gammaBin = transformInput(input).map(getOccurrence).map(([zero, one]) => zero > one ? 0 : 1)

const epsilonBin = gammaBin.map(bit => Number(!bit))

const part1 = (parseInt(epsilonBin.join(''), 2) * parseInt(gammaBin.join(''), 2))
console.log(part1)


const filterSample = (sample: string[][], index: number, bit: string) => sample.filter((binary) => binary[index] === bit)

const getAirRatio = (type: 'oxygen' | 'co2', sample: string[][], iteration = 0): string[][] | string => {
  if (sample.length === 1) {
    return sample[0].join('')
  }

  const occurrence = getOccurrence(transformInput(sample)[iteration])
  const filterByOxygen = occurrence[1] >= occurrence[0] ? '1' : '0'
  const filterByCo2 = occurrence[0] <= occurrence[1] ? '0' : '1'

  const newSample = filterSample(sample, iteration, type === 'oxygen' ? filterByOxygen : filterByCo2)
  return getAirRatio(type, newSample, iteration + 1)
}

const oxygenRatio = getAirRatio('oxygen', input) as string
const co2Ration = getAirRatio('co2', input) as string

const part2 = (parseInt(oxygenRatio, 2) * parseInt(co2Ration, 2))
console.log(part2)