# UI Grades

![Landing Page](./client/public/static/images/landing.png)

UI Grades is a web application to view grade distributions of courses at UIowa. Visit the site at [uigrades.vercel.app](https://uigrades.vercel.app/).

Maintained by ACM @UIowa, developed by Liao Z. For code related  questions or concerns reach out to [liaozhu@uiowa.edu](mailto:liao-zhu@uiowa.edu) or current head of the project. For other concerns please reach out to the [Undergraduate Student Government](https://usg.uiowa.edu/) @ UIowa.

## Development

The frontend is built with TypeScript, utilizing a Node/Express server, and the DB being used is [Sql.js](https://github.com/sql-js/sql.js).
Frontend hosting is done through [Vercel](https://vercel.com/), backend is done through [Render](https://render.com/) and analytics are handled via [Google Analytics](https://marketingplatform.google.com/about/analytics/).

Necessary Libraries:

- [ReactJS](https://reactjs.org/)
- [ExpressJS](https://expressjs.com/)
- [React Router](https://reactrouter.com/)
- [SqlJS](https://github.com/sql-js/sql.js)
- [ChartJS](https://www.chartjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Fontawesome](https://fontawesome.com/)
- [Pandas](https://pandas.pydata.org/)

## Updating

When adding new data, go to [/db/data](./db/data/) and add the new `.csv` files. If changes are to be made to the [clean_data.py](./db/clean_data.py) script make sure you are in the root directory, then run:
1. `cd db`
2. `source virt/bin/activate`
3. `pip3 install -r requirements.txt`
The script should now be able to run / be edited

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
node index.js
```

Open up [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Disclaimer

UIGrades is an objective data-based tool for students to visualize past semester courses’ grade distributions at the University of Iowa. If you’re using UIGrades to select classes to take, please use it in conjunction with MyUI. Grade distributions are not necessarily an indicator of course difficulty nor a reflection on the instructor or department rewarding those grades. There are several factors that determine the ultimate grade distribution of a course, difficulty being only one. Additionally, UIGrades is not a substitute for an advising appointment. Please see your designated academic advisor for questions about your proposed course schedule.