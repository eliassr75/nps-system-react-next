import bcrypt from 'bcryptjs';

const PasswordManager = {
  hash: async function (password) {
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error('Erro ao hashear a senha');
    }
  },

  compare: async function (password, hashedPassword) {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (error) {
      throw new Error('Erro ao comparar a senha');
    }
  }
};

export default PasswordManager;
