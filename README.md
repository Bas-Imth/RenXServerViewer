# RenXServerViewer
You must update the IP in index.html (line 162) to be your webserver IP so it can make the data updates.  
In case you'd like to run it on Docker:  
(Linux)  
Open the terminal in this directory  
``docker build -t renxserverviewer .``  
``docker run -p 80:80 -d renxserverviewer``  
  
Then browse to ip-of-server:80



