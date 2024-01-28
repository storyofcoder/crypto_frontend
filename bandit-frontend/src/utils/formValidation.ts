import * as Yup from "yup";
import { MAX_PRICE } from "../constant/values";
import { BNB, WBNB } from "../constant/currencies";
import BigNumber from "bignumber.js";

const makePriceFormValidationScheme = (priceConfig) => {
  const { allowedDecimal, minPrice } = priceConfig
  return Yup.number()
    .test('maxDigitsAfterDecimal', `Price must have ${allowedDecimal} digits after decimal or less`, (number) => {
      return Number.isInteger(Number(new BigNumber(number).times(10 ** allowedDecimal).toFixed()))
    })
    .positive('Only positive number allowed')
    .min(minPrice, 'Value must more than 0')
    .max(MAX_PRICE, `Value must less than or equals to ${MAX_PRICE}`)
    .required('Price required')
}

const getListingFormValidationScheme = (config) => {
  const { price } = config

  return Yup.object().shape({
    price: makePriceFormValidationScheme(price),
    royalty: Yup.number()
      .test('maxDigitsAfterDecimal', 'Royalty must have 2 digits after decimal or less', (number) =>
        Number.isInteger(number * 10 ** 2),
      )
      .positive('Only positive number allowed')
      .min(0.01, 'Value must more than 0')
      .max(15, 'Value must less than or equal to 15')
      .required('Royalty required'),
  })
}

const getPriceFormValidationScheme = (config) => {
  const { price } = config

  return Yup.object().shape({
    price: makePriceFormValidationScheme(price),
  })
}

const getAllowedDecimal = (currency) => {
  if (currency === BNB.symbol || currency === WBNB.symbol) {
    return 4
  }

  return 2
}
const getMinPrice = (currency) => {
  if (currency === BNB.symbol || currency === WBNB.symbol) {
    return 0.0001
  }
  // if (currency === WRX.symbol) {
  //   return 2;
  // }

  return 0.01
}

export { getListingFormValidationScheme, getPriceFormValidationScheme, getAllowedDecimal, getMinPrice }
