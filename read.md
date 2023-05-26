clone the repo first from github
from your terminal run 
- git clone paste the github link
that should compy the repo
if you are using docker desktop please start it first
make sure you are in the root directory and run
- docker-compose up --build
that should run all the docker file and start the dev server

## just incase in error occars go to each folder(client, server)
 - run yarn
that will install all the dependencies and then run 
 - yarn start:dev #from server directory, that will start the backend
 - now open another terminal and navigate to client
 - yarn dev #from client directory, that will start the client server

now go to your browser and type localhost:5137 you should see the vue UI.

client: the client app usign vuejs, with typescript. to see all the charts give some time to load the api then select a choose date, from date input, and select an end date, you should see the bar chart in the UI. you can see a select option to choose 1 or multiple products that will reflect the stock line chart. there are one clear button as well to clear the selected product.

backend: in the backend i've used nestjs, with mongodb. that's serving the products from atlas cloud, I keept the env so you don't have to create any.

