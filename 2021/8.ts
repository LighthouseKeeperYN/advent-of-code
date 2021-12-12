import { getInput } from './lib'

const combinations = getInput(8).map(combination =>
  combination.split(' | ').map(str => str.split(' ').map(str => str.split('').sort().join('')))
)

const uniqueRules = [
  /* 0 */ (pattern: string) => { },
  /* 1 */ (pattern: string) => pattern.length === 2,
  /* 2 */ (pattern: string) => { },
  /* 3 */ (pattern: string) => { },
  /* 4 */ (pattern: string) => pattern.length === 4,
  /* 5 */ (pattern: string) => { },
  /* 6 */ (pattern: string) => { },
  /* 7 */ (pattern: string) => pattern.length === 3,
  /* 8 */ (pattern: string) => pattern.length === 7,
  /* 9 */ (pattern: string) => { },
]

const values = combinations.map(([signatures, digits]) => {

  const decodedSections = {
    top: '',        //  8
    topLeft: '',    //  6
    topRight: '',   //  8
    middle: '',     //  7
    bottomLeft: '', //  4
    bottomRight: '',//  9
    bottom: ''      //  7
  }

  const decodedSignatures = {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
  }

  const filterUnique = (str1: string, str2: string): string =>
    str1.split('').filter(section => !str2.includes(section)).join('')

  const sectionOccurrences = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].reduce((obj: any, section) => {
    const occurrence = signatures.reduce((occurrence, pattern) => pattern.includes(section) ? occurrence + 1 : occurrence, 0)
    obj[occurrence] = section
    return obj
  }, {})

  decodedSections.topLeft = sectionOccurrences[6]
  decodedSections.bottomLeft = sectionOccurrences[4]
  decodedSections.bottomRight = sectionOccurrences[9]

  // uniqueScan
  signatures.forEach(pattern => {
    const signatureIndex = uniqueRules.findIndex(check => check(pattern))

    if (signatureIndex !== -1) {
      decodedSignatures[signatureIndex] = pattern.split('').sort().join('')
    }
  })

  decodedSections.top = filterUnique(decodedSignatures[7], decodedSignatures[1])

  decodedSignatures[9] = signatures.find(signature => {
    const uniqueSections = filterUnique(decodedSignatures[8], signature)
    return uniqueSections.length === 1
      && uniqueSections.includes(decodedSections.bottomLeft)
  })

  decodedSignatures[3] = signatures.find(signature => {
    const uniqueSections = filterUnique(decodedSignatures[8], signature)
    return uniqueSections.length === 2
      && uniqueSections.includes(decodedSections.topLeft)
      && uniqueSections.includes(decodedSections.bottomLeft)
  })

  decodedSignatures[2] = signatures.find(signature => {
    const uniqueSections = filterUnique(decodedSignatures[8], signature)
    return uniqueSections.length === 2
      && uniqueSections.includes(decodedSections.topLeft)
      && uniqueSections.includes(decodedSections.bottomRight)
  })

  const leftovers = signatures.filter(signature => !Object.values(decodedSignatures).includes(signature))
    .sort((str1, str2) => str1.length - str2.length)

  decodedSignatures[5] = leftovers.shift()

  if (decodedSignatures[7].includes(filterUnique(decodedSignatures[8], leftovers[0]))) {
    decodedSignatures[6] = leftovers.shift()
    decodedSignatures[0] = leftovers[0]
  } else {
    decodedSignatures[0] = leftovers.shift()
    decodedSignatures[6] = leftovers[0]
  }

  const decodedDigits = digits.map(digit => Object.values(decodedSignatures).indexOf(digit.split('').sort().join('')))

  return Number(decodedDigits.join(''))
});

console.log(values.reduce((a, b) => a + b))
