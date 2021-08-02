export function distance(value: string, type: string) {
  if (value.includes('km')) {
    return Math.ceil(parseFloat(value))
  } else if (value.includes('m')) {
    return Math.ceil(parseFloat(value) / 1000)
  }
}
