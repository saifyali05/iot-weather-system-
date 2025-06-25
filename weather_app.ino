
#include <WiFi.h>
#include <BlynkSimpleEsp32.h>
#include <DHT.h>

#define DHTPIN   4
#define DHTTYPE  DHT11
#define AIRPIN   34

#define BLYNK_TEMPLATE_ID "TMPL32Jh8gv7B"
#define BLYNK_TEMPLATE_NAME "WEATHER MONITORING"
#define BLYNK_AUTH_TOKEN "zt4P4lYvq6lr-dJ6bnAJ1WDMdUwET1-7"

char ssid[] = "Istakbal";
char pass[] = "Istakbal";

DHT dht(DHTPIN, DHTTYPE);
BlynkTimer timer;



int estimateAQI(int analogValue) {
  if (analogValue < 200)     return 0;     
  else if (analogValue < 400)  return 50;  
  else if (analogValue < 800)  return 100; 
  else if (analogValue < 1200) return 150; 
  else if (analogValue < 2000) return 200; 
  else if (analogValue < 3000) return 300; 
  else                         return 400; 
}

/* ---------- AQI-based suggestion text ---------- */
String makeSuggestion(float t, float h, int aqi) {
  String advice = "";

  if (t < 15)          advice += "Feels cold, wear warm clothes. ";
  else if (t > 30)     advice += "Feels hot, stay hydrated. ";
  else                 advice += "Temp OK. ";

  if (h < 40)          advice += "Air is dry, consider humidifier. ";
  else if (h > 65)     advice += "High humidity, use dehumidifier. ";
  else                 advice += "Humidity OK. ";

  if (aqi <= 50)           advice += "Air quality excellent.";
  else if (aqi <= 100)     advice += "Air is acceptable.";
  else if (aqi <= 150)     advice += "Air unhealthy for sensitive.";
  else if (aqi <= 200)     advice += "Unhealthy air, avoid outdoor.";
  else if (aqi <= 300)     advice += "Very unhealthy, wear mask.";
  else                     advice += "Hazardous air! Stay indoors.";

  return advice;
}

/* ---------- Sensor Reading ---------- */
void sendSensorData() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  int raw = analogRead(AIRPIN);
  int aqi = estimateAQI(raw);

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read DHT11");
    return;
  }

  Blynk.virtualWrite(V0, t);
  Blynk.virtualWrite(V1, h);
  Blynk.virtualWrite(V2, aqi);  // Send calibrated AQI instead of raw
  String msg = makeSuggestion(t, h, aqi);
  Blynk.virtualWrite(V3, msg);

  Serial.printf("T: %.1f°C  H: %.1f%%  AQI: %d  | %s\n", t, h, aqi, msg.c_str());
}

void setup() {
  Serial.begin(9600);
  dht.begin();
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
  timer.setInterval(3000L, sendSensorData);
}

void loop() {
  Blynk.run();
  timer.run();
}
