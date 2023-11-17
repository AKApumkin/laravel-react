# Laravel/React Test

## install
### Laravel
Laravel needs to be setup first, install the folders `app`, `database` and `routes` into a fresh Laravel installation then run the migration command

---
`php artisan migrate:fresh --seed`
---

To make sure the app is running you can navigate to http://localhost/api/agents , you should see an JSON object of agents


### React
Navigate to the frontend folder then run the command 
`npm install`, this should grab the package dependencies.

Then run `npm start` this should start on port 3000

