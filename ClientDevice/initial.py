import requests
import json

def getserial():
    cpuserial = "0000000000000000"
    try:
        f = open('/proc/cpuinfo','r')
        for line in f:
            if line[0:6]=='Serial':
                cpuserial = line[10:26]
        f.close()
    except:
        cpuserial = "ERROR000000000"
    return cpuserial


email = input("Email- ")
password = input("Password- ")

API_URL = "https://URL_HERE/getlogin"

serialid = getserial()

data = {'email':email, 'password':password, 'serialid':serialid}

r = requests.post(url = API_URL, data=data)

json_data = json.loads(r.text)

with open('localdb.json', 'w') as fp:
    json.dump(json_data, fp)

