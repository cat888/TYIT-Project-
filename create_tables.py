import sqlite3

connection = sqlite3.connect("project.db")
cursor = connection.cursor()

create_table = "CREATE TABLE IF NOT EXISTS registration(id INTEGER PRIMARY KEY, username text, email text, password text)"
cursor.execute(create_table)

# insert_table = "INSERT INTO registration VALUES(1, 'Burhanuddin', 'burhanuddinnahargarwala@gmail.com', 'realestate')"
# cursor.execute(insert_table)


select_query = "SELECT * FROM registration WHERE username=?"
result = cursor.execute(select_query, ('Burhanuddin',))
row = result.fetchone()
print(row)

connection.commit()
connection.close()