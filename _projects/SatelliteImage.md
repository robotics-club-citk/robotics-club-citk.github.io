---
title: Satellite image reception
description: Receiving satellite image from NOAA and Meteor M weather satellites
date: 2019-03-23
status: completed
member-usernames: ["anupamsaikia", "angadsingh"]
images:
  - path: "assets/img/project-images/satImg0.jpg"
    size: 1412x533
    caption: Image received from the new Russian weather satellite Meteor M N2-2 on July 19, 2019. You can see the flood condition caused by river Brahmaputra in Assam
  - path: "assets/img/project-images/satImg1.jpg"
    size: 2693x3249
    caption: Full view of India captured from Meteor M2 satellite on March 23, 2019. The line in the picture is due to noise in the received signal.
  - path: "assets/img/project-images/satImg2.jpg"
    size: 2679x1867
    caption: Another view from Meteor M2 weather satellite
  - path: "assets/img/project-images/satImg3.jpg"
    size: 909x1269
    caption: Image received from the American NOAA 15 weather satellite on May 4, 2019. That is cyclone Fani in the center of the image. Map overlay is added using software.
  - path: "assets/img/project-images/satImg4.jpg"
    size: 2695x2215
    caption: Captured on May 18, 2019. The lines in the picture is due to noise in the signal. Satellite is Russian Meteor M2
---

<h3 class="has-text-weight-semibold is-size-5" style="margin-bottom:16px">Project details</h3>
<p>There are lots of satellites orbiting around the earth which broadcasts radio signals. If we have the right hardware, we can receive those signals to extract data. A few of these satellites are used for weather monitoring by taking pictures of the earth. For receiving these signals a Software Defined Radio(SDR) can be used.</p>
<br>
<p>SDR is a radio in which the physical layer functions are software defined. Which means tuning, filtering, demodulating of radio signals are performed using software. Generally SDRs are expensive devices. But there exist a cheap low performance SDR dongle called RTL-SDR which I used for this project. This device receives radio signal and converts it into raw digital form and feeds that signal into a computer or laptop. Then the signal processing is done using software in the computer.
</p>
<br>
<p>I successfully received signals from American NOAA weather satellites and Russian Meteor weather satellites. These satellites transmit radio signals with unencrypted data at around 137 MHz. I used appropriate antennas tuned to 137MHz to receive the signal.</p>
<br>
<h3 class="has-text-weight-semibold is-size-5" style="margin-bottom:16px">Ongoing development</h3>
<div class="content">
  <ul>
    <li>Making an high gain & directional motorized antenna mount which can track the satellites automatically.</li>
    <li>Making an AI model to predict weather using the data received from satellites.</li>
  </ul>
</div>
<hr>
