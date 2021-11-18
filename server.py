from flask import Blueprint, render_template, jsonify, request
from flask_cors import CORS
import util

model = Blueprint("model", __name__, static_folder="static", template_folder="templates")
CORS(model)

@model.route('/')
def index():
    return render_template("/prediction/app.html")

@model.route('/get_location_names')
def get_location_names():
    util.load_saved_artifacts()
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access control allow origin', '*')
    return response

@model.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    util.load_saved_artifacts()
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])

    estimated_out = util.get_estimated_price(location, total_sqft, bhk)

    response = jsonify({
        'estimated_price': round(estimated_out[0], 4),
        'estimated_price_rise': round(estimated_out[1], 4)
    })

    response.headers.add('Access control allow origin', '*')
    return response