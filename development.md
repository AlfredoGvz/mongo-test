1- Fetching data from refuge api
Using axios we fetch information about toilets from refuge api.
We then store that information in JSON files to have the data we need to create our documents in our collections.
Because I am using fs.writeFile(), which is going to override anything previusly stored in the JSON files on our side,
if the data from refuge api is updated in any shape or form, it is going to be reflected in our JSON files updating our files
with the latest updates on refuge api.

Tools needed

- axios -> npm install axios
- fs promises

2- Schemas and models
Built up the layouts and how out documents are going to look like e.g. data type: numbers, booleans, strings.
Built the models (schemas in actual use) using the fetched data from refuge that we stored in the JSON files.

Tools needed

- mongoose library -> npm install mongoose --save

Summary of tools
npm install axios
npm install mongoose --save
npm install mongodb

3- Using node-schedule -> Handy to automate tasks, but script will run in the foreground by default.
This means that it will run in the terminal where you start it and as soon as that terminal session is closed,
the scheduled process will terminate as well. For this to be avoided, we need a process manager.
The one I am using is pm2 -> npm install pm2 -g
pm2 start your_script.js -> this will start the script and keep it as a background process
If te terminal is killed and the process ends, the script will be still running in the background
To stop the process from running: pm2 delete your_script_name

Summary of tools
npm install node-schedule
npm install pm2 -g
