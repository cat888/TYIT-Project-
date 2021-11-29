from flask import (Blueprint, json, 
                    render_template, 
                    request, 
                    session, 
                    redirect, 
                    url_for,
                    jsonify)
from authenticate import Registration
from datetime import datetime

user = Blueprint("user", __name__, static_folder="static", template_folder="templates")

# @user.route('/register', methods=['POST','GET'])
# def register():
#     if request.method == 'POST':
#         details = request.form
#         username = details['name']
#         email = details['email']
#         password = details['password']
#         if Registration.find_by_username(username):
#             return render_template('registration.html', error="The username already exists")
        
#         user = Registration(username, email, password) ## Registration(**details)
#         user.save_to_db()
#         session['name'] = username
#         session['email'] = email
#         return render_template("index.html")
    
#     return render_template("registration.html")
  
@user.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'POST':
        # request_data = request.form
        request_data = request.get_json()
        # print(request_data)
        
        # request_data = request.form.to_dict()

        submit = request_data["Registration"]
        if submit == "Sign In":
            email = request_data['email']
            password = request_data['password']
            user = Registration.find_by_email(email)
            if user:
                if user.password == password:
                    session['name'] = user.username
                    return jsonify({"msg": "Login Successfull"}), 200
                    # return render_template("index.html"), 200
                else:
                    return {"msg": "Password is incorrect"}, 403
                    # return render_template("login.html", error="Password is incorrect"), 403
            return {"msg": "User not exists first Register"}, 401
            # return render_template("login.html", error="Username dont' exists first register"), 401
        
        else:
            # details = request.form
            email = request_data["email"]
            # print(request_data)
            if Registration.find_by_email(email):
                return jsonify({"msg": "Email already exists"}), 403
                # return render_template('login.html', error="The username already exists"), 401

            # if request_data["password"]==request_data["confirm-password"]:
            del request_data["Registration"]
            del request_data["confirm-password"]
            
            birth_date = request_data["birth_date"]
            del request_data["birth_date"]
            datetime_birth_date = datetime.strptime(birth_date, '%Y-%m-%d')
            request_data["birth_date"] = datetime_birth_date
            user = Registration(**request_data) ## Registration(**details)
            user.save_to_db()
            session['name'] = request_data["username"]
            session['email'] = email
            return jsonify({"msg":"User Registered"}), 201
            # return render_template("index.html"), 201

            # else:
            #     # return "Password mismatch", 403
            #     return render_template("login.html", error="Password Mismatches"), 403
    
    return render_template("login.html")

@user.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))