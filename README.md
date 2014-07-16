# OWASP Attacker

A simple website written in Node.js that is designed to be an attackers website that is able to list all incoming http requests. 

**Most commands in this README should be run from the project root directory**

## Setup Environment

#### Overview
Install node.js [via package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) or [download binaries](http://nodejs.org/download) or [build it](https://github.com/joyent/node/wiki/Installation)

Install [MongoDB](http://docs.mongodb.org/manual/installation/)

#### Ubuntu

1. Install [nodejs](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) and the package manager:

	
		$ sudo apt-get update	
		$ sudo apt-get install -y python-software-properties python g++ make	
		$ sudo add-apt-repository ppa:chris-lea/node.js	
		$ sudo apt-get update	
		$ sudo apt-get install nodejs 

2. If you are behind a [proxy](https://github.com/npm/npm/issues/2119) you might need to run this: 

    	$ npm config set registry "http://registry.npmjs.org/"

3. Get a local copy of the repository:

    	$ git clone https://github.com/arkpx/lockbox_jscrypto.git

4. Get all the required packages for the project:

    	$ npm install

5. Install [MongoDB](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)

		$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
		$ echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
		$ sudo apt-get update
		$ sudo apt-get install mongodb-10gen

## Test

Currently no tests have been developed. 


## Run

### Local Deploy

1. Make sure the mongodb service is running:

		$ sudo service mongodb start

2. Run the app(must be in the root directory of the project where the main app file is located - app.js):

		$ node app

3. Open a web browser to `http://localhost:3000/`


## Debuging

1. We use [node-inspector](https://github.com/node-inspector/node-inspector):

		$ npm install -g node-inspector

2. To start the inspector:

		$ node-inspector 

3. Start the app(this will break on the first line):

		$ node --debug-brk app

4. Open `http://127.0.0.1:8080/debug?port=5858` in Chrome

		**NOTE:** Only seems to work with Chrome atm.
