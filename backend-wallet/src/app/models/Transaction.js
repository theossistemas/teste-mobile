import Sequelize, { Model } from 'sequelize';

class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        description: Sequelize.STRING,
        value_transaction: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Wallet, { foreignKey: 'wallet_id', as: 'wallet' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Transaction;
