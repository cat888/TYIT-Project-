import json
from authenticate import Registration


def create_json(user):
## fetch the details from databse and properly add into json file
    all_users = list()
    database_details = user.fetch_users()
    for details in database_details:
        # columns = details.keys()
        ## users[columns[0]] = details.id -- try this
        users = {}
        users["id"] = details.id
        users["username"] = details.username
        users["email"] = details.email
        users["type"] = details.type
        all_users.append(users)	

    json_object = json.dumps(all_users, indent=4)
    with open("user.json", "w") as file:
        file.write(json_object)