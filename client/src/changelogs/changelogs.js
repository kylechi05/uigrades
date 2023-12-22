/*
    This file contains the changelogs for the application.
    Each changelog object contains the following fields:
    version: the version number of the application (large update.medium update.small update ex. 1.0.0 -> 1.0.1)
    type: the type of change (Release, Improvement, Update, Bug Fix)
    date: the date of the change
    features: the features added or changed
    description: a description of the change
    author: the person who approved / implemented the change
    showDescription: boolean to determine whether the description is shown or not
*/


const changelogs = [
  //   {
  //   version: '3.1.0',
  //   type: ['Update'],
  //   date: 'January 2024',
  //   features: ['Fall 2023 courses added!'],
  //   description: "Added Fall 2023 courses to the database.",
  //   author: 'LZ',
  //   showDescription: false
  // },
   {
    version: '3.0.1',
    type: ['Update', 'Release'],
    date: 'December 2023',
    features: ['Updates / changelogs page', 'Fullstack application'],
    description: "Added updates / changelogs page to the application. Hosting backend on https://render.com , only using free tier but we'll see how it goes.",
    author: 'LZ',
    showDescription: false
  },
    {
    version: '3.0.0',
    type: ['Update', 'Improvement'],
    date: 'December 2023',
    features: ['SQL database', 'Node/Express backend', 'Page retention in url', 'Improved search query retention in url', 'Courses now queriable by unique ID', 'Mobile dropdown navbar improved', 'Similar courses now display course size', 'Improved pagination'],
    description: "Version 3.0.0 is one of the biggest updates to the application. The application now uses a SQL database and a Node/Express backend to query the database. There are many benefits to switching the db to SQL: improved page / search query retention in the url, courses can now be queried by unique ID, similar courses are easier to fetch, and sharing courses is so much easier now since it's just an id. The mobile dropdown navbar has been improved to be more user friendly. Similar courses now display the course size. Pagination has been improved to be more user friendly regarding toggling theme.",
    author: 'LZ',
    showDescription: false
  },
    {
    version: '2.0.0',
    type: ['Improvement'],
    date: 'November 2023',
    features: ['Remove DexieJS'],
    description: "Removed DexieJS since the database is no longer needed / wasn't working as expected.",
    author: 'LZ',
    showDescription: false
  },
  {
    version: '1.2.1',
    type: ['Improvement', 'Bug Fix'],
    date: 'November 2023',
    features: ['Added Google Analytics', 'Fix user search query'],
    description: 'Added Google Analytics to track user activity and fixed the user search query bug where some queries were not properly queried.',
    author: 'LZ',
    showDescription: false
  },
  {
    version: '1.2.0',
    type: ['Bug Fix'],
    date: 'October 2023',
    features: ['Query now saved if back button is hit', 'Back button now works when viewing similar courses'],
    description: '',
    author: 'LZ',
    showDescription: false
  },
  {
    version: '1.0.0',
    type: ['Release'],
    date: 'October 2023',
    features: ['Host UIGrades on Vercel'],
    description: 'Initial release of UIGrades found at https://uigrades.vercel.app/',
    author: 'LZ',
    showDescription: false
  },
];

export default changelogs;