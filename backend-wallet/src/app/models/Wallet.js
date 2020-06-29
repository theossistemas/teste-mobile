import Sequelize, { Model } from 'sequelize';

class Wallet extends Model {
  static init(sequelize) {
    super.init(
      {
        card_number: Sequelize.INTEGER,
        card_name: Sequelize.STRING,
        cvc: Sequelize.INTEGER,
        due_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Wallet;
