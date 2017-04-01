# Represented
CS 506 Project

## Sytem Requirements
### Hardware
* Minimum 2 GB of RAM
* Minimum 10 MB/s of Bandwidth
* Minimum 20GB storage
### Software
* Ubuntu 16.04 operating system
* Node Package Manager (npm) version 4.1.x
* npm package versions listed in package.json
* MongoDB shell version 3.2.x
* Mongod server version 3.2.x
* Python version 2.7.x
### Xamarin Application
* Windows 8.1 or newer
* Visual Studio 2013 or newer
* Xamarin 
* Android SDK
* Android Device with Android 4.x or newer

## Building and Running
### Xamarin Application
1.  Enable Developer Options on Android device and connect to machine over data cable
2.  Open Represented.sln in Visual Studio
3.  Set Represented.Droid as startup project
4.  Select Android device from dropdown of deployable devices
5.  Select Build->Deploy and then open application on Android device
### Installation
1. Spin up Ubuntu 16.04 Xenial the provided Vagrant Vagrantfile
```
$ vagrant up
$ vagrant ssh
ubuntu@ubuntu-xenial:~$ cd /vagrant
ubuntu@ubuntu-xenial:/vagrant$ npm start
```
You can now access the project from localhost:3000
