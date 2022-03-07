from datetime import timedelta
from flask import Flask, render_template, session, request, jsonify
import json

# Importing Blueprints
from server import model
from user import user
from upload import upload_file
from property import dynamic_view

# Importing package for sending mail
import smtplib # SMTP :- Simple Mail Transfer Protocol is used to send mail
from email.message import EmailMessage

# Importing flask_cors that is a Flask extension for handling Cross Origin Resource Sharing (CORS), making cross-origin AJAX possible.
from flask_cors import CORS, cross_origin

# Creating the flask app. 
# Python sets the __name__ variable to the module name, so the value of this variable will vary depending on the Python 
# source file in which you use it. For example, in our case module name is  main.py that is located in the top-level directory of the
#  application, thus the value of __name__ is main
app = Flask(__name__)

# Configuring the CORS.By default, submission of cookies across domains is disabled due to the security implications.
# But we want cookies to be allowed between different headers thus we pass origin as http://127.0.0.1:5000 and inside the class
# of CORS given our application as first parameter and in second parameter dictionary is passed that enables cookies between 
# all endpoint /* of our main origin that we have passed.
api_v1_cors_config = {
    "origins": ["http://127.0.0.1:5000"]
}
CORS(app, resources={
    r"/*": api_v1_cors_config
})

# When using JSON cross origin, browsers will issue a pre-flight OPTIONS request for POST requests. In order for browsers
# to allow POST requests with a JSON content type, we must allow the Content-Type header
app.config['CORS_HEADERS'] = 'Content-Type'

# Registering the Blueprints that are defined in different modules to original app with url prefix thus url prefix of model 
# blueprint is /model thus the endpoint of model is called as http:127.0.0.1:5000/model/enpoint.
app.register_blueprint(model, url_prefix="/model")
app.register_blueprint(user, url_prefix="")
app.register_blueprint(upload_file, url_prefix="")
app.register_blueprint(dynamic_view, url_prefix="")


# As by default session reamins permanently until user manually deletes it, permanent session lifetime allows us to define a 
# particular time for session to be active and after that it automatically get's clear.
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=15)

# Configure the database by mentioning the type of database with a : followed by 3 forward slashes and name of database.
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'

# If we don't set it to false then everytime when we run the code it gives us warning 
# warnings.warn('SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and will be disabled by default in the future.  Set it to True to suppress this warning.')
# Thus to avoid the above warning set this to true.
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# create tables

# @app.before_first_request is the decorator that tells that this code will be executed only once when application is trigger by 
# first request. And a function is defined that which will be exceuted on our first request. Thus to reduce the work of creating database 
# manually, this function is defined so that on the first request database get's created with its defined tables and fields that are 
# defined in authenticate module.
@app.before_first_request
def create_tables():
    db.create_all()

# @app.route is the decorator used to define endpoints, where first parameter takes the name of endpoint which should be started by / 
# and then followed by name and other parameter takes the methods that are allowed to that particular URL, thus only POST and GET requests
# are allowed to http://127.0.0.1:5000/ url. And a function that should be executed when request is trigger to this URL.
@app.route('/', methods=['POST','GET'])
def index():
    return render_template('index.html')

# Defining the http://127.0.0.1:5000/contact url.
@app.route('/Contact',methods=['POST','GET'])
def Contact():
    if request.method == 'POST':
        data = request.get_json()
        # now load the mail information through json file
        file = open('config.json')
        json_data = json.load(file)
        
        # separate the sender and receiver info
        sender_info = json_data['sender-params']
        receiver_info = json_data['receiver-params']

        # now set the content of mail
        content = f'''
            Name: {data['name']} \n,
            Email: {data['email']} \n,
            Query: {data['message']}
        '''
        msg = EmailMessage()
        # Now set the content
        msg.set_content(content)
        msg['Subject'] = data['subject'] # set the subject of message
        msg['From'] = sender_info['email']
        msg['To'] = receiver_info['email']

        # thus here we have to pass smtp server address and port number to this. Thus here mention the gmail server
        # address and gmail port number
        server = smtplib.SMTP('smtp.gmail.com',587)

        # create a connection using TLS (Transport Layer Security)
        server.starttls()

        # It is used to login to your email using sender's email and password
        server.login(sender_info['email'], sender_info['password'])
        server.send_message(msg)
        server.quit()

        # return "Mail Sent Successfully", 200 # due to this ajax function was executing the error function instead of success as ajax want json as response
        return jsonify({"msg": "Mail sent Successfully"})
    return render_template('Contact.html')

@app.route('/Help')
def Help():
    return render_template('Help.html')


if __name__ == '__main__':
    ## setting of secret key for session
    app.secret_key = "012#!APaAjaBoleh)(*^%"
    ## initialising the db
    from db import db
    db.init_app(app)
    # Allows the app to run in debug mode
    app.run(debug=True)