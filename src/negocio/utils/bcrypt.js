import bCrypt from "bcrypt";

export const createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

export const validatePassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
};

