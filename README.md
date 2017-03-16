# Represented
CS 506 Project

## Sytem Requirements
### Hardware
* Minimum 2 GB of RAM
* TODO Minimum XXX mb/s of Bandwidth
* Minimum 20GB storage
### Software
* Ubuntu 16.04 operating system
* Node Package Manager (npm) version 4.1.x
* npm package versions listed in package.json
* MongoDB shell version 3.2.x
* Mongod server version 3.2.x
* Python version 2.7.x

## Installation
1. Spin up Ubuntu 16.04 Xenial either as a VPS, a Docker container, or a Vagrant virtual machine.
    * For example, with Vagrant installed:
```
$ vagrant init ubuntu/xenial64
$ vagrant up
```

2. Install system software
3. Configuration
    * Disable remote connection to the MongoDB by including this in /etc/mongod.conf
```
# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1
```
