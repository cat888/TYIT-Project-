from datetime import timedelta
from flask import Flask, render_template, redirect, url_for, session, jsonify
# Blueprints
from server import model
from user import user
from upload import upload_file
from property import dynamic_view
import sqlite3
import os
# from flask_mail import Mail

app = Flask(__name__)
app.register_blueprint(model, url_prefix="/model")
app.register_blueprint(user, url_prefix="")
app.register_blueprint(upload_file, url_prefix="")
app.register_blueprint(dynamic_view, url_prefix="")

app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# create tables
@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/', methods=['POST','GET'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.secret_key = "012#!APaAjaBoleh)(*^%"
    ## initialising the db
    from db import db
    db.init_app(app)

    ## initialising the mail instance
    # from mail import mail
    # mail.init_app(app)

    app.run(debug=True)