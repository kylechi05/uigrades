import csv
import pandas as pd
import warnings
warnings.filterwarnings("ignore")

''' 
script to clean data to be used in a canotical format as best as we can
last updated - LZ 03/11/2024
'''

def clean_new_file(file_to_clean):
    df = pd.read_csv(file_to_clean)
    ### ===== RUN THIS BLOCK FIRST =====
    '''
    # file_to_clean looks like this "data/file_name.csv"
    semester_year = file_to_clean.split("/")[1].split(".")[0].split("_")
    semester = semester_year[0]
    year = semester_year[1] if len(semester_year) < 3 else semester_year[1] + "-" + semester_year[2]
    df = df.dropna(how='all') # for some reason xlsx to csv leaves a bunch of nan rows

    df['SECONDARY_INSTRUCTOR_NAME'] = ""
    df['+A-'] = df['+A-'].fillna(0)
    df['A_PLUS'] = "-"
    df['A_MINUS'] = "-"
    df['+B-'] = df['+B-'].fillna(0)
    df['B_PLUS'] = "-"
    df['B_MINUS'] = "-"
    df['+C-'] = df['+C-'].fillna(0)
    df['C_PLUS'] = "-"
    df['C_MINUS'] = "-"
    df['+D-_F'] = df['+D-_F'].fillna(0)
    df['D_PLUS'] = "-"
    df['D_MINUS'] = "-"
    df['F'] = "-"
    df['WITHDRAWN'] = df['WITHDRAWN'].fillna(0)
    df['SEMESTER'] = semester
    df['YEAR'] = year
    df['IS_NEW'] = 1 # set this to 0 if old, 1 if new, this is to help us keep track of new data so we can prompt the user
    
    df = df.rename(columns={"+A-": "A", "+B-": "B", "+C-": "C", "+D-_F": "D", "INSTRUCTOR_NAME_AND_ROLE" : "PRIMARY_INSTRUCTOR_NAME"})
    # for the new data, D_F has been registered as just D on the backend for easy storage, but rendered as D_F on the frontend for clarity
    
    new_order = ['SUBJECT_COURSE_SECTION', 'COURSE_TITLE', 'PRIMARY_INSTRUCTOR_NAME', 'SECONDARY_INSTRUCTOR_NAME',
                 'A_PLUS', 'A', 'A_MINUS', 'B_PLUS', 'B', 'B_MINUS', 'C_PLUS', 'C', 'C_MINUS',
                 'D_PLUS', 'D', 'D_MINUS', 'F', 'WITHDRAWN', 'SEMESTER', 'YEAR', 'IS_NEW']

    df = df[new_order]
    '''

    ### ===== RUN THIS BLOCK SECOND =====
    
    # for each row in the df check if the PRIMARY_INSTRUCTOR_NAME ends with "Course Supervisor" and if so, set the SECONDARY_INSTRUCTOR_NAME to that value
    d = {} # dictionary that will hold SUBJECT_COURSE_SECTION as key and the rest of the row as the value as an array
    for index, row in df.iterrows():
        if "Course Supervisor" in row['PRIMARY_INSTRUCTOR_NAME']:
            if row['SUBJECT_COURSE_SECTION'] in d: # this means that we have a real professor already seen
                d[row['SUBJECT_COURSE_SECTION']][3] = row['PRIMARY_INSTRUCTOR_NAME']
            else:
                d[row['SUBJECT_COURSE_SECTION']] = [row['SUBJECT_COURSE_SECTION'], row['COURSE_TITLE'], '', row['PRIMARY_INSTRUCTOR_NAME'], row['A_PLUS'], row['A'], row['A_MINUS'], row['B_PLUS'],
                                                row['B'], row['B_MINUS'], row['C_PLUS'], row['C'], row['C_MINUS'], row['D_PLUS'], row['D'], row['D_MINUS'], row['F'], row['WITHDRAWN'], row['SEMESTER'], row['YEAR'], row['IS_NEW']]
        else:
            if row['SUBJECT_COURSE_SECTION'] in d: # this means that we have a course supervisor already seen
                d[row['SUBJECT_COURSE_SECTION']][2] = row['PRIMARY_INSTRUCTOR_NAME']
            else:
                d[row['SUBJECT_COURSE_SECTION']] = [row['SUBJECT_COURSE_SECTION'], row['COURSE_TITLE'], row['PRIMARY_INSTRUCTOR_NAME'], '', row['A_PLUS'], row['A'], row['A_MINUS'], row['B_PLUS'],
                                                row['B'], row['B_MINUS'], row['C_PLUS'], row['C'], row['C_MINUS'], row['D_PLUS'], row['D'], row['D_MINUS'], row['F'], row['WITHDRAWN'], row['SEMESTER'], row['YEAR'], row['IS_NEW']]
        # remove the row from the df
        df = df.drop(index)
    
    # now we need to convert the dictionary back into a dataframe
    new_df = pd.DataFrame.from_dict(d, orient='index', columns=['SUBJECT_COURSE_SECTION', 'COURSE_TITLE', 'PRIMARY_INSTRUCTOR_NAME', 'SECONDARY_INSTRUCTOR_NAME', 'A_PLUS', 'A', 'A_MINUS', 'B_PLUS', 'B', 'B_MINUS', 'C_PLUS', 'C', 'C_MINUS', 'D_PLUS', 'D', 'D_MINUS', 'F', 'WITHDRAWN', 'SEMESTER', 'YEAR', 'IS_NEW'])
    
    # now we need to append the new_df to the df
    df = pd.concat([df, new_df])

    # ====== LEAVE THIS UNCOMMENTED ========
    # Saving the DataFrame to a new CSV file
    df.to_csv(file_to_clean, index=False)
    
    print(f"{file_to_clean} Cleaned")
    
# please follow the 'directory/filename.csv' format
# clean_new_file("data/Fall_2022.csv")
# clean_new_file("data/Spring_2023.csv")
# clean_new_file("data/Winter_2022_2023.csv")
# clean_new_file("data/Summer_2023.csv")
# clean_new_file("data/Fall_2023.csv")
#clean_new_file("data/Spring_2024.csv")
clean_new_file("data/Winter_2023_2024.csv")
