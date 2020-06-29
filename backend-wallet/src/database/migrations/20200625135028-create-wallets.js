module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('wallets', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      card_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      card_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cvc: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('wallets');
  },
};
