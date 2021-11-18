# from flask import Blueprint, render_template
# from flask import request,redirect,session,url_for
# from flask_mysqldb import MySQL,MySQLdb

# authenticate = Blueprint("authenticate", __name__, static_folder="static", template_folder="templates")
# # Thus we can change the static and templates folder of this blueprint

# # Configure Db
# # authenticate.config['MYSQL_HOST'] = 'localhost'
# # authenticate.config['MYSQL_USER'] = 'root'
# # authenticate.config['MYSQL_PASSWORD'] = ''
# # authenticate.config['MYSQL_DB'] = 'Registration'

# mysql = MySQL(authenticate)

# @authenticate.route('/', methods=['POST','GET'])
# def index():
#     return render_template('index.html')

# @authenticate.route('/register', methods=['POST','GET'])
# def register():
#     if request.method == 'POST':
#         #Fetching data
#         details = request.form
#         name = details['name']
#         email = details['email']
#         password = details['password'].encode('utf-8')

#         #hash_password = bcrypt.hashpw(password, bcrypt.gensalt())
#         cur = mysql.connection.cursor()
#         cur.execute(f"INSERT INTO users (name,email,password) VALUES (%s, %s, %s)",(name, email, password))

#         # getting error :- work upon it ---
#         #cur.execute(f"INSERT INTO users (name,email,password) VALUES (%s, %s, %s)", (name, email, hash_password))
#         mysql.connection.commit()
#         session['name'] = name
#         session['email'] = email
#         cur.close()
#         return redirect(url_for('index'))
#     else:
#         return render_template('registration.html')

# @authenticate.route('/login', methods=['POST','GET'])
# def login():
#     if request.method == 'POST':
#         email = request.form['email']
#         password = request.form['password'].encode('utf-8')
#         cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
#         cur.execute("SELECT * FROM users WHERE email=%s",(email,))
#         user = cur.fetchone()
#         cur.close()

#         if len(user) > 0:
#             #Invalid salt error:- -- work on it
#             # if bcrypt.hashpw(password, user['password'].encode('utf-8')) == user['password'].encode('utf-8'):
#             if user['password'].encode('utf-8') == password:
#                 session['name'] = user['name']
#                 session['email'] = user['email']
#                 return render_template('view1.html')
#             else:
#                 return "Incorrect password"
#         else:
#             return "Error password or user not match"
#     else:
#         return render_template('login.html')

# @authenticate.route('/logout')
# def logout():
#     session.clear()
#     return redirect(url_for('index'))