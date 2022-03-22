# EkeAssistant
A web-assistant that control your devices connected to your Raspberry Pi and perform some basic assistant tasks such as telling News, Checking Weather and connect to your Spotify to play songs. It works on Voice recognition like a assistant should!


## Tech Stack -

Backend - Django, MongoDB atlas, Redis.
Frontend - ReactJS, Bootstrap.
Client - Python, Shell Scripting.

# Installation

Well the installation will be broken into three parts i.e. backend, frontend and client. 

## Backend 

Step 1 - We will start off with creating a virtual environment and activating it.
```
cd BackendServer/ekeassistant
python3 -m venv env
source env/bin/activate
```
Step 2 - Now install all the required libraries -

```
pip install -r requirements.txt
```
This will install everything we need. Along with this do install redis in your computer.

Step 3 - Now head over to MongoDB atlas and create a account. After that create a dataabase and get the credentials.

Step 4 - Go to settings.py in the project and replace username, databasename, password with yours.

Step 5 - Now create a superuser after the database is connected.
```
python manage.py createsuperuser
```
That's all we need for the setup, Now we have setup the database but to run it locally we will need a local server that can be avaialable on our wifi so go ahead and install ngrok for this.

After installing ngrok use these commands to start the local server.
```
python manage.py runserver
ngrok http http://127.0.0.1:8000
```
Now we will have a local server running, let's move on to setup the frontend part.

## Frontend

Step 1- head over to the frontend directory and install the npm packages.
```
cd Frontend/
npm install 
```

Step 2 - Now head over to the src folder and let's change some URLs for the app to run smoothly.
open 'api.js' and changes the URL here line with the link you got from ngrok earlier.

Step 3 - Now open 'app.js' and here we have to change a bunch of things
First you have to create a spotify dev. account by going here and create an app there to get that token.
Now place that token in "CLIENT_ID" in app.js
(P.S - I m not sharing my token because i have not yet hosted the site and it can be misused.)

Step -4 Now in line number 118 app.js replace the server url with the ngrok one.

Step -5 head over to devices.js and replace the server websocket url with the ngrok one.

Step -6 Now lets configure the newsapi.js, Go to newsapi.org and create account to obtain the API_KEY. 
        now just replace the API_KEY with the one you created in newsapi.js
        
Step -7 The last thing to configure is weatherapi.js, Go to api.openweathermap.org and create account and obtain API_KEY and just replace it 
        in weatherapi.js
        
Step -8 Now head over to Profile.js and replace the server url with the ngrok one.

P.S - I will add a BASE_API_URL later to reduce the number of steps. 

now just run
```
npm start
```

to start our frontend connected with backend, now lets add the client RPI.

## ClientDevice

Here on, We will configure the RPI. The basic workflow can work in Ardiuno too but we just configure it the other way which i will discuss in Workflow part.

Step 1 - Boot up rpi with a display screen for first time and add the py files in Desktop folder of rpi present in the clientdevice directory.

Step 2 - Since Raspbian OS already has python installed, we don't have to install it again. Just open initial.py in any editor and replace the API_URL with the ngrok one.
 
Step 3 - Open connection.py in any editor and replace the url with the ngrok one. Notice here the file path of localdb.json is mentioned Desktop folder so if you have a different path, please change it to yours.

Note - Basically the initial.py will run once to store the login details and it will keep in localdb.json to connect to our websiite automatically by automatically running connection.py on boot. The connection.py will fetch the login details from the json file so keep the path same.

Step 4 - Now, lets move to hardware, connect any bulb or any device with GPIO using a relay module. Here i have connected to GPIO pin 26.

Step 5 - Now to check your connection is made properly or not. use run26.py. I have set it to GPIO 26 if you used any other pin just use any editor and change the code of run26.py relay_pin to that pin number. Now just run run26.py and the bulb will start blinking.

Step 6 - Once everything is done with the connections, close run26.py and keep it aside. 
        Now run initial.py and give your login input (any account you created through frontend or your superuser account will work). Once you login, this will connect this rpi device to our server. 
        
Step 7 - Now if we run connection.py then immediately in frontend we will be able to see our device in /devices. If we give the toggle command now with the UDN and pin it will toggle the bulb.

Step 8 - The last we have to do is that, we don't want to manually open rpi and everytime run the py file to connect the device so we will create a service in rpi which will start on boot. The steps are simple. 

https://tecadmin.net/setup-autorun-python-script-using-systemd/

Use this article having 4 steps to make connection.py run at startup.

After you are done, just restart the rpi and you can see the device getting listed in the /devices section as long as our server runs. Now you can place RPI and relay mod inside your switch box and connect it with the bulbs and fans and you can easily control them through the website from anywhere.

