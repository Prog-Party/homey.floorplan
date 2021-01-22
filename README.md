# Homey.floorplan

[![Dependency Status](https://david-dm.org/Prog-Party/homey.floorplan.svg)](https://david-dm.org/Prog-Party/homey.floorplan.svg)

Homey.floorplan is an open-source project for wall-mounted Homey dashboards.
Built by ProgParty!

![](http://www.deresen.nl/jensdennis/homeyfloorplan/tablet.png)

## Debugging

To run this locally:

```
npm i -g serve
git clone https://github.com/Prog-Party/homey.floorplan.git
cd homey.floorplan
serve -p 1337 app
```
Then visit `http://localhost:1337/?theme=floorplan&token=<TOKEN>`.

> Your token can be acquired by visiting https://homey.ink and looking in the console after logging in.

Live url:
https://homeyfloorplan.azurewebsites.net/?theme=floorplan&token=<TOKEN>
