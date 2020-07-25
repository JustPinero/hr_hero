#HR HERO

HR Hero is a personel management application made for super heroes, because everybody's gotta work right?

##__Backend Dependencies
1. Node
2. Mysql
3. sequelize
4. express.js
5. dotenv

nodemon and Postman were used for development.

##__Frontend Dependencies
1. React
2. axios
3. bootstrap
4. react
5. react-bootstrap
6. react-bootstrap-icons 
7. react-dom
8. react-router-dom
9. react-scripts
10. react-scroll

###To Begin the application:
1. Make sure Mysql is installed https://www.npmjs.com/package/mysql2

2. Create a .env file in the root directory and inside place the following environmental variable with your information: 
`DATABASE_URL=mysql://username@localhost:5432/database_name`

3. From the root directory enter: `npm i`

4. Activate the application by typing
`npm start`
5.  This will take a while but will seed the database, install any dependencies, then spin up the app. 
###How to use the application:

1.  Once populated the primary display can be filtered with use of the check boxes in the filter or you can search for individual heroes using the search bar.

2. Each tile will take you to an individual employees's profile page where you can update their information or remove them.

###Features Under Construction
- tighten the interface eg. more user friendly redirects after finishing various 
- various styling eg. nav bar headers, buttons, and page backgrounds.
- locked scrolling using react-scroll and scroll-magic
- icon animation using Pose

###Plans for the future
- draws multiple heroes from another api.
- tighten the interface eg. more user friendly redirects after finishing various 
- add music and videos to each employees profile.
- clean up the reducer and the styles a bit for dryer code.

