import csv
import os

''' 
Steps to create schema - Liao Z. (2023):
1. Drop table if it already exists
2. Create table using headers
3. Insert data into table
'''

def create_schema():
    with open('headers.txt', 'r') as headers_file:
        headers = headers_file.readline().strip().split(',')
    
    with open('courses.sql', 'w') as sql_file:
        sql_file.write('DROP TABLE IF EXISTS courses;\n') # dropping the table to avoid conflict with existing table
        sql_file.write('\nCREATE TABLE courses (\n') # then creating the table
        for header in headers:
            sql_file.write(f'    {header} TEXT,\n') # debating on whether to use TEXT for all, or be really diligent and use INTEGER for grades but meh should work out if i cast later on
        sql_file.write(');\n\n')
        
    # get all the csv files in the /data 
    data_dir = "./data"
    csv_files = [os.path.join(data_dir, file) for file in os.listdir(
        data_dir) if file.endswith('.csv')]
    
    # go through each csv file and insert the data into the table
    for csv_file in csv_files:
        with open(csv_file, 'r', newline='', encoding='utf-8-sig') as csvfile:
            csvreader = csv.DictReader(csvfile)
            next(csvreader)  # Skip the header row since we already have it in headers.txt

            with open('courses.sql', 'a') as sql_file:
                for row in csvreader:
                    # SQL INSERT statements
                    insert_query = f"INSERT INTO courses VALUES ({row['SUBJECT_COURSE_SECTION']}, {row['COURSE_TITLE']}, {row['PRIMARY_INSTRUCTOR_NAME']}, " \
                                f"{row['A_PLUS']}, {row['A']}, {row['A_MINUS']}, {row['B_PLUS']}, {row['B']}, {row['B_MINUS']}, " \
                                f"{row['C_PLUS']}, {row['C']}, {row['C_MINUS']}, {row['D_PLUS']}, {row['D']}, {row['D_MINUS']}, " \
                                f"{row['F']}, {row['WITHDRAWN']}, {row['SEMESTER']}, {row['YEAR']});\n"
                    # INSERT statements to the SQL schema file
                    sql_file.write(insert_query)

if __name__ == '__main__':
    # Run this file everytime new data is added to the database
    create_schema()
    # in the end, courses.sql should be supeer duper long lol