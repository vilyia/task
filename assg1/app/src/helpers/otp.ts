import otpGenerator from 'otp-generator';

export const generateKey = () => {
    const num = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    return num;
};

