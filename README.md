# RenXServerViewer
In case you'd like to run it on Docker:  
(Linux)  
Open the terminal in this directory  
``docker build -t renxserverviewer .``  
``docker run -p 80:80 -d renxserverviewer``  
  
Then browse to ip-of-server:80  
  
Alternatively:  
``docker-compose -f "docker-compose.yml" up -d --build``  
To use the docker-compose file included in this git.

