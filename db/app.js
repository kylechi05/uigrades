/*
*
* RUN THIS FILE TO CREATE THE DB AND POPULATE IT WITH DATA
* make sure all .csv files are in the data folder
* `node app.js`
*
*/

const initSqlJs = require('sql.js/dist/sql-wasm');
const fs = require('fs');
const csv = require('csv-parser');

initSqlJs().then(async SQL => {
    const db = new SQL.Database();
    const initScript = await fs.promises.readFile('courses.sql');
    db.run(initScript.toString());

    const insertStatements = [];
    const promises = [];

    fs.readdir('./data', (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        const csvFiles = files.filter(file => file.endsWith('.csv'));

        csvFiles.forEach(file => {
            const promise = new Promise((resolve, reject) => {
                fs.createReadStream(`./data/${file}`)
                    .pipe(csv())
                    .on('data', row => {
                        const values = Object.values(row).map(value => {
                            if (typeof value === 'string') {
                                // Escape single quotes by replacing them with two single quotes
                                return `'${value.replace(/'/g, "''")}'`;
                            } else {
                                return value;
                            }
                        });

                        const insertStatement = `INSERT INTO courses VALUES (${values.join(', ')});`;
                        insertStatements.push(insertStatement);
                    })
                    .on('end', () => {
                        console.log(`File ${file} processed.`);
                        resolve(); // Resolve the promise when processing for this file is done
                    })
                    .on('error', err => {
                        reject(err); // Reject the promise if there's an error
                    });
            });

            promises.push(promise); // Store each promise in the array
        });

        // Wait for all promises to resolve before executing SQL statements
        Promise.all(promises)
            .then(() => {
                insertStatements.forEach(statement => {
                    db.run(statement);
                });

                // const result = db.exec('SELECT * FROM courses WHERE PRIMARY_INSTRUCTOR_NAME LIKE "%%"');
                // console.log(result[0].values);
            })
            .catch(err => {
                console.error('Error processing files:', err);
            });
    });
}).catch(err => {
    console.error(err);
});
