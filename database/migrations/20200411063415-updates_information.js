'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('informations', 'image', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.addColumn('informations', 'location', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.addColumn('informations', 'user_id', {
          type: Sequelize.UUID
        }, { transaction: t }),
        queryInterface.addColumn('informations', 'min_age', {
          type: Sequelize.DOUBLE,
          defaultValue: "0.0"
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('informations', 'image', { transaction: t }),
        queryInterface.removeColumn('informations', 'location', { transaction: t }),
        queryInterface.removeColumn('informations', 'user_id', { transaction: t }),
        queryInterface.removeColumn('informations', 'min_age', { transaction: t }),
      ]);
    });
  }
};

