from flask import (Blueprint, 
                    render_template, 
                    request, 
                    session, 
                    redirect, 
                    url_for)
from authenticate import Registration

user = Blueprint("user", __name__, static_folder="static", template_folder="templates")

@user.route('/register', methods=['POST','GET'])
def register():
    if request.method == 'POST':
        details = request.form
        username = details['name']
        email = details['email']
        password = details['password']
        if Registration.find_by_username(username):
            return render_template('registration.html', error="The username already exists")
        
        user = Registration(username, email, password) ## Registration(**details)
        user.save_to_db()
        session['name'] = username
        session['email'] = email
        return render_template("index.html")
    
    return render_template("registration.html")

@user.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = Registration.find_by_email(email)
        if user:
            if user.password == password:
                session['name'] = user.username
                return render_template("index.html")
            else:
                return render_template("login.html", error="Password is incorrect")
        return render_template("login.html", error="Username dont' exists first register")
    
    return render_template("login.html")

@user.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))