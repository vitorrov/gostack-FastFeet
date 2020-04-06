module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'done', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('orders', 'done');
  },
};
