from flask import (Blueprint,
                request,
                jsonify, 
                session,
                render_template)
from authenticate import Registration, Upload
from id import fetch_property_id
import os
import json

upload_file = Blueprint("upload", __name__, static_folder="static", template_folder="templates")

@upload_file.route('/upload', methods=['POST','GET'])
def upload():
    if session:
        user = Registration.find_by_email(session['email'])
        if request.method == 'POST':
            proprietor_id = user.id
            # data = request.get_json()
            data = request.form.to_dict()
            # return data
            property = Upload(**data)
            result = fetch_property_id(property, proprietor_id)
            property.proprietor_id = proprietor_id
            property.property_id = result["property_id"]
            property.property_no = result["property_no"]

            ## save the record to database
            property.save_to_db()

            # fetch images from form and convert it into dict
            images = request.files.to_dict()
            uploaded_images = []
            for file in images:
                images_details = {}
                filename = images[file].filename
                if filename.endswith('.jpeg'):
                    if not os.path.isdir('static/upload'):
                        os.mkdir('static/upload')
                    if not os.path.isdir('static/upload/'+proprietor_id):
                        os.mkdir('static/upload/'+proprietor_id)

                    # now after creating the directory save the images to that directory
                    new_filename = property.proprietor_id+"_"+"@"+property.property_no+file+".jpeg"
                    filepath = os.path.join('static/upload/'+proprietor_id, new_filename)
                    image = images[file]
                    image.save(filepath)

                    ## saving details of file to dict
                    images_details["type"] = file
                    images_details["image"] = new_filename

                    ## storing that in list
                    uploaded_images.append(images_details)
                    # print(uploaded_images)
            
            ## save json file to the folder

            # 1. Store the data in json format
            details = {}
            uploaded_property = data
            uploaded_property["uploaded_images"] = uploaded_images
            details["view"] = "view1"
            details["uploaded_property"] = uploaded_property
            # 2. writing to json file
            if not os.path.isfile(f"static/upload/{proprietor_id}/{proprietor_id}.json"):
                all_details = {}
                all_list = []
                all_list.append(details)
                all_details["property"] = all_list
                json_object = json.dumps(all_details, indent=4)
                with open(f"static/upload/{proprietor_id}/{proprietor_id}.json", "w") as file:
                    file.write(json_object)
            else:
                with open(f"static/upload/{proprietor_id}/{proprietor_id}.json", "r") as file:
                    data = json.load(file)
                    all_list = data["property"]
                    all_list.append(details)
                    data["property"] = all_list
                    json_object = json.dumps(data, indent=4)
                with open(f"static/upload/{proprietor_id}/{proprietor_id}.json", "w") as file:
                    file.write(json_object)
            return jsonify({"msg": "Property Uploaded Succesfully"})

        return jsonify({'msg': f' Hii!! {user.username}, this is Upload page for uploading 360 images as it is get request'})
    return jsonify({'msg': 'Render login page because user is not logged in'}), 401