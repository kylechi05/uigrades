const initSqlJs = require('sql.js/dist/sql-wasm');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

let db;

initSqlJs().then(async SQL => {
    db = new SQL.Database();
    const sqlFilePath = path.join(__dirname, '../', 'courses.sql');
    const initScript = await fs.promises.readFile(sqlFilePath);
    db.run(initScript.toString());

    const insertStatements = [];
    const promises = [];

    const dataFilePath = path.join(__dirname, '../', 'data');
    fs.readdir(dataFilePath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }  

        const csvFiles = files.filter(file => file.endsWith('.csv'));

        csvFiles.forEach(file => {
            let courseSemesterYearToGrades = {}; // hashmap of course + semester + year to array of grades
            const promise = new Promise((resolve, reject) => {
                fs.createReadStream(`${dataFilePath}/${file}`)
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

                        const insertStatement = `INSERT INTO courses (
                            SUBJECT_COURSE_SECTION,
                            COURSE_TITLE,
                            PRIMARY_INSTRUCTOR_NAME,
                            A_PLUS,
                            A,
                            A_MINUS,
                            B_PLUS,
                            B,
                            B_MINUS,
                            C_PLUS,
                            C,
                            C_MINUS,
                            D_PLUS,
                            D,
                            D_MINUS,
                            F,
                            WITHDRAWN,
                            SEMESTER,
                            YEAR
                        ) VALUES (${values.join(', ')});`;
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

        // After all promises are resolved, insert the grades into the database
        Promise.all(promises)
            .then(() => {
                insertStatements.forEach(statement => {
                    db.run(statement);
                });

                // const result = db.exec('SELECT * FROM courses WHERE COURSE_TITLE LIKE "%Networks%"');
                // console.log(result[0].values);
                // Note to self, to query apostrophies add \' to the query
            })
            .catch(err => {
                console.error('Error processing files:', err);
            });
    });
}).catch(err => {
    console.error(err);
});

const getAllCourses = (req, res) => {
    try {
    const page = parseInt(req.query.page) || 1;
    const searchQuery = req.query.q || '';
    const PAGESIZE = 9;

    const offset = (page - 1) * PAGESIZE;

    if (searchQuery) {
        const terms = searchQuery.toLowerCase().split(' ');

        const queryAttributes = [
            'SUBJECT_COURSE_SECTION',
            'COURSE_TITLE',
            'PRIMARY_INSTRUCTOR_NAME',
            'SEMESTER',
            'YEAR'
        ];

        let whereClause = '';
        terms.forEach(term => {
            if (whereClause !== '') {
                whereClause += ' AND ';
            }
            whereClause += '(' + queryAttributes.map(attr => `${attr} LIKE "%${term}%"`).join(' OR ') + ')';
        });

        const query = `SELECT * FROM courses WHERE ${whereClause} LIMIT ${PAGESIZE} OFFSET ${offset}`;
        const result = db.exec(query);

        if (!result.length) {
            res.json({
                data: [],
                totalItems: 0
            });
            return;
        }

        // Count total items
        const countQuery = `SELECT COUNT(*) FROM courses WHERE ${whereClause}`;
        const allCourses = db.exec(countQuery);
        const totalItems = allCourses[0].values[0][0];

        res.json({
            data: result[0].values,
            totalItems
        });
    } else {
        const result = db.exec(`SELECT * FROM courses LIMIT ${PAGESIZE} OFFSET ${offset}`);
        if (!result.length) {
            res.json({
                data: [],
                totalItems: 0
            });
            return;
        }
        const allCourses = db.exec('SELECT COUNT(*) FROM courses');
        const totalItems = allCourses[0].values[0][0];

        res.json({
            data: result[0].values,
            totalItems
        });
    }
  } catch (error) {
    console.error("Error fetching courses", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getCourse = (req, res) => {
    try {
        const id = req.params.id;
        const result = db.exec(`SELECT * FROM courses WHERE id = ${id}`);
        res.json(result[0].values[0]);
    } catch (error) {
        console.error("Error fetching course", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getSimilarCourses = (req, res) => {
    try {
        const id = req.params.id;
        const result = db.exec(`SELECT * FROM courses WHERE id = ${id}`);
        const course = result[0].values[0];
        const courseSubjectSection = course[1].split(":")[0]+':'+course[1].split(":")[1]
        const similarCourses = db.exec(`SELECT * FROM courses WHERE SUBJECT_COURSE_SECTION LIKE "%${courseSubjectSection}%" AND id != ${id}`);
        if (similarCourses.length === 0) {
            res.json([]);
            return;
        }
        res.json(similarCourses[0].values);
    } catch (error) {
        console.error("Error fetching similar courses", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getAggregatedCourses = (req, res) => {
    try {
        const id = req.params.id;
        const result = db.exec(`SELECT * FROM courses WHERE id = ${id}`);
        const course = result[0].values[0];
        const courseSubjectSection = course[1].split(":")[0]+':'+course[1].split(":")[1]
        const aggregatedCourses = db.exec(`SELECT * FROM courses WHERE SUBJECT_COURSE_SECTION LIKE "%${courseSubjectSection}%" AND SEMESTER = "${course[18]}" AND YEAR = "${course[19]}"`); // get a list of all courses with the same subject and section and semester and year
        if (aggregatedCourses[0].values.length <= 1) {
            res.json([]);
            return;
        }
        // iterate through aggregated Courses and create an array that holds the total number of each grade
        const aggregatedGrades = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        aggregatedCourses[0].values.forEach(course => {
            aggregatedGrades[0] += Number(course[4]);
            aggregatedGrades[1] += Number(course[5]);
            aggregatedGrades[2] += Number(course[6]);
            aggregatedGrades[3] += Number(course[7]);
            aggregatedGrades[4] += Number(course[8]);
            aggregatedGrades[5] += Number(course[9]);
            aggregatedGrades[6] += Number(course[10]);
            aggregatedGrades[7] += Number(course[11]);
            aggregatedGrades[8] += Number(course[12]);
            aggregatedGrades[9] += Number(course[13]);
            aggregatedGrades[10] += Number(course[14]);
            aggregatedGrades[11] += Number(course[15]);
            aggregatedGrades[12] += Number(course[16]);
            aggregatedGrades[13] += Number(course[17]);
        });
        res.json({
            aggregatedGrades,
        });
    } catch (error) {
        console.error("Error fetching aggregated courses", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {getAllCourses, getCourse, getSimilarCourses, getAggregatedCourses}