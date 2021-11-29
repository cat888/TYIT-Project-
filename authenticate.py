from db import db

class Registration(db.Model):
    __tablename__ = 'registration'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    email = db.Column(db.String(100))
    birth_date = db.Column(db.Date)
    type = db.Column(db.String(20))
    contact = db.Column(db.Integer)
    password = db.Column(db.String(80))

    def __init__(self, username, email, birth_date, type, contact, password):
        self.username = username
        self.email = email
        self.birth_date = birth_date
        self.type = type
        self.contact = contact
        self.password = password

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    
    @classmethod
    def find_by_username(cls, username):
        return Registration.query.filter_by(username=username).first()
    
    @classmethod
    def find_by_id(cls, _id):
        return Registration.query.filter_by(id = _id).first()

    @classmethod
    def find_by_email(cls, email):
        return Registration.query.filter_by(email = email).first()