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
* Python version 2.7.x
### Xamarin Application
* Windows 8.1 or newer
* Visual Studio 2013 or newer
* Xamarin 
* Android SDK
* Android Device with Android 4.x or newer

## Building, Running and Testing
### Building and Running Xamarin Application
1.  Enable Developer Options on Android device and connect to machine over data cable
2.  Open `CrossPlatform/Represented.sln` in Visual Studio
3.  Set Represented.Droid as startup project
4.  Select Android device from dropdown of deployable devices
5.  Select Build->Deploy and then open application on Android device
### Testing Xamarin Application
1.  Open `CrossPlatfrom/Represented.sln` in Visual Studio
2.  Open the Test Explorer Window
3.  Select Build->Build
4.  In the Test Explorer Window, click the Run All link
5.  Tests will then run from the `CrossPlatform/Represented.Test/WelcomeViewModelUnitTest.cs`
### Building and Running Node Angular 2 Application
0.  Run `npm install`
1.  Run `forever list` from command line to see if app is already running
2.  If anything is running, run `forever stopall` from command line
3.  Run `forever start -c "npm start" ./` from the command line to start server running at represented506.me
4.  Application can be accessed in browser at url: represented506.me/welcome
### Development Installation
1. Spin up Ubuntu 16.04 Xenial the provided Vagrant Vagrantfile
```
$ vagrant up
$ vagrant ssh
ubuntu@ubuntu-xenial:~$ cd /vagrant
```
2. Run the commands from "Building and Running Node Angular 2 Application"

You can now access the project from localhost:8000
