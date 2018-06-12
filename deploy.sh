#!/bin/bash

user=root
url=106.15.91.56
name=node-server

task="
    cd /$user/$name;
    git checkout master;
    git checkout -- .;
    git pull origin master;
    rm -rf node_modules;
    yarn install;
    pm2 delete www;
    yarn serve;
"

ssh $user@$url <<< $task
