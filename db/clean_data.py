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
    # semester = file_to_clean.split("/")[1].split(".")[0].split("_")[0]
    # year = file_to_clean.split("/")[1].split(".")[0].split("_")[1]
    # df = df.dropna(how='all') # for some reason xlsx to csv leaves a bunch of nan rows

    # df['+A-'] = df['+A-'].fillna(0)
    # df['A_Plus'] = "-"
    # df['A_Minus'] = "-"
    # df['+B-'] = df['+B-'].fillna(0)
    # df['B_Plus'] = "-"
    # df['B_Minus'] = "-"
    # df['+C-'] = df['+C-'].fillna(0)
    # df['C_Plus'] = "-"
    # df['C_Minus'] = "-"
    # df['+D-_F'] = df['+D-_F'].fillna(0)
    # df['D_Plus'] = "-"
    # df['D_Minus'] = "-"
    # df['F'] = "-"
    # df['WITHDRAWN'] = df['WITHDRAWN'].fillna(0)
    # df['SEMESTER'] = semester
    # df['YEAR'] = year
    # df['IS_NEW'] = 0 # set this to 0 if old, 1 if new, this is to help us keep track of new data so we can prompt the user
    
    # df = df.rename(columns={"+A-": "A", "+B-": "B", "+C-": "C", "+D-_F": "D_F", "WITHDRAWN": "W", "INSTRUCTOR_NAME_AND_ROLE" : "PRIMARY_INSTRUCTOR_NAME"})
    df = df.rename(columns={"W" : "WITHDRAWN"})

    df.to_csv(file_to_clean, index=False)

    print(f"{file_to_clean} Cleaned")
    
# please follow the 'directory/filename.csv' format
# clean_new_file("data/Fall_2022.csv")
# clean_new_file("data/Spring_2023.csv")
# clean_new_file("data/Winter_2022_2023.csv")
clean_new_file("data/Summer_2023.csv")
clean_new_file("data/Fall_2023.csv")