import sqlite3
import pandas as pd

df = pd.read_csv('cleaned_data.csv')

conn = sqlite3.connect('databasenew.db')

df.to_sql('crimes', conn, if_exists='replace')

conn.close()