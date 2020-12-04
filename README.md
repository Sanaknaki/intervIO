# <img src="https://i.imgur.com/yTrRr5F.png" height="35" />

🚀 &nbsp;The simple job application tracker!<br/>
⌨️ &nbsp;Built using React, GraphQL, Prisma!<br/>
🖌 &nbsp;Designed using Sketch!

*&nbsp;I wanted to build something cool using GraphQL and thought of the hassle of maintaining the status of all the applications people send out when applying for jobs, hence IntervIO was born! A simple platform to allow users to track their applications in simple-to-understand steps!*

## Installation / Launching Locally

💻 &nbsp;After downloading the project, open the folder in your terminal and do the following in 2 separate windows :

```javascript
/* from intervIO-master dir */
"cd server/"
"npm i"                                  // Install node modules for backend
"npx prisma migrate save --experimental" // Saving the prisma DB schema, since it's your first save 
                                         // you have to give the migration a name (I use 'init')
"npx prisma migrate up --experimenal" 
"npx prisma generate"                    // Generate new DB migration
"node src/index.js"                      // Start the database (runs on port 4000)
```

```javascript
/* from intervIO-master dir */
"npm i"                                  // Install node modules for fronten
"cd src/"
"npm start"                              // Run frontend (runs on port 3000)
```

## Screenshots
<p align="center">⚡️ Register / Sign in with an account!</p>
<span align="center">
  <img src="https://i.imgur.com/xwK9aYa.png" width="100%"/>
</span>
<br/>
<hr/>

<p align="center">⚡️ Easily add an application with 3 simple fields!</p>
<span align="center">
  <img src="https://i.imgur.com/GL1OkOn.png" width="100%"/>
</span>
<br/>
<hr/>

<p align="center">⚡️ View your applications in their respected status!</p>
<span align="center">
  <img src="https://i.imgur.com/eA0WToq.png" width="100%"/>
</span>
<br/>
<hr/>

<p align="center">⚡️ Change application status with simple buttons!</p>
<span align="center">
  <img src="https://i.imgur.com/rQBQb4p.png" width="100%"/>
</span>
<br/>
<hr/>

<p align="center">⚡️ View number of interviews per application!</p>
<span align="center">
  <img src="https://i.imgur.com/AbGVU2v.png" width="100%"/>
</span>
<br/>
<hr/>

<p align="center">⚡️ Mobile friendly!</p>
<p align="center">
  <img src="https://i.imgur.com/tbFUpwI.png" width="50%"/>
</p>
