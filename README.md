# UI Grades

UI Grades is a web application to view grade distributions of courses at UIowa. Visit the site at [uigrades.vercel.app](https://uigrades.vercel.app/).

Maintained by ACM @UIowa, developed by Liao Z. For code related  questions or concerns reach out to [liaozhu@uiowa.edu](mailto:liao-zhu@uiowa.edu) or current head of the project. For other concerns please reach out to the [Undergraduate Student Government](https://usg.uiowa.edu/) @ UIowa.

## Development

The frontend is built with ReactJS, the DB being used is [Sql.js](https://github.com/sql-js/sql.js).
Hosting is done through Vercel, and analytics are handled via Google Analytics.

Necessary Libraries:

- [ReactJS](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [SqlJS](https://github.com/sql-js/sql.js)
- [ChartJS](https://www.chartjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Fontawesome](https://fontawesome.com/)

## Updating

When adding new data, go to [./db/data](./db/data/) and add the new `.csv` files.
Then run `node app.js` when you're inside the `/db` directory.

## Running

To run the application, run the following commands in your terminal:

```
cd client
npm install
npm start
```

Then in a seperate terminal window (make sure you're in the `uigrades` directory not `client`):

```
cd db
npm install
node app.js
```

Open up [http://localhost:3000](http://localhost:3000) to view it in the browser.
