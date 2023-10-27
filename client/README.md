# Client

The client folder contains all the frontend code necessary for parsing and displaying the data.
In the [src](/client/src/) folder, you will find the [db](/client/src/db/) folder which contains the DexieJS database and the [data](/client/src/data/) folder which contains the CSV files. These two folders are very important to the structure of the site. Do not change the names of anything within these two folders, nor the structure of the db table in [db.js](/client/src/db/db.js) unless you know for sure what you are doing.

Any csv files that need to be added should be added to the [data](/client/src/data/) folder with the same naming convention as follows: `Semester_YEAR.csv`.

# BUG FIXES / IMPROVEMENTS
- Back button holds search query
- Back button after similar courses doesn't change course