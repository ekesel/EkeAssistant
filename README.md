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

After installing ngrok use these commands to start the local server 
```
python manage.py runserver
ngrok http http://127.0.0.1:8000
```
Now we will have a local server running, let's move on to setup the frontend part.

## Frontend

Step 1- head over to the frontend directory and install the npm packages.
```
npm install 
```

Step 2 - Now head over to the src folder and let's change some URLs for the app to run smoothly.
