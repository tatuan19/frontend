# use swap memory for npm install

sudo dd if=/dev/zero of=/swapfile bs=1M count=1024

sudo mkswap /swapfile

sudo swapon /swapfile

echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

free -m

# install node

sudo apt-get update -y

sudo apt-get install -y ca-certificates curl gnupg

sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt-get update

sudo apt-get install -y nodejs

node -v

npm -v

```
node version が低いとき
# node 削除
sudo apt-get purge nodejs

sudo apt-get autoremove

# nvm install

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm install --lts
```

# 基本的なツール install
sudo apt-get install build-essential

# pm2 install

sudo npm install -g pm2

# react-scripts install

sudo npm install -g react-scripts

# git install

sudo apt-get update

sudo apt-get install git

# aws install

sudo apt-get update

sudo apt-get install awscli

sudo aws configure

```
# AWS Access Key ID [None]: accesskey_typing

# AWS Secret Access Key [None]: secret_typing

# Default region name [None]: ap-northeast-1

# Default output format [None]: json
```
# codedeploy agent install

wget https://aws-codedeploy-ap-northeast-1.s3.amazonaws.com/latest/install

chmod +x ./install

sudo apt-get install ruby

sudo ./install auto

# check install & check servicing status codedeploy-agent

sudo service codedeploy-agent status

# codedeploy-agent auto start when ec2 instance boot

sudo vim /etc/init.d/codedeploy-startup.sh

```
#!/bin
sudo service codedeploy-agent restart
```

sudo chmod +x /etc/init.d/codedeploy-startup.sh