#include <OneWire.h>
#include <DallasTemperature.h>
#include "BluetoothSerial.h"  // ESP32 built-in Bluetooth

// -------------------- Sensor Pins --------------------
#define ONE_WIRE_BUS 13   // DS18B20 temperature
#define PH_PIN 34         // pH sensor
#define MOISTURE_PIN 35   // Soil moisture sensor
#define RELAY_PIN 25      // Relay for pump

// -------------------- Objects --------------------
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
BluetoothSerial BT;  // Bluetooth Serial object

// -------------------- Variables --------------------
int pH_Value, moistureValue;
float Voltage, pH, temperatureC, moisturePercent;
int moistureThreshold = 30; // Below this %, pump turns ON

// -------------------- Setup --------------------
void setup() {
  Serial.begin(9600);        
  BT.begin("ESP32_PlantMonitor"); // Bluetooth device name

  sensors.begin();
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH); // Relay off (active-low)

  Serial.println("System Ready. Sensors and relay initialized.");
}

// -------------------- Process Commands --------------------
void processCommand(String command, Stream &serial) {
  command.trim();
  if (command.length() > 0) {
    serial.print("Received: ["); serial.print(command); serial.println("]");
    if (command.equalsIgnoreCase("ON")) {
      digitalWrite(RELAY_PIN, LOW); // Pump ON
      serial.println("Pump ON"); BT.println("Pump ON");
    } else if (command.equalsIgnoreCase("OFF")) {
      digitalWrite(RELAY_PIN, HIGH); // Pump OFF
      serial.println("Pump OFF"); BT.println("Pump OFF");
    } else {
      serial.print("Unknown command: ["); serial.print(command); serial.println("]");
      BT.print("Unknown command: ["); BT.print(command); BT.println("]");
    }
  }
}

// -------------------- Loop --------------------
void loop() {
  // ----- Read Temperature -----
  sensors.requestTemperatures();
  temperatureC = sensors.getTempCByIndex(0);

  // ----- Read pH -----
  pH_Value = analogRead(PH_PIN);
  Voltage = pH_Value * (5.0 / 4095.0); // ESP32 ADC scale
  pH = 7 + ((2.5 - Voltage) / 0.18);

  // ----- Read Soil Moisture -----
  moistureValue = analogRead(MOISTURE_PIN);
  moisturePercent = map(moistureValue, 4095, 0, 0, 100); // Dry=0%, Wet=100%

  // ----- Automatic Pump Control -----
  if (moisturePercent < moistureThreshold) {
    digitalWrite(RELAY_PIN, LOW); // Pump ON
  } else {
    digitalWrite(RELAY_PIN, HIGH); // Pump OFF
  }

  // ----- Print Data to Serial -----
  Serial.print("Temp: "); Serial.print(temperatureC, 2);
  Serial.print(" °C, pH: "); Serial.print(pH, 2);
  Serial.print(", Moisture: "); Serial.print(moisturePercent, 1); Serial.println(" %");

  // ----- Send Data via Bluetooth -----
  BT.print(temperatureC, 2); BT.print(",");
  BT.print(pH, 2); BT.print(",");
  BT.println(moisturePercent, 1);

  // ----- Check Bluetooth Commands -----
  if (BT.available() > 0) {
    String command = BT.readStringUntil('\n');
    processCommand(command, Serial);
  }

  // ----- Check USB Serial Commands -----
  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    processCommand(command, Serial);
  }

  delay(3000); // Send data every 3 seconds
}
