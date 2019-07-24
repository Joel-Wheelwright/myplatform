#include <ArduinoJson.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <Adafruit_NeoPixel.h>

#include <WiFiClientSecureBearSSL.h>
// Fingerprint for demo URL, expires on June 2, 2019, needs to be updated well before this date
const uint8_t fingerprint[20] = {0x08, 0x3B, 0x71, 0x72, 0x02, 0x43, 0x6E, 0xCA, 0xED, 0x42, 0x86, 0x93, 0xBA, 0x7E, 0xDF, 0x81, 0xC4, 0xBC, 0x62, 0x30};

ESP8266WiFiMulti WiFiMulti;
Adafruit_NeoPixel tira(8, 2, NEO_GRB + NEO_KHZ800);

void setup()
{

tira.begin();
  Serial.begin(115200);
  // Serial.setDebugOutput(true);

  Serial.println();
  Serial.println();
  Serial.println();

  for (uint8_t t = 4; t > 0; t--)
  {
    Serial.printf("[SETUP] WAIT %d...\n", t);
    Serial.flush();
    delay(1000);
  }

  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP("Be_Curious", "pulpoparacomer");
  
}

void loop()
{
  // wait for WiFi connection
  if ((WiFiMulti.run() == WL_CONNECTED))
  {
    std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);

    client->setFingerprint(fingerprint);
    

    HTTPClient https;

    Serial.print("[HTTPS] begin...\n");
    if (https.begin(*client, "https://my-name-is-jeff.herokuapp.com/device?id=5d2ee9ca8e1e7d0017a87791"))
    { // HTTPS

      Serial.print("[HTTPS] GET...\n");

      int httpCode = https.GET();

      if (httpCode > 0)
      {

        Serial.printf("[HTTPS] GET... code: %d\n", httpCode);

        // file found at server
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY)
        {
          StaticJsonDocument<400> doc;
          String payload = https.getString();
          deserializeJson(doc, payload);
          String deviceName = doc["name"];
          int statusValue = doc["status"];          
          Serial.println(statusValue);
          int b = statusValue % 1000;
          statusValue = (statusValue -b) / 1000;
          int g = statusValue % 1000;
          statusValue = (statusValue -g) / 1000;          
          int r = statusValue % 1000;
          Serial.println(deviceName);
          Serial.println(r);
          Serial.println(g);
          Serial.println(b);
          for(int i = 0; i<8; i++){
            tira.setPixelColor(i, tira.Color(r, g, b));
            tira.show();
            delay(100);
            };

          if (statusValue == 0){
            digitalWrite(2, LOW);
            }
            else{
              digitalWrite(2, HIGH);
              }

        }
      }
      else
      {
        Serial.printf("[HTTPS] GET... failed, error: %s\n", https.errorToString(httpCode).c_str());
      }

      https.end();
    }
    else
    {
      Serial.printf("[HTTPS] Unable to connect\n");
    }
  }

  Serial.println("Wait 10s before next round...");
  delay(1000);
}
