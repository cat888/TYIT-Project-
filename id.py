import time
# from datetime import date, datetime
# import sqlite3
# from authenticate import Registration

def user_id(user, type):
    current_time = str(int(time.time())) ## 1
    print(current_time) ## create the time in seconds
    # print(datetime.fromtimestamp(int(time.time()))) ## it will convert the posix timestamp into local date

    # connection = sqlite3.connect('user.db')
    # cursor = connection.cursor()
    
    type = type.capitalize() ## request_data["type"]
    result = user.find_by_type(type)
    number = str(len(list(result))+1) ## 3
    print(number)

    # fetch_users = "Select * from registration where type=?"
    # result = cursor.execute(fetch_users, (string,))

    # number = str(len(list(result))+1) ## 3
    # print(number)
    # connection.close()

    if type == "Proprietor":
        last = "P"
    else:
        last = "B"

    print(last)

    user_id = current_time + "_" + last + number
    print(user_id)

    return user_id

def fetch_property_id(property, proprietor_id):
    ## 1. Now from proprietor id we will fetch proprietor_no
    proprietor_no = proprietor_id[11:]
    # print(proprietor_no)

    ## 2. fetch property_no

    # create the object property in upload.py and then pass that here.
    property_no = property.fetch_last_record(proprietor_id, "property_no")
    if not property_no:
        property_no = "R"+str(1)
    else:
        number = int(property_no[1:]) + 1
        property_no = "R" + str(number)

    ## 3. fetch type from data
    current_time = str(int(time.time()))
    property_id = proprietor_no+"_"+current_time+"_"+property_no
    
    result = {}
    result["property_id"] = property_id
    result["property_no"] = property_no
    return result