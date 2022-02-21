from flask import (Blueprint, json, 
                    render_template, 
                    request, 
                    session, 
                    redirect, 
                    url_for,
                    jsonify,
                    abort)
from authenticate import Registration
from datetime import datetime
from create_json import create_json
from id import user_id
from flask_cors import CORS, cross_origin

## For sign in with google
# from google_auth_oauthlib.flow import Flow
# import os
# import pathlib

# Creating the object of Blueprint through Blueprint Class 
user = Blueprint("user", __name__, static_folder="static", template_folder="templates")

## Thus to enable the cross site cookies from origin http://127.0.0.1:5000
api_v1_cors_config = {
    "origins": ["http://127.0.0.1:5000"]
}

CORS(user, resources={
    r"/*": api_v1_cors_config
})


@user.route('/login', methods=['POST','GET'])
@cross_origin()
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
            user = Registration.find_by_email(email) # select * from user where email=email
            # select * from registration where email=email
            if user:
                if user.password == password:
                    session.permanent = True # setting the session as permanent
                    session['name'] = user.username
                    session['email'] = email
                    session['type'] = user.type
                    return jsonify({"msg": "Login Successfull"}), 200
                else:
                    return {"msg": "Password is incorrect"}, 403
            return {"msg": "User not exists first Register"}, 401
        
        else:
            email = request_data["email"]
            if Registration.find_by_email(email):
                return jsonify({"msg": "Email already exists"}), 403


            del request_data["Registration"]
            del request_data["confirm-password"]
            
            birth_date = request_data["birth_date"]
            del request_data["birth_date"]
            datetime_birth_date = datetime.strptime(birth_date, '%Y-%m-%d')
            request_data["birth_date"] = datetime_birth_date
        
            user = Registration(**request_data) ## Registration(**details)
            id_ = user_id(user, request_data["type"])
            user.id = id_ ## saving the id

            user.save_to_db()
            session['name'] = request_data["username"]
            session['email'] = request_data["email"]
            session['type'] = user.type
            
            # create a json file after registration of user
            create_json(user)
            return jsonify({"msg":"User Registered"}), 201
    
    return render_template("login.html")
    

@user.route('/delete', methods=['DELETE'])
def delete_user():    
    request_data = request.get_json()
    email = request_data["email"]
    password = request_data["password"]
    user = Registration.find_by_email(email)
    if not user:
        return jsonify({"msg": "User not present"}), 404
        
    if user.password != password:
        return jsonify({"msg": "Password incorrect"}), 401

    user.delete_from_db()
    create_json(user)
    return jsonify({"msg": "User deleted successfull"}), 200

@user.route('/logout')
def logout():
    session.clear()
    return redirect("/") # it will redirect to http://127.0.0.1:5000/
    # return jsonify({'msg': 'Logout Successfull'})
    # return redirect(url_for('index'))