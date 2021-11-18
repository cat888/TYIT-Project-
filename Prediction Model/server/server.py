from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template("app.html")

@app.route('/get_location_names')
def get_location_names():
    util.load_saved_artifacts()
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access control allow origin', '*')
    return response

@app.route('/predict_home_price', methods=['POST'])
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

if __name__ == '__main__':
    app.run(debug=True)