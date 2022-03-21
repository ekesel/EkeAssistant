import RPi.GPIO as GPIO
import time
 
# PIN connected to IN1
relay_pin = 26
 
# Set mode BCM
GPIO.setmode(GPIO.BCM)
 
#Type of PIN - output
GPIO.setup(relay_pin,GPIO.OUT)
 
try:
        while True:
                #set low
                print ("Setting low - LAMP ON")
                GPIO.output (relay_pin,GPIO.LOW)
                time.sleep(2)
                #set high
                print ("Setting high - LAMP OFF")
                GPIO.output (relay_pin, GPIO.HIGH)
                time.sleep(2)
except KeyboardInterrupt:
        GPIO.cleanup()
        print ("Bye")
