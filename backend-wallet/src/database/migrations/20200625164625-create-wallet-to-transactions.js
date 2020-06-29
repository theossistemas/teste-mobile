module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('transactions', 'wallet_id', {
      type: Sequelize.INTEGER,
      references: { model: 'wallets', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('transactions', 'wallet_id');
  },
};
