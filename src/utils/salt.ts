import bcrypt from "bcrypt";

export const generateSalt = (): Promise<string> => {
  return bcrypt.genSalt(15);
};
