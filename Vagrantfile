# -*- mode: ruby -*-
# vi: set ft=ruby :

# most of Vagrantfile copied from http://askubuntu.com/questions/832137/ubuntu-xenial64-box-password

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "ubuntu/xenial64"

  config.vm.network :private_network, ip: "10.10.10.10"

  config.ssh.insert_key = true
  config.ssh.forward_agent = true

  config.vm.provider :virtualbox do |vb|
     vb.memory = "2048"
     vb.name = "supercool"
     vb.customize ["modifyvm", :id, "--memory", "768"]
     vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
  end

  # https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04 
  # https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04 (using PPA)
  config.vm.provision "shell", inline: <<-SHELL
        apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927 
        
        echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list 
        
        apt-get -y update && apt-get install -y mongodb-org nodejs 
        
        echo "[Unit]" >> /etc/systemd/system/mongodb.service 
        echo "Description=High-performance, schema-free document-oriented database" >> /etc/systemd/system/mongodb.service 
        echo "After=network.target" >> /etc/systemd/system/mongodb.service 
        echo "" >> /etc/systemd/system/mongodb.service 
        echo "[Service]" >> /etc/systemd/system/mongodb.service 
        echo "User=mongodb" >> /etc/systemd/system/mongodb.service 
        echo "ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf" >> /etc/systemd/system/mongodb.service 
        echo "" >> /etc/systemd/system/mongodb.service 
        echo "[Install]" >> /etc/systemd/system/mongodb.service 
        echo "WantedBy=multi-user.target" >> /etc/systemd/system/mongodb.service 
        
        mkdir -p /data/db
	systemctl start mongodb
	systemctl enable mongodb
	cd ~
	curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
	sudo bash nodesource_setup.sh
	apt-get -y install nodejs
	apt-get -y install build-essential
	cd /vagrant
	npm install
  SHELL

  # EXTRAS atop what was copied from the link above
  # config.vm.synced_folder "../", "/home/ubuntu/"
  config.vm.network "forwarded_port", guest: 3000, host: 3000

end
