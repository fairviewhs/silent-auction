# Silent Auction

#### Current author: Donovan Allen
#### Past Author: Jackson Chen
---
*Silent Auction* is a web app written in NodeJS for the hosting of silent auctions and collecting donations. It was originally written in Ruby on Rails by Jackson Chen and Noah Finer in 2015-16. It was later ported by Donovan Allen in 2017 to NodeJS Express. It uses the Polymer Project for much of it's styling and layout.

## Installing
*Silent Auctions* was designed for Ubuntu 16.04 LTS but should work correctly on all systems that support NPM and it's dependencies.

### General Setup
This is the general step to install the application not specific to the Fairview server installation.
#### Git
First you will need to clone the git repo so you have a copy of the code. I recomend you do this in a place like `/srv/` as this will need to persist to run the web server.
#### NPM and Bower
Within the new project folder you will need to run `npm install` to install all the needed NPM dependencies. Then to setup Polymer, you will need to enter the public folder, and run `bower install`. if your system does not have bower, you should install it with `npm install -g bower`. Once this task has completed all polymer assets will have been downloaded and ready to use on the site.
#### Redis and Sessions
The server uses Redis to store its sessions so you will need to install the redis server. `apt-get install redis-server` will install it, no configuration is required.
#### Config file
The app comes with a default application configuration named `config.json.sample`. Copy it and customize the `sequelize.password`, `secrets.saltRounds`, and `secrets.sessions` to your liking, you may set them however you please, however you will need the `sequelize.password` so keep that handy. You will also need to set `secrets.mail.pass` to the correct value for the SilentAuctions email.
#### MySQL server
The server uses Sequelize as it's ORM so you will need MySQL to support this. To install MySQL use `apt-get install mysql-server` which will install the latest version. Then I would recommend running some security tasks to ensure there are no security holes in the base install. Running `mysql_secure_installation` and `mysql_install_db` should do the trick. Once this has completed you will need to configure the MySQL user. Execute `CREATE DATABASE silent-auction; CREATE USER 'SilentAuctions'@'localhost' IDENTIFIED BY '<YOUR PASSWORD HERE>'; GRANT ALL PRIVILEGES ON silent-auction.* TO 'SilentAuctions'@'localhost' WITH GRANT OPTION;` to create the database, user, and add access for the user to the database. On the first run of the application all tables and columns will be created.
#### Forever
To keep the server running you should use Forever, to install it run `npm install -g forever`. To start the application in forever mode you will need to run `forever start bin/forever/production.json`. This will keep the application running in case it crashes and ensure that it maintains a working directory. The default port for this application is 3000 however this may not be desired if you are already running an app on that port. To set a new port simply define a new environment variable on startup. Something like `PORT=1555 forever start bin/forever/production.json` would bind the application to localhost:1555.
#### NGINX or Apache
I like using nginx to bounce the connections to the node app, however Apache will also work. The configurations for both Apache and NGINX are listed bellow:
NGINX:
```
server {
    listen 80;
    listen [::]:80;

    server_name example.com;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://127.0.0.1:3000/;

        # Socket.IO Support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
  }
```

Apache:
```
<VirtualHost example.com:*>
    ProxyPreserveHost On

    ProxyPass http://127.0.0.1:3000/
    ProxyPassReverse http://127.0.0.1:3000/

    ServerName localhost
</VirtualHost>
```

### Fairview setup
The Fairview setup is almost identical to the general setup. The only differences are that with Fairview the application is run under the deploy user and the cloned directory is `/srv/silent-auction/`. Beyond that, NGINX is setup to bounce connections to https from http which you can look up in `/opt/nginx/conf/nginx.conf` under the `https://www.silentauctions.co` banner.
#### DNS
The DNS for silentauctions.co is managed through cloudflare and takes advantage of cloudflare's ssl security for its secure connection. There is also an about A and AAAA record which is for Noah Finer's about page which can be found under `/srv/silent-auction-info-page`. This was mostly for publicity and was kept off the main app due to its conflicting design choices.
#### Reboot
Ubuntu automatically restarts the node server with cron:
```
@reboot PORT=1324 PATH=/home/deploy/.nvm/versions/node/v7.4.0/bin
 /home/deploy/.nvm/versions/node/v7.4.0/bin/forever start
 /srv/silent-auction/bin/forever/production.json
```

## Application layout
Due to the fact that this app is written in NodeJS I think it necessary to document it's layout as it is more free form that the previous rails app.
### MVC
This app follows MVC fairly well, however some of the core components are not labeled as they would be in a strict MVC app.
#### Controllers
These are under the routes folder which doubles as the routes configuration. Index and Users handle all top level requests and beyond that all requests to auctions are passed to the auctions router. From there the requests are either handled or passed to Bids, Items, or Donations. These work as expected, the only difference being that Bids is passes to a special sub-router for auctions. Beyond this Items can also pass requests to the Bids controller which is specifically designed for Item requests.
#### Models
The models use Sequelize for their structure and consist of large JS objects that define the data, relations, and class and instance functions for the model. These work just the same as the rails models.
#### Views
The views run on ejs, the only difference here from rails is that the view is specifically rendered from the router and must be called with `res.render` or nothing will be returned to the user.
### Helpers
There are only a few helpers the but the most important is the permissions helper. This helper allows pages to check if the requesting user has access the route they are requesting. It returns an express router function and thus can be placed inline with the route. Currently they can only check if the given user has permission to a given auction or is a super user.
### Front end JS
There are s few custom front end js files that need some explanation.
#### Forms.js
The first is a file called Forms.js which does two very important tasks for the application. First, it makes sure that Polymer plays nice with HTML's built in form functionality by ensuring tags with id `submit` will submit the form they are a part of. The second is allowing forms to be submitted without refreshing the page. To validate the form server side, I didn't want there to be a refresh and rerender with the errors for the form. Instead I opted to use this handy little ajax script. Essentially it stops the form from being submitted and instead submits its data with ajax to the server. The server is then free to respond with a plain json object listing the next actions the form needs to take. This can redirect to a new location, or it can list some errors (which are displayed as alerts because I was lazy). This allows submission of forms without the pesky reload.
#### Admin.js
This was built as an extension to Forms.js also allows admins accessing `/users` to make a user an admin of a given auction with a simple click and again no refresh. It is less interesting yet important none the less.
