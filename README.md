
# Education-Management-Backend-ExpressJS-MongoDB

A brief description of what this project does and who it's for


![Logo](https://atiqlab.bigosofts.com/wp-content/uploads/2024/08/madrasa.png)


## Deployment

To deploy this project run the following command:

```bash
  git clone https://github.com/bigosofts/Education-Management-Backend-ExpressJS-MongoDB.git
```

```bash
  cd Education-Management-Backend-ExpressJS-MongoDB
```

```bash
  yarn install
```

```bash
  yarn start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`RUNNING_PORT`
`DATABASE_USERNAME`
`DATABASE_PASSWORD`
`DATABASE_NAME`
`SECRETKEY_JWT_WEBTOKEN`
`FRONTEND`
`BACKEND`
`CLIENT_ID`
`CLIENT_SECRET`
`REDIRECT_URI`
`REFRESH_TOKEN`
`CLOUD_NAME`
`CLOUDINARY_API_KEY`
`CLOUDINARY_API_SECRET`

Here frontend means the link of the frontend website. 
Backend is the link of the Backend website. 
Client id for google mail,
Clientecret, redirect uri and refresh token will be used in google mail.
Cloud name is for cloudinary name, you need cloudinary api key and secret. 




## Authors

- [@Abdullah Al Amin](https://github.com/bigosofts)


## Demo

Browse this link to see backend API in action:

https://api.internetmadrasa.com/
## API Reference

#### Get all items

```http
  POST https://api.internetmadrasa.com/apis/v1/select-somthing
```

| Parameter(body) | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `query` | `object` | **Required** |
| `projection` | `object` | **Required**|

#### Get all items in api/v2

```http
  GET https://api.internetmadrasa.com/apis/v2/select-somthing/${pageNo}/${perPage}/${query}
```


#### Create item
```http
  POST https://api.internetmadrasa.com/apis/v1/create-something
```

| Parameter(header) | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `access_token`      | `string` | **Required**|

| Parameter(body) | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `post_body`      | `object` | **Required**|


#### Update item
```http
  PUT https://api.internetmadrasa.com/apis/v1/update-something
```

| Parameter(header) | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `access_token`      | `string` | **Required**|

| Parameter(body) | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `post_body`      | `object` | **Required**|


#### Delete item
```http
  DELETE https://api.internetmadrasa.com/apis/v1/delete-something/${id}
```

| Parameter(header) | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `access_token`      | `string` | **Required**|







## Features

- Backend is seperated. ExpressJS is running on specific port
- Deployed in vercel (Official NextJS Creator)
- Well Organized Schema
- Two version of the api, One is simple , second is with pagination and search
- Google mail api
- Google drive api
- Cloudinary api
- MongoDB database
- Efficient query
- CREATE, READ, UPDATE and DELETE Api,
- GET, POST, PUT and DELETE method
- Authentication using JWT
- Password encryption
- Check user permission



## Support

For support, email bigosofts@gmail.com or contact me on Facebook or LinkedIn. You will find social media link in my github profile


## FAQ

#### How to use this backened api project in my pc?

Download the source code. Make some command that I put it in earlier sections and launch the project. You may need to edit in .env file.

#### Do you provide demo database for this project?

yes, if someone need it, Just knock at me. I will provide you the demo database for running the complete app

#### How Long this project was taken?

To come to this point, It takes 3 months already and still updating the source file is ongoing.

#### Where is the Frontend?

Frontend is also in my github repository. Search for Education Management Redux React NextJS for the Frontend of this project


## Tech Stack

**Backend:** NodeJS, ExpressJS, Mongoose, JWT, Bycrypt

**Deployment:** Vercel Serverless. On Production for 6 months
