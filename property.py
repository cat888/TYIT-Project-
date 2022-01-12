# Importing modules
from flask import (Blueprint, 
                render_template, 
                redirect, 
                url_for,
                session,
                jsonify,
                request)
import sqlite3
import json
from flask_cors import CORS, cross_origin
from authenticate import Registration, Upload
import os
import json

## defining the global variables for search engine so that it can be used from both of the functions, searchproperty and property
search_records = []
search_error = []

# Flask Blueprints encapsulate functionality, such as views, templates, and other resources. To get a taste for how a 
# Flask Blueprint would work, you can refactor the previous application by moving the index view into a Flask Blueprint. 
# To do so, we have to create a Flask Blueprint that contains the index view and then use it in the application.

# As app is created by Flask class, blueprint will be created by Blueprint class which shows that it is the blueprint of class 
# and should be connected to the original app. It takes 4 arguments, 
# 1. :- name of Blueprint :- property
# 2. :- __name__ :- gives the name of file that is property
# 3. :- static folder path :- Thus in our case it will be static
# 4. :- template folder path :- Thus in our case it willl be templates
dynamic_view = Blueprint("property", __name__, static_folder="static", template_folder="templates")

api_v1_cors_config = {
    "origins": ["http://127.0.0.1:5000"]
}
CORS(dynamic_view, resources={
    r"/*": api_v1_cors_config
})


@dynamic_view.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

## Task :- Reduce the redundancy from view and property function

## 
@dynamic_view.route('/<string:fetch_view>',methods=['POST','GET'])
@cross_origin()
def view(fetch_view: str):
    if not session:
        return redirect(url_for("user.login"))

    if fetch_view == "view1":
        return render_template('view1.html')
    elif fetch_view == "view2":
        return render_template('view2.html')
    elif fetch_view == "view3":
        return render_template('view3.html')
    elif fetch_view == "view4":
        return render_template('view4.html')
    elif fetch_view == "view5":
        return render_template('view5.html')
    else:
        con = sqlite3.connect('user.db')
        cur = con.cursor()
        results = cur.execute('SELECT * FROM property where view = ?', (fetch_view,))
        for record in results:
            # records.append(record)
            view = record[10]
            if fetch_view == view:
                # print(view)
                proprietor_id = record[1]
                file = open(f'static/upload/{proprietor_id}/{proprietor_id}.json')
                data = json.load(file)
                # print(data)
                property = data['property']
                for result in property:
                    if result['view'] == fetch_view:
                        print(result)
                        # property = property[0]
                        uploaded_property = result['uploaded_property']

                        ## setting property_info
                        property_info = {}
                        property_info['view'] = result['view']
                        property_info['location'] = uploaded_property['location']
                        property_info['name'] = uploaded_property['name']
                        property_info['landmark'] = uploaded_property.get('landmark')
                        print(property_info)

                        image_info = []
                        for images in uploaded_property['uploaded_images']:
                            name = images['image']
                            file = open(f'static/upload/{proprietor_id}/{name}')
                            del images['image']
                            images['src'] = file.read()
                            image_info.append(images)
                        return render_template('dynamic_view.html', property_records=image_info, property_info=property_info)

        return redirect(url_for("property.property")) ## as property is the function of property.py 

