const initSqlJs = require('sql.js/dist/sql-wasm'); // Use the correct import for your version

initSqlJs().then(SQL => {
  // Create a new database
    const db = new SQL.Database();

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS person (
        NAME TEXT,
        AGE INT
    )
    `;

    const insertQuery = `
        INSERT INTO person (NAME, AGE) VALUES ('John', 25),
        ('Jane', 20),
        ('Mike', 30),
        ('Nancy', 20)
    `;

    const selectQuery = `
        SELECT * FROM person WHERE AGE = 20
    `;

    // run the queries
    db.run(createTableQuery);
    db.run(insertQuery);
    db.run(selectQuery);

    // get the results
    let result = db.exec(selectQuery);
    result = result[0]
    const {columns, values} = result;

    console.log(values)
}).catch(err => {
  // Handle any potential initialization errors
  console.error(err);
});