import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        // provider: Sequelize.Boolean
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      // Ou estamos criando um novo usuário, ou atualizando o password, ou seja
      // esse hash só será gerado quando um novo password for criado
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }


  // Checagem de senha. Será utilizado no SessionController
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