@dynamic_view.route('/property',methods=['POST','GET'])
def property():
    if session:
        final_records = []
        final_error = []
        if search_records:
            # storing all the records of search_records into the final_records
            for i in range(len(search_records)):
                final_records.append(search_records[i])
            
            # clearing the search_records so that if direct request is send to property then no search_records
            #  should be found
            # and all the properties should be displayed to the user.
            search_records.clear()

            # Now rendering the search_property.html file with the properties that user are looking for so 
            # that
            # only those properties will be shown to he user for which user is searching.
            return render_template('search_property.html', property_records=final_records)
        elif search_error:
            # In case if property is not found then error will be thrown and thus it will get appended into 
            # final_error list
            # so that next time if user want to acces all properties then this error should not be found as 
            # it is global variable
            final_error.append(search_error[0])
            # clearing the search_error so that next time it won't found 
            search_error.clear()
            return render_template('search_property.html', error=final_error)

        ## If we are not looking for property then it wil return all properties in the property page
        records = []
        con = sqlite3.connect('user.db')
        cur = con.cursor()
        results = cur.execute('SELECT * FROM property')

        ## fetching property records from database and storing it in records list
        for record in results:
            ## Now fetch the thumbnail name from json file
            with open(f"static/upload/{record[1]}/{record[1]}.json", "r") as file:
                data = json.load(file)
                property_json = data["property"]
                for single_property in property_json:
                    # print(single_property)
                    ## Check if view of table and json file are same then only fetch thumbnail 
                    # otherwise it will overlapped
                    if single_property["view"] == record[10]:
                        property = single_property["uploaded_property"]
                        thumbnail_name = property.get("thumbnail")
                        new_record = list(record)
                        if thumbnail_name:
                            file = open(f"static/upload/{record[1]}/{thumbnail_name}","r")
                            thumbnail = file.read()
                            new_record.append(thumbnail)
                        else:
                            new_record.append(None)
            final_record = tuple(new_record)
            records.append(final_record)

        return render_template('property.html', property_records=records)
    return redirect(url_for("user.login"))

@dynamic_view.route('/UploadProperty',methods=['POST','GET'])
def UploadProperty():
    if session:
        return render_template('UploadProperty.html')
    return redirect(url_for('user.login'))

@dynamic_view.route('/myproperty', methods=['POST','GET'])
def myproperty():
    if session:
        user = Registration.find_by_email(session['email'])
        records = []
        con = sqlite3.connect('user.db')
        cur = con.cursor()
        proprietor_id = user.id
        results = cur.execute('SELECT * FROM property WHERE proprietor_id=?',(proprietor_id,))
        for record in results:
            ## Now fetch the thumbnail name from json file
            with open(f"static/upload/{record[1]}/{record[1]}.json", "r") as file:
                data = json.load(file)
                property_json = data["property"]
                for single_property in property_json:
                    # print(single_property)
                    ## Check if view of table and json file are same then only fetch thumbnail 
                    # otherwise it will overlapped
                    if single_property["view"] == record[10]:
                        property = single_property["uploaded_property"]
                        thumbnail_name = property.get("thumbnail")
                        new_record = list(record)
                        if thumbnail_name:
                            file = open(f"static/upload/{record[1]}/{thumbnail_name}","r")
                            thumbnail = file.read()
                            new_record.append(thumbnail)
                        else:
                            new_record.append(None)
            price = new_record[5]
            if price/100000 > 100:
                if price/10000000 == 1:
                    price = str(price/10000000)+" Crore"
                else:
                    price = str(price/10000000)+" Crores"
            else:
                if price/100000 == 1:
                    price = str(price/100000)+" Lakh"
                else:
                    price = str(price/100000)+" Lakhs"
            
            new_record[5] = price
            final_record = tuple(new_record)
            ## creating new tuple with changing price
            records.append(final_record)

        return render_template('dashboard.html', property_records=records)
    return redirect(url_for("user.login"))
    # return render_template('dashboard.html')

