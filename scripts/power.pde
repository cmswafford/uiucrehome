#include <avr/power.h>
#include <avr/sleep.h>

char device;
const int voltagePin = A0;
const int currentPin = A1;
int i = 0;
const int points = 256;
int voltage[points];
int current[points];

void setup() {
  Serial.begin(57600);
//  pinMode(13,OUTPUT);    //on-board LED
//  pinMode(5,OUTPUT);     //external red LED
//  pinMode(6,OUTPUT);     //external green LED
  analogReference(EXTERNAL);
}

// blink LED 'blinks' times as a notification
void blinkLED(int blinks, int pin) {
  int i;
  for (i = 0; i < blinks; i++) {
    digitalWrite(pin,HIGH);
    delay(50);
    digitalWrite(pin,LOW);
    delay(50);
  }
}

// setup sleep mode to save power
void napTime(void) {
  set_sleep_mode(SLEEP_MODE_IDLE);
  
  // enables sleep pin
  sleep_enable();
  
  // turn off unneeded peripherals
  power_adc_disable();
  power_spi_disable();
  power_timer0_disable();
  power_timer1_disable();
  power_timer2_disable();
  power_twi_disable();
  
  // actually enter sleep mode
//  Serial.println("Goodnight");
//  blinkLED(5);  //external LED
  sleep_mode();
  
  /** The program will continue from here. **/
  /* First thing to do is disable sleep. */
  sleep_disable(); 
  
  // turn stuff back on
  power_all_enable();
 
//  Serial.println("Waking up"); 
//  blinkLED(5,6);    // indicates that the arduino woke up
}

void loop() {
  
  if(Serial.available() > 0) {
    device = Serial.read();
    
    if(device == 'A') {
      
      // read voltage and current
      for(i = 0; i < points; i++) {
        voltage[i] = analogRead(voltagePin);
        current[i] = analogRead(currentPin);
      }
      
      // write to serial port
      for(i = 0; i < points; i++) {
        // not using println b/c println also prints a \r
        Serial.print(voltage[i],DEC);
        Serial.print("\n");
        Serial.print(current[i],DEC);
        Serial.print("\n");
      }
//      blinkLED(5,5);      // external red LED
                          // NOTE: can't flash before sleeping inside napTime function, dunno why
      napTime();          // enter low-power state
    }
    else if(device == 'W'){
    // stay awake
//    Serial.println("Waking up, ready to upload new sketch");
    //blinkLED(5,6);
    }
    else {
//      Serial.println("Not a valid code");
 //     blinkLED(5,5);      // external red LED
                        // NOTE: can't flash before sleeping inside napTime function, dunno why
      napTime();         // enter low-power state
    }

//    Serial.flush();    // flushes serial port buffer
  }
  
}
