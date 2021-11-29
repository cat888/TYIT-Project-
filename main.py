from flask import Flask, render_template
from server import model
from user import user

app = Flask(__name__)
app.register_blueprint(model, url_prefix="/model")
app.register_blueprint(user, url_prefix="")

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# create tables
@app.before_first_request
def create_tables():
    db.create_all()

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

if __name__ == '__main__':
    app.secret_key = "012#!APaAjaBoleh)(*^%"
    ## initialising the db
    from db import db
    db.init_app(app)
    app.run(debug=True)