@dynamic_view.route('/delete/<string:fetch_view>', methods=['DELETE'])
@cross_origin()
def delete_view(fetch_view:str):
    if not session:
        return redirect(url_for("user.login"))
    
    ## deleting records from database

    con = sqlite3.connect('user.db')
    cur = con.cursor()
    
    ## Write a query to delete view from database
    cur.execute('DELETE FROM property WHERE view = ?', (fetch_view,))
    con.commit()
    con.close()

    # Delete records from json
    user = Registration.find_by_email(session['email'])
    proprietor_id = user.id
    with open(f"static/upload/{proprietor_id}/{proprietor_id}.json", "r") as file:
        data = json.load(file)
    
    all_list = data["property"]
    for index in range(len(all_list)):
        property_list = all_list[index]
        if property_list['view'] == fetch_view:
            all_list.pop(index)
            break
    
    data["property"] = all_list
    json_object = json.dumps(data, indent=4)
    with open(f"static/upload/{proprietor_id}/{proprietor_id}.json", "w") as file:
        file.write(json_object)
    
    ## delete the image file
    uploaded_property = property_list["uploaded_property"]
    uploaded_images = uploaded_property["uploaded_images"]
    for images in uploaded_images:
        image = images["image"]
        if os.path.isfile(f"static/upload/{proprietor_id}/{image}"):
            os.remove(f"static/upload/{proprietor_id}/{image}")

    return jsonify({"msg": "Property deleted"}), 200

@dynamic_view.route('/editproperty/<string:fetch_view>', methods=['PUT','GET'])
@cross_origin()
def editproperty(fetch_view: str):
    if session:
        ## If the request is PUT
        if request.method == 'PUT':
            data = request.get_json()
            
            ## Fetch the property object
            try:
                property_ = Upload.find_by_view(fetch_view)
                
                # Update in the database
                property_.name = data.get("name", property_.name)
                property_.price = data.get("price", property_.price)
                property_.bhk = data.get("bhk", property_.bhk) # -- As of now don't allow this to update
                property_.area = data.get("area", property_.area)
                property_.location = data.get("location", property_.location)
                property_.landmark = data.get("landmark", property_.landmark)
                property_.update_to_db()

            except AttributeError:
                return jsonify({"msg": "View not present first upload the property"})

            # Update the details in json
            proprietor_id = property_.proprietor_id
            with open(f"static/upload/{proprietor_id}/{proprietor_id}.json", "r") as file:
                file_json = json.load(file)
        
            all_list = file_json["property"]
            for index in range(len(all_list)):
                property_list = all_list[index]
                if property_list['view'] == fetch_view:
                    uploaded_property = property_list["uploaded_property"]
                    uploaded_property["location"] = property_.location
                    uploaded_property["name"] = property_.name
                    uploaded_property["bhk"] = property_.bhk
                    uploaded_property["price"] = property_.price
                    uploaded_property["area"] = property_.area
                    
                    fileContent = []
                    roomType = []
                    if data.get("filedata"):
                        for field in data.get("filedata"): 
                            fileContent.append(field["file-content"])
                            roomType.append(field["roomType"])

                        uploaded_images = uploaded_property["uploaded_images"]
                        
                        # print(roomType)
                        # print(fileContent)
                        updated_fileContent = []
                        updated_image = []
                        for i in range(len(roomType)):
                            for images in uploaded_images:
                                print(images["type"])
                                if images["type"] == roomType[i]:
                                    image_name = images["image"]
                                    updated_image.append(roomType[i])
                                    with open(f"static/upload/{proprietor_id}/{image_name}", "w") as file:
                                        file.write(fileContent[i])
                                    updated_fileContent.append(fileContent[i])
                        
                        # print(updated_image)
                        remaining_room = []
                        remaining_fileContent = []

                        ## Now delete the updated_image from roomType
                        for room in roomType:
                            if room in updated_image:
                                continue
                            else:
                                remaining_room.append(room)
                        
                        ## Now delete the updated fileContent from fileContent
                        for file in fileContent:
                            if file in updated_fileContent:
                                continue
                            else:
                                remaining_fileContent.append(file)
                        
                        # print(remaining_room)
                        # print(fileContent)
                        ## Now add the remaining room in the json file and create the image files of that
                        if len(remaining_room) > 0:
                            for i in range(len(remaining_room)):
                                images_details = {}
                                new_filename = property_.proprietor_id+"_"+"@"+property_.property_no+remaining_room[i]
                                ## save text file
                                image = remaining_fileContent[i]
                                text_file = open(f'static/upload/{proprietor_id}/{new_filename}', "w")
                                text_file.write(image)
                                text_file.close()

                                images_details["type"] = remaining_room[i]
                                images_details["image"] = new_filename
                                uploaded_images.append(images_details)
                        
                    # print(uploaded_images)
                        ## Update the content of images in json file
                        uploaded_property["uploaded_images"] = uploaded_images
                    
                    # Update the other Contents
                    property_list["uploaded_property"] = uploaded_property
                    all_list[index] = property_list
                    break
            
            # print(all_list)
            ## Update the files data in json
            file_json["property"] = all_list
            # print(file_json)
            json_object = json.dumps(file_json, indent=4)
            with open(f"static/upload/{proprietor_id}/{proprietor_id}.json", "w") as file:
                file.write(json_object)
            
            return jsonify({"msg": "Property Updated Succesfully"})
        

        ## If the request is GET then,
        user = Registration.find_by_email(session['email'])
        property_ = Upload.find_by_view(fetch_view)
        if user.id != property_.proprietor_id:
            return redirect(url_for("property.myproperty"))
        
        return render_template('EditProperty.html', property_obj = property_)
    
    ## If user is not login then render login page
    return redirect(url_for("user.login"))

