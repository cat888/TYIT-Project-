<<<<<<< HEAD
from flask import (Flask,
                render_template,
                request,
                redirect,
                session,
                url_for)
from server import model
import sqlite3

app = Flask(__name__)
app.register_blueprint(model, url_prefix="/model")

@app.route('/', methods=['POST','GET'])
def index():
    return render_template('index.html')

@app.route('/view1',methods=['POST','GET'])
def view1():
    return render_template('view1.html')

@app.route('/view2',methods=['POST','GET'])
def view2():
    return render_template('dynamic_view2.html')

@app.route('/view3',methods=['POST','GET'])
def view3():
    return render_template('view3.html')

@app.route('/view4',methods=['POST','GET'])
def view4():
    return render_template('view4.html')

@app.route('/view5',methods=['POST','GET'])
def view5():
    return render_template('view5.html')

@app.route('/property',methods=['POST','GET'])
def property():
    return render_template('property.html')

@app.route('/register', methods=['POST','GET'])
def register():
    if request.method == 'POST':
        details = request.form
        name = details['name']
        email = details['email']
        password = details['password'].encode('utf-8')

        connection = sqlite3.connect("project.db")
        cursor = connection.cursor()
        cursor.execute(f"INSERT INTO registration (username,email,password) VALUES (%s, %s, %s)",(name,email,password))

        connection.commit()
        session['name'] = name
        session['email'] = email
        connection.close()
        return redirect(url_for('index'))
    else:
        return render_template('registration.html')

@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password'].encode('utf-8')

        connection = sqlite3.connect("project.db")
        cursor = connection.cursor()
        result = cursor.execute("SELECT * FROM registration WHERE email=?", (email,))
        row = result.fetchone()
        user = {'name':row[1], 'email':row[2], 'password':row[3]}
        connection.close()

        if len(user) > 0:
            if user['password'].encode('utf-8') == password:
                session['name'] = user['name']
                session['email'] = user['email']
                return render_template('index.html')
            else:
                return "Incorrect password"
        else:
            return "Error password or user not match"
    else:
        return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.secret_key = "012#!APaAjaBoleh)(*^%"
=======
from flask import Flask,render_template
from flask import request,redirect,session,url_for

app = Flask(__name__)

#Configure Db
#app.config['MYSQL_HOST'] = 'localhost'
#app.config['MYSQL_USER'] = 'root'
#app.config['MYSQL_PASSWORD'] = ''
#app.config['MYSQL_DB'] = 'Registration'

#mysql = MySQL(app)

@app.route('/', methods=['POST','GET'])
def index():
    return render_template('index.html')

@app.route('/view1',methods=['POST','GET'])
def view1():
    return render_template('view1.html')

@app.route('/view2',methods=['POST','GET'])
def view2():
    return render_template('view2.html')

@app.route('/view3',methods=['POST','GET'])
def view3():
    return render_template('view3.html')

@app.route('/view4',methods=['POST','GET'])
def view4():
    return render_template('view4.html')

@app.route('/view5',methods=['POST','GET'])
def view5():
    return render_template('view5.html')

@app.route('/property',methods=['POST','GET'])
def property():
    return render_template('property.html')

@app.route('/register', methods=['POST','GET'])
def register():
    if request.method == 'POST':
        #Fetching data
        details = request.form
        name = details['name']
        email = details['email']
        password = details['password'].encode('utf-8')

        #hash_password = bcrypt.hashpw(password, bcrypt.gensalt())
        cur = mysql.connection.cursor()
        cur.execute(f"INSERT INTO users (name,email,password) VALUES (%s, %s, %s)",(name, email, password))

        # getting error :- work upon it ---
        #cur.execute(f"INSERT INTO users (name,email,password) VALUES (%s, %s, %s)", (name, email, hash_password))
        mysql.connection.commit()
        session['name'] = name
        session['email'] = email
        cur.close()
        return redirect(url_for('index'))
    else:
        return render_template('registration.html')

@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password'].encode('utf-8')
        cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cur.execute("SELECT * FROM users WHERE email=%s",(email,))
        user = cur.fetchone()
        cur.close()

        if len(user) > 0:
            #Invalid salt error:- -- work on it
            # if bcrypt.hashpw(password, user['password'].encode('utf-8')) == user['password'].encode('utf-8'):
            if user['password'].encode('utf-8') == password:
                session['name'] = user['name']
                session['email'] = user['email']
                return render_template('view1.html')
            else:
                return "Incorrect password"
        else:
            return "Error password or user not match"
    else:
        return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.secret_key = "012#!APaAjaBoleh)(*^%"
>>>>>>> origin/main
    app.run(debug=True)