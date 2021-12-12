import * as fs from 'fs';

export const read = (day: number): string => fs.readFileSync(`./${day}-input.txt`, 'utf-8')
export const getInput = (day: number): string[] => read(day).split('\n')