## AttributeError: 'function' object has no attribute 'register' while giving the blueprint name as function name
@dynamic_view.route('/searchproperty')
def searchproperty():
    if session:
        # Fetch the data and store it in data variable
        data = request.args

        # For testing purpouse using postman or thunderclient
        # data = request.get_json()
        print(data)
        # Fetch the value of button from the data dictionary
        button = data.get("button")
        # If button is search then will return for the desired properties that the user is looking for else will return that No properties found
        if button == 'Search':
            location = data.get("location").lower()
            price = float(data.get("price"))
            bhk = int(data.get("bhk"))
            landmark = data.get("landmark")
            area = int(data.get("area"))
            # records = []
            con = sqlite3.connect('user.db')
            cur = con.cursor()

            if landmark and location: # None(False) and name(True)  
                results = cur.execute("SELECT * FROM property WHERE (location=? and price<=?) AND (bhk=? and landmark=?) AND area<=? ",(location, price, bhk, landmark, area)).fetchall()
            elif landmark:
                results = cur.execute("SELECT * FROM property WHERE (area<=? and price<=?) AND (bhk=? and landmark=?)",(area, price, bhk, landmark)).fetchall()
            elif location:
                results = cur.execute("SELECT * FROM property WHERE (location=? and price<=?) AND (bhk=? and area<=?)",(location, price, bhk, area)).fetchall()
            else:
                results = cur.execute("SELECT * FROM property WHERE (area<=? and price<=?) AND bhk=?",(area, price, bhk)).fetchall()
            
            con.close()
            for record in results:
                ## Now fetch the thumbnail name from json file
                with open(f"static/upload/{record[1]}/{record[1]}.json", "r") as file:
                    data = json.load(file)
                    property_json = data["property"]
                    for single_property in property_json:
                        # print(single_property)
                        ## Check if view of table and json file are same then only fetch thumbnail 
                        # otherwise it will overlapped
                        if single_property["view"] == record[10]:
                            property = single_property["uploaded_property"]
                            thumbnail_name = property.get("thumbnail")
                            new_record = list(record)
                            if thumbnail_name:
                                file = open(f"static/upload/{record[1]}/{thumbnail_name}","r")
                                thumbnail = file.read()
                                new_record.append(thumbnail)
                            else:
                                new_record.append(None)
                final_record = tuple(new_record)
                search_records.append(final_record)
            
            if search_records:
                print(search_records)
                return jsonify({"msg": "Records Found"})
                # return render_template('property.html', property_records=records)
            else:
                search_error.append("No records found")
                return jsonify({"msg": "No Records Found"})
                # return render_template('property.html', error="No Records Found")
    return jsonify({"msg": "Unauthorized user First Login"}), 401