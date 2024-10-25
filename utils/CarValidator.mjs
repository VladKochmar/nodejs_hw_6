class CarValidator {
  static carSchema = {
    brand: {
      notEmpty: {
        errorMessage: 'Brand is required',
      },
      trim: true,
      escape: true,
    },
    year: {
      isNumeric: {
        errorMessage: 'Must be a numeric value',
      },
      isInt: {
        options: { min: 1990, max: 2024 },
        errorMessage: 'Must be a number between 2000 and 2024',
      },
      trim: true,
      escape: true,
      toInt: true,
    },
    number: {
      notEmpty: {
        errorMessage: 'License plate is required',
      },
      matches: {
        options: /^[А-ЯA-Z]{2} \d{4} [А-ЯA-Z]{2}$/,
        errorMessage: 'Must be in format [А-ЯA-Z]{2} \\d{4} [А-ЯA-Z]{2}',
      },
      trim: true,
      escape: true,
    },
  }
}

export default CarValidator
