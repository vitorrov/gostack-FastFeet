module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'activated', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.dropColumn('activated');
  },
};
