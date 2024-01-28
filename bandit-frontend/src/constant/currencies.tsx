import BigNumber from "bignumber.js";

const WRX = {
  name: 'COMMON',
  symbol: 'WRX',
  code: 1,
  decimal: 8,
  decimalFix: (number) => new BigNumber(number).times(10 ** 8).toFixed(),
  convert: (number) => new BigNumber(number).dividedBy(10 ** 8).toFixed(),
}
const BNB = {
  name: 'Binance',
  symbol: 'BNB',
  code: 2,
  decimal: 18,
  decimalFix: (number) => new BigNumber(number).times(10 ** 18).toFixed(),
  convert: (number) => new BigNumber(number).dividedBy(10 ** 18).toFixed(),
}

const WBNB = {
  name: 'Wrapped BNB',
  symbol: 'WBNB',
  code: 3,
  decimal: 18,
  decimalFix: (number) => new BigNumber(number).times(10 ** 18).toFixed(),
  convert: (number) => new BigNumber(number).dividedBy(10 ** 18).toFixed(),
}

export { WRX, BNB, WBNB }
