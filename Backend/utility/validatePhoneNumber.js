import { CountryCode } from "../constants/CountryCode.js";
import { CountryPhoneLength } from "../constants/CountryPhoneLength.js";

export const validatePhoneNumber = (country, phoneNumber) => {
  console.log("verify data: ", country, phoneNumber);
  const countryCode = CountryCode[country]; //+91
  const expectedLength = CountryPhoneLength[country]; //INDIA: 10

  console.log("check this: ", countryCode, expectedLength);
  if (!countryCode || !expectedLength) {
    throw new Error("Invalid country provided.");
  }

  const normalizedNumber = phoneNumber.replace(countryCode, ""); // Remove country code
  if (normalizedNumber.length !== expectedLength) {
    return {
      valid: false,
      message: `Phone number must be ${expectedLength} digits for ${country}.`,
    };
  }

  return { valid: true };
};
