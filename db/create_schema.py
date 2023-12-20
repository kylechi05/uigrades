import csv
import os

''' 
Steps to create schema - Liao Z. (2023):
1. Drop table if it already exists
2. Create table using headers from headers.txt
'''

def create_schema():
    with open('headers.txt', 'r') as headers_file:
        headers = headers_file.readline().strip().split(',')
    
    with open('courses.sql', 'w') as sql_file:
        sql_file.write('DROP TABLE IF EXISTS courses;\n') # dropping the table to avoid conflict with existing table
        sql_file.write('\nCREATE TABLE courses (\n') # then creating the table
        sql_file.write("\n    id INTEGER PRIMARY KEY AUTOINCREMENT, \n") # primary key for each course
        for header in headers:
            sql_file.write(f'    {header} TEXT,\n') # debating on whether to use TEXT for all, or be really diligent and use INTEGER for grades but meh should work out if i cast later on
        sql_file.write(');\n\n')
        
if __name__ == '__main__':
    create_schema()
    print('Finished creating schema')