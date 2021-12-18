from datetime import timedelta
from flask import Flask, render_template, redirect, url_for, session
from server import model
from user import user
from upload import upload_file
# from flask_mail import Mail

app = Flask(__name__)
app.register_blueprint(model, url_prefix="/model")
app.register_blueprint(user, url_prefix="")
app.register_blueprint(upload_file, url_prefix="")

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

@app.route('/<string:view>',methods=['POST','GET'])
def view(view: str):
    if view == "view1":
        return render_template('view1.html')
    elif view == "view2":
        return render_template('view2.html')
    elif view == "view3":
        return render_template('view3.html')
    elif view == "view4":
        return render_template('view4.html')
    elif view == "view5":
        return render_template('view5.html')
    else:
        return redirect(url_for("property"))

@app.route('/property',methods=['POST','GET'])
def property():
    return render_template('property.html')

@app.route('/UploadProperty',methods=['POST','GET'])
def UploadProperty():
    return render_template('UploadProperty.html')

if __name__ == '__main__':
    app.secret_key = "012#!APaAjaBoleh)(*^%"
    ## initialising the db
    from db import db
    db.init_app(app)

    ## initialising the mail instance
    # from mail import mail
    # mail.init_app(app)

    app.run(debug=True)