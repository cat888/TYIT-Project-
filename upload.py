from flask import (Blueprint,
                request,
                jsonify, 
                session,
                render_template,
                redirect,
                url_for)
from authenticate import Registration, Upload
from id import fetch_property_id
import os
import json
from flask_cors import CORS, cross_origin

upload_file = Blueprint("upload", __name__, static_folder="static", template_folder="templates")

api_v1_cors_config = {
    "origins": ["http://127.0.0.1:5000"]
}
CORS(upload_file, resources={
    r"/*": api_v1_cors_config
})

# @upload_file.after_request
# def after_request(response):
#     header = response.headers
#     header['Access-Control-Allow-Origin'] = '*'
#     return response

@upload_file.route('/upload', methods=['POST','GET'])
@cross_origin()
def upload():
    if session:
        user = Registration.find_by_email(session['email'])
        if request.method == 'POST':
            proprietor_id = user.id
            data = request.get_json()
            fileContent = []
            roomType = []
            for field in data["filedata"]:
                # fileContent_value = field["file-content"]
                # find_finalContent = fileContent_value.find('base64,')+len('base64,')
                # final_fileContent = fileContent_value[find_finalContent:]
                fileContent.append(field["file-content"])
                roomType.append(field["roomType"])
            del data["filedata"]
            data["fileContent"] = fileContent
            data["roomType"] = roomType
            file_data = {}
            file_data["fileName"] = data["fileName"]
            file_data["fileType"] = data["fileType"]
            file_data["fileContent"] = data["fileContent"]
            file_data["roomType"] = data["roomType"]
            del data["fileName"]
            del data["fileType"]
            del data["fileContent"]
            del data["roomType"]

            # return data
            property_ = Upload(**data)
            result = fetch_property_id(property_, proprietor_id)
            property_.proprietor_id = proprietor_id
            property_.property_id = result["property_id"]
            property_.property_no = result["property_no"]
            property_.view = property_.fetch_last_record(proprietor_id, "view")
            if not property_.view:
                property_.view = "view"+str(6)
            else:
                view = property_.view
                number = int(view[4:]) + 1
                property_.view = "view" + str(number)

            ## save the record to database
            property_.save_to_db()
            
            # fetch images from form and convert it into dict
            images = file_data
            fileName = file_data["fileName"]
            fileType = file_data["fileType"]
            fileContent = file_data["fileContent"]
            roomType = file_data["roomType"]
            # len_images = len(file_data["fileContent"])
            uploaded_images = []
            for i in range(len(fileName)):
                print("Inside loop")
                images_details = {}
                filename = fileName[i]
                print(filename)
                if filename.endswith('.jpeg') or filename.endswith('.jpg'):
                    if not os.path.isdir('static/upload'):
                        os.mkdir('static/upload')
                    if not os.path.isdir('static/upload/'+proprietor_id):
                        os.mkdir('static/upload/'+proprietor_id)

                    # now after creating the directory save the images to that directory
                    new_filename = property_.proprietor_id+"_"+"@"+property_.property_no+roomType[i]
                    
                    ## giving error for saving text file
                    # filepath = os.path.join('static/upload/'+proprietor_id, new_filename)
                    # image = fileContent[i]
                    # image.save(filepath)
                    
                    ## save text file
                    image = fileContent[i]
                    text_file = open(f'static/upload/{proprietor_id}/{new_filename}', "w")
                    text_file.write(image)
                    text_file.close()

                    ## saving details of file to dict
                    images_details["type"] = roomType[i]
                    images_details["image"] = new_filename

                    ## storing that in list
                    uploaded_images.append(images_details)
                    # print(uploaded_images)

                else:
                    return jsonify({"msg": "Please select the appropriate Image files"}), 422
            ## save json file to the folder

            # 1. Store the data in json format
            details = {}
            uploaded_property = data
            uploaded_property["uploaded_images"] = uploaded_images
            details["view"] = property_.view
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
            
            response = jsonify({"msg": "Property Uploaded Succesfully"})
            return response
        # return render_template("UploadProperty.html")
    return redirect(url_for("user.login")), 401  # but here we have to redirect to url