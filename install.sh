#!/bin/sh

npm install express
npm install swig --save

cd vendors
mkdir GollumJS 
git clone https://github.com/GollumJS/Class.js GollumJS/Class
mkdir jQuery
git clone -b 2.1.3 https://github.com/jquery/jquery.git jQuery/jquery
