'use strict';

module.exports.displayChart = () => {
  const header = `Product${' '.repeat(11)}Orders${' '.repeat(5)}Customers${' '.repeat(2)}Revenue${' '.repeat(8)}\n`
  const divider = `${red('*'.repeat(55))}\n`
  process.stdout.write(header + divider)
  for( let prop in feedback) {
    process.stdout.write(`${feedback[prop]}\n`)
  }
  process.stdout.write(divider)
}
