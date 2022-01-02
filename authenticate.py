from db import db

class Registration(db.Model):
    __tablename__ = 'registration'

    id = db.Column(db.String(100), primary_key=True)
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
    
    def delete_from_db(self):
        db.session.delete(self)
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
    
    @classmethod
    def find_by_type(cls, type_):
        return Registration.query.filter_by(type = type_)
    
    @classmethod
    def fetch_users(cls):
        return Registration.query.all()


class Upload(db.Model):
    __tablename__ = 'property'

    property_id = db.Column(db.String(100), primary_key=True)
    proprietor_id = db.Column(db.String(100), db.ForeignKey('registration.id'))
    property_no = db.Column(db.Integer)
    name = db.Column(db.String(100))
    location = db.Column(db.String(100))
    city = db.Column(db.String(100))
    landmark = db.Column(db.String(100))
    bhk = db.Column(db.Integer)
    area = db.Column(db.Integer)
    price = db.Column(db.Float)
    # category = db.Column(db.String(50))
    view = db.Column(db.Integer)

    def __init__(self, name, location, bhk, area, price, city="Mumbai", landmark=None):
        self.name = name
        self.location = location
        self.city = city
        self.bhk = bhk
        self.area = area
        self.price = price
        self.landmark = landmark

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
    
    def update_to_db(self):
        db.session.commit()
    
    @classmethod
    def find_by_name(cls, name):
        return Upload.query.filter_by(name=name).first()
    
    @classmethod
    def find_by_property_id(cls, property_id):
        return Upload.query.filter_by(property_id = property_id).first()
    
    @classmethod
    def find_by_view(cls, view):
        return Upload.query.filter_by(view = view).first()
    
    @classmethod
    def find_by_category(cls, category):
        return Upload.query.filter_by(category = category)
    
    ## store this in variable and through that fetch proprietor_no. or view
    @classmethod
    def fetch_last_record(cls, proprietor_id, column):
        count =  Upload.query.filter_by(proprietor_id = proprietor_id).all()
        if len(count) == 0:
            return False
        elif column == "property_no":
            return count[-1].property_no
        else:
            return count[-1].view