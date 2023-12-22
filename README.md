# UI Grades

![Landing Page](./client/public/static/images/landing.png)

UI Grades is a web application to view grade distributions of courses at UIowa. Visit the site at [uigrades.vercel.app](https://uigrades.vercel.app/).

Maintained by ACM @UIowa, developed by Liao Z. For code related  questions or concerns reach out to [liaozhu@uiowa.edu](mailto:liao-zhu@uiowa.edu) or current head of the project. For other concerns please reach out to the [Undergraduate Student Government](https://usg.uiowa.edu/) @ UIowa.

## Development

The frontend is built with ReactJS, utilizing a Node/Express server, and the DB being used is [Sql.js](https://github.com/sql-js/sql.js).
Frontend hosting is done through [Vercel](https://vercel.com/), backend is done through [Render](https://render.com/) and analytics are handled via [Google Analytics](https://marketingplatform.google.com/about/analytics/).

Necessary Libraries:

- [ReactJS](https://reactjs.org/)
- [ExpressJS](https://expressjs.com/)
- [React Router](https://reactrouter.com/)
- [SqlJS](https://github.com/sql-js/sql.js)
- [ChartJS](https://www.chartjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Fontawesome](https://fontawesome.com/)

## Updating

When adding new data, go to [/data](./data/) and add the new `.csv` files.
Then run `node index.js`

## Running

To run the application, run the following commands in your terminal:

```
cd client
npm install
npm start
```

Then in a seperate terminal window (make sure you're in the `uigrades` directory not `client`):

```
npm install
node index.js
```

Open up [http://localhost:3000](http://localhost:3000) to view it in the browser.
