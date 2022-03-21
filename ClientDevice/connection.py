from websocket import create_connection
import json
import RPi.GPIO as GPIO

def toggle(relay_pin):
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(relay_pin, GPIO.OUT)
    state = GPIO.input(relay_pin)
    if state:
        GPIO.output (relay_pin,GPIO.LOW)
    else:
        GPIO.output(relay_pin,GPIO.HIGH)

with open('/home/pi/Desktop/localdb.json') as fp:
    data = json.load(fp)
url = "ws://<URL_HERE>/ws/devices/"+data['udn']+"/?token="+data['token']
ws = create_connection(url)
ws.send("connected")
print("opened")
while(ws.connected):
    res = ws.recv()
    res = json.loads(res)
    pin = res['gpio']
    toggle(int(pin))
#ws.close()

