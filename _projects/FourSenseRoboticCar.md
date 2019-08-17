---
title: Four sense Robotic car
description: Arduino Smart Robot car works on two sensors Infrared and Ultrasonic sensor. The IR sensor helps in detecting line and go along it. And the ultrasonic sensor helps in calculating the distance of any obstacle coming on its way.
date: 2019-03-16
status: completed
member-usernames: ['siranjibhaloi', 'rajdeepbaruah']
youtube-video: <iframe width="805" height="448" src="https://www.youtube.com/embed/cdLK5ujwu9w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
---



#### Project Contents :
* Arduino MEGA
* L298N Motor Driver
* IR Sensor
* Ultrasonic Sensor
* LCD (16:2)
* Potentiometer


#### Arduino code :

```c

#include <LiquidCrystal.h>

LiquidCrystal lcd(22, 24, 26, 28, 30, 32); //LCD PINS
int sensor1, sensor2, duration, distance;

void setup()
{

  pinMode(8, OUTPUT);  // Motor 1 Pin
  pinMode(9, OUTPUT);  // Motor 1 Pin
  pinMode(10, OUTPUT); // Motor 2 Pin
  pinMode(11, OUTPUT); // Motor 2 Pin
  pinMode(12, OUTPUT); // Ultrasonic sensor Trigger Pin
  pinMode(13, INPUT);  // Ultrasonic sensor Echo Pin
  pinMode(14, INPUT);  // IR sensor 1 Pin
  pinMode(15, INPUT);  // IR sensor 2 Pin

  lcd.begin(16, 2);
}

void loop()
{
  calcdistance();
  sensor1 = digitalRead(14);
  sensor2 = digitalRead(15);
  lcd.setCursor(1, 0);
  lcd.print(" ROAD CLEAR ");

  if (sensor1 == HIGH && sensor2 == HIGH)
  {
    if (distance < 30)
    {
      lcd.setCursor(1, 0);
      lcd.print(" OBSTACLE DETECTED ");
      right();
      delay(1000);
      lcd.setCursor(1, 0);
      lcd.print(" ROAD CLEAR ");
      calcdistance();
    }
    else
    {
      forward();
      delay(50);
    }
  }
  else if (sensor1 == HIGH && sensor2 == LOW)
  {
    lcd.setCursor(1, 0);
    lcd.print(" LINE DETECTED ");
    left();
    delay(50);
  }
  else if (sensor1 == LOW && sensor2 == HIGH)
  {
    lcd.setCursor(1, 0);
    lcd.print(" LINE DETECTED ");
    right();
    delay(50);
  }
  else
    stop();
}

void forward()
{
  digitalWrite(8, HIGH);
  digitalWrite(9, LOW);
  digitalWrite(10, HIGH);
  digitalWrite(11, LOW);
}
void backward()
{
  digitalWrite(8, LOW);
  digitalWrite(9, HIGH);
  digitalWrite(10, LOW);
  digitalWrite(11, HIGH);
}
void left()
{
  digitalWrite(8, LOW);
  digitalWrite(9, LOW);
  digitalWrite(10, HIGH);
  digitalWrite(11, LOW);
}
void right()
{
  digitalWrite(8, HIGH);
  digitalWrite(9, LOW);
  digitalWrite(10, LOW);
  digitalWrite(11, LOW);
}
void stop()
{
  digitalWrite(8, LOW);
  digitalWrite(9, LOW);
  digitalWrite(10, LOW);
  digitalWrite(11, LOW);
}

void calcdistance()
{

  digitalWrite(12, LOW);
  delayMicroseconds(2);

  digitalWrite(12, HIGH);
  delayMicroseconds(10);
  digitalWrite(12, LOW);

  duration = pulseIn(13, HIGH);
  distance = duration * 0.034 / 2;
}
```
