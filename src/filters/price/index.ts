export function price(value: string, type: string) {
  // console.log(value, type)
  return (Number(value) / 100).toFixed(2)
}
