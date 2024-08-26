/*
    This file contains the changelogs for the application.
    Each changelog object contains the following fields:
    version: the version number of the application (large update.medium update.small update ex. 1.0.0 -> 1.0.1)
    type: the type of change (Feature, Improvement, Update, Bug Fix)
    date: the date of the change
    features: the features added or changed
    description: a description of the change
    author: the person who approved / implemented the change
    showDescription: boolean to determine whether the description is shown or not
*/


const changelogs = [
  {
    version: '4.1.0',
    type: ['Update', 'Bug Fix'],
    date: 'March 2024',
    features: ['Fixed Search Stutter', 'Added New Data'],
    description: 'Added debounce to search to prevent stuttering. New data has been added to the site including Winter 23-24 and Spring 24.',
    author: 'LZ + KC',
    showDescription: false
  },
  {
    version: '4.0.1',
    type: ['Bug Fix', 'Improvement'],
    date: 'March 2024',
    features: ['Fixed Safari Tablet Styling Issues', 'Added USG Contributor'],
    description: '',
    author: 'LZ',
    showDescription: false
  },
  {
    version: '4.0.0',
    type: ['Update', 'Improvement'],
    date: 'March 2024',
    features: ['Modern UI Change', 'Integrated New Data (Post Spring 24)', 'Updated Scripts to Handle New Data Format', 'Added Disclaimers About Data for Transparency'],
    description: 'Version 4.0.0 is a major update to the application. The UI has been modernized to be more user friendly with a dark theme applied constantly now. New data has been integrated into the site along with disclaimers regarding privacy conerns with the data. Please refer to https://uigrades.vercel.app/usage-guide , https://uigrades.vercel.app/data-transparency , and https://uigrades.vercel.app/about for more details.',
    author: 'LZ',
    showDescription: false
  },

  {
    version: '3.4.1',
    type: ['Improvement', 'Bug Fix'],
    date: 'December 2023',
    features: ['Fully converted to TypeScript', 'Space key no longer deletes randomly when searching'],
    description: 'Converted all pages to TypeScript. Sometimes when searching, the space key would randomly disappear. This has been fixed. Please refer to https://github.com/acm-uiowa/uigrades/issues/10 for more details.',
    author: 'LZ',
    showDescription: false
  },
  {
    version: '3.3.0',
    type: ['Improvement'],
    date: 'December 2023',
    features: ['TypeScript Components!', 'Bolded Landing Page Title'],
    description: 'With initiative from https://github.com/AmBha21 , all components have been converted to Typescript components for better clarity of types. This is perfect since some components may share similar prop names even though the props have varying types.',
    author: 'LZ',
    showDescription: false
  },
  {
    version: '3.2.2',
    type: ['Improvement'],
    date: 'December 2023',
    features: ['Pagination buttons no longer move on mobile', 'Added titles for organizers'],
    description: '',
    author: 'LZ',
    showDescription: false
  },
  {
    version: '3.2.1',
    type: ['Improvement', 'Bug Fix'],
    date: 'December 2023',
    features: ['Fixed All Sections viewer bug', 'Fixed similar courses not rendering after clicking', 'New Pagination', 'All sections will now aggregate entire page', 'Better separation of graph columns', 'Refactor About Page'], 
    description: "Updated Pagination so users can now see the first and last pages as well as click on them. Viewing entire courses instead of sections will now change the actual page instead of just the graph. Columns in graphs have been revamped to display different grades more clearly. Refactored about page to include contributors from Github. Similar courses wouldn't load even after clicking on it due to rerender not triggering, fixed by simiply changing the useEffect dependency. Fixed all sections viewer by improving logic of rendering.",
    author: 'LZ',
    showDescription: false
  },
  {
    version: '3.1.0',
    type: ['Update', 'Feature', 'Bug Fix'],
    date: 'December 2023',
    features: ['Show all section grades', 'Removed Pie Graph (Unnecessary)', 'Fixed share link pop up message', 'Dark theme for pagination', 'Moved share button to bottom', 'Added toggle between section and course viewer'],
    description: "Added a feature to show all section grades for a course. Removed the pie graph since it was unnecessary. With this, I've moved the share button to the bottom as well as a new button that allows the user to toggle between section and course viewer. Fixed the share link pop up message that was originally sticking to the top.",
    author: 'LZ',
    showDescription: false
  },
   {
    version: '3.0.1',
    type: ['Update', 'Feature'],
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
    type: ['Update'],
    date: 'October 2023',
    features: ['Host UIGrades on Vercel'],
    description: 'Initial Feature of UIGrades found at https://uigrades.vercel.app/',
    author: 'LZ',
    showDescription: false
  },
];

export default changelogs;
