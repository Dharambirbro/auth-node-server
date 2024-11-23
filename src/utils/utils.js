import bcrypt from 'bcryptjs';


export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

export async function hashData(data){
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
}


 /**
 * Compare a plain password with a hashed password.
 * @param {string} plainPassword - The plain password entered by the user.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} - Returns true if passwords match, false otherwise.
 */
export async function comparePasswords(plainPassword, hashedPassword) {
 
  try {
    // Compare the plain password with the hashed password
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new AppError('Error comparing passwords', 500)
  }
}
