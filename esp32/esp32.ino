#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include "secrets.h"

LiquidCrystal_I2C lcd(0x27, 16, 2);


HTTPClient http;
int page = 0;
int prev = 33;
int next = 25;
// sda 26 scl 27

void setup() {
  // put your setup code here, to run once:
  Wire.begin(27, 26); 
  lcd.init();          
  lcd.backlight();     
  lcd.print("Flashcards!");
  
  pinMode(prev, INPUT_PULLUP);
  pinMode(next, INPUT_PULLUP;

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  Serial.begin(9600);
  http.begin("http://192.168.1.11/flashcards");
  int responseCode = http.GET();
  if (responseCode > 0) {
    String response = http.getString();
    JsonDocument doc;
    deserializeJson(doc, response);
  } else {
    Serial.print("error");
  }
  http.end();
}

void loop() {
  // put your main code here, to run repeatedly:
  if (digitalRead(prev) == LOW) {
    page -= 1;
    display();
  } 
  if (digitalRead(next) == LOW) {
    page += 1;
    display();
  } 
}

void display() {
  lcd.clear();
  if (page < 0 && page > doc.length()) {
    page = 0;
  }
  Serial.println("Term: " + doc[page].key()); // iffy syntax here
  Serial.println("Definition: " + doc[page]);
  lcd.setCursor(0,0);
  lcd.print(doc[page].key());
  lcd.setCursor(0,1);
  lcd.print(doc[page]);
}
