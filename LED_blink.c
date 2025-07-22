/*
  Eric Brant
  Firmware Artifact: LED Blink
  Description: Turns an LED on and off with 1-second intervals using basic GPIO control.
  Board: Arduino Uno
  Language: C (Arduino environment)
  Skills: Register abstraction, loop logic, embedded timing
*/

#define LED_PIN 13

void setup() {
  pinMode(LED_PIN, OUTPUT); // Initialize pin as output
}

void loop() {
  digitalWrite(LED_PIN, HIGH); // LED on
  delay(1000);                 // Wait 1 second
  digitalWrite(LED_PIN, LOW);  // LED off
  delay(1000);                 // Wait 1 second
}
