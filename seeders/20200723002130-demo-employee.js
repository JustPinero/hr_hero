'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Employees', [
      {
      title: "Batman",
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'iamthebat@waynetech.org',
      portrait: "https://static2.cbrimages.com/wordpress/wp-content/uploads/2020/07/batman-new-costume-header.jpg?q=50&fit=crop&w=960&h=500",
      skills:"rich,smart,crazy",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: "Superman",
      firstName: 'Clark',
      lastName: 'Kent',
      email: 'ckent@dailybugle.com',
      portrait: "https://action.scholastic.com/content/dam/classroom-magazines/action/issues/2019-20/040120/superman-becomes-a-star-superheroes-take-over-the-world/07-ACT-040120-p26-PT-Superman-TN.jpg",
      skills:"fast,invulnerable,strong,flight,lasers",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: "Ironman",
      firstName: 'Tony',
      lastName: 'Stark',
      email: 'tstark@starkindustries.com',
      portrait: "https://cdn.dribbble.com/users/123846/screenshots/6426558/ironman-full.jpg",
      skills:"rich,smart,flight,lasers",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "The Mask",
      firstName: 'Stanley',
      lastName: 'Ipkuss',
      email: 'sipkuss@aol.com',
      portrait: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/the-mask-1562362749.jpg?crop=0.8915797317436661xw:1xh;center,top&resize=480:*",
      skills:"invulnerable,crazy,magical",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],{})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Employees', null, {});
  }
};