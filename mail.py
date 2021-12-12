# https://pythonhosted.org/Flask-Mail/
# https://www.codewithharry.com/videos/web-dev-using-flask-and-python-11
# https://www.youtube.com/watch?v=O-IM9wr0F6M&t=98s

from flask import Flask, json
from flask_mail import Mail

with open("config.json") as file:
    params = json.load(file)["params"]

app = Flask(__name__)
app.config.update(
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = '465',
    MAIL_USE_SSL = True,
    MAIL_USERNAME = params['gmail-user'],
    MAIL_PASSWORD = params['gmail-password']
)

mail = Mail()

@app.route("/contact", methods=['GET', 'POST'])
def contact():
    mail.send_message(
        'Introduction to flask mail',
        sender=params["gmail-user"], 
        recipients = ['dashingbb786@gmail.com'],
        body = "Very much thankful to Code with Harry for this Tutorial",
        )

if __name__ == '__main__':
    mail.init_app(app)  
    ## if error comes then go this site and enable the captcha https://accounts.google.com/DisplayUnlockCaptcha
    ## refrence link :- https://stackoverflow.com/questions/34926570/flask-securitys-flask-mail-registration-receives-smtplib-smtpauthenticationerro
    app.run(debug=True)

## Succesfully send the mail, now try to send it to user who registered succesfully