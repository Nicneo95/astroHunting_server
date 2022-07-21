>Note: This is a bootcamp project that tests the understanding of concepts being taught as of 20 July 2022.
# astroHunting RESTful API 

## RESTful API using MongoDB and Express.js

This is a simple RESTful API project built using MongoDB and Express.js for , astroHunting. The frontend interface was created with React and the repository can be found [here](https://github.com/Nicneo95/astrohunting_client).

##  Context

This is a custom RESTful API built for [astroHunting]() project. The API has CRUD functions which is used to manage a collection of posts. The API is hosted on Heroku.

##  Document Design

The database has one collection that is being used by the API. The collection hold a list of posts and the API fully supports CRUD operations on the collection.

Each posts record has the following structure:
```
{
    "_id": "62c5af02cbdc9f98353126a7",
    "userName": "Ben",
    "imageUrl": "https://www.trivalleystargazers.org/gert/deepsky_foto/m33_opt.jpg",
    "description": "Last night sky was quite clear and bought my gear out.Big one shows Lagoon (M8) and small one shows trifid (M20) Nebula in the constellation Sagittarius. Lagoon is classified as an emission nebula and as an H II region. Trifid Nebula is an H II region in the north west of Sagittarius. It is a unusual combination of open clusters, an emission nebula with a red-yellow portion, a reflection nebula with blue portion and a dark nebula with the gaps in the appearance that cause the trifurcated appearance. Lagoon nebula is estimated about 4000-6000 light years from earth. Trifid is centered about 4100 light years from earth.",
    "typeOfAstrography": "deep sky",
    "equipment": {
      "camera": "Nikon D5300",
      "mount": "Orion 9822 AstroView Equatorial",
      "telescope": "AstroMaster 76EQ Newtonian Telescope"
    },
    "processingData": [
      "Lightroom",
      "Photoshop"
    ],
    "calibrationFrame": [
      "Dark",
      "Flat"
    ],
    "location": {
      "latitude": "1.290270",
      "longitude": "103.851959"
    },
    "dateTime": "2022-07-06T13:09:28.081Z",
    "comment": [
        {
            "_id": "623bdaeb66f3c35a312c2ff6",
            "comment": “Great shot!”,
            "date_of_comment": "2022-09-06T13:09:28.081Z"
        }
    ]
  }

```

## Endpoints

### Get the list of posts record
#### Request
```
GET /getPosts
```
#### Response
Returns an array of all the posts records in the database.

Sample output:
```
[   
    {...},
    {
    "_id": "62c5af02cbdc9f98353126a7",
    "userName": "Ben",
    "imageUrl": "https://www.trivalleystargazers.org/gert/deepsky_foto/m33_opt.jpg",
    "description": "Last night sky was quite clear and bought my gear out.Big one shows Lagoon (M8) and small one shows trifid (M20) Nebula in the constellation Sagittarius. Lagoon is classified as an emission nebula and as an H II region. Trifid Nebula is an H II region in the north west of Sagittarius. It is a unusual combination of open clusters, an emission nebula with a red-yellow portion, a reflection nebula with blue portion and a dark nebula with the gaps in the appearance that cause the trifurcated appearance. Lagoon nebula is estimated about 4000-6000 light years from earth. Trifid is centered about 4100 light years from earth.",
    "typeOfAstrography": "deep sky",
    "equipment": {
      "camera": "Nikon D5300",
      "mount": "Orion 9822 AstroView Equatorial",
      "telescope": "AstroMaster 76EQ Newtonian Telescope"
    },
    "processingData": [
      "Lightroom",
      "Photoshop"
    ],
    "calibrationFrame": [
      "Dark",
      "Flat"
    ],
    "location": {
      "latitude": "1.290270",
      "longitude": "103.851959"
    },
    "dateTime": "2022-07-06T13:09:28.081Z",
    "comment": [
        {
            "_id": "623bdaeb66f3c35a312c2ff6",
            "comment": “Great shot!”,
            "date_of_comment": "2022-09-06T13:09:28.081Z"
        }
    ]
  },
  {…},
  {…},
]
```

### Get the list of posts records based on search queries
#### Request
```
GET /search
```
#### Response
Returns an array of all the posts records which matches the search queries.

### Create a new posts
#### Request
```
POST /createPosts
```
Sample body:
```
{
    "_id": "62c5af02cbdc9f98353126a7",
    "userName": "Ben",
    "imageUrl": "https://www.trivalleystargazers.org/gert/deepsky_foto/m33_opt.jpg",
    "description": "Last night sky was quite clear and bought my gear out.Big one shows Lagoon (M8) and small one shows trifid (M20) Nebula in the constellation Sagittarius. Lagoon is classified as an emission nebula and as an H II region. Trifid Nebula is an H II region in the north west of Sagittarius. It is a unusual combination of open clusters, an emission nebula with a red-yellow portion, a reflection nebula with blue portion and a dark nebula with the gaps in the appearance that cause the trifurcated appearance. Lagoon nebula is estimated about 4000-6000 light years from earth. Trifid is centered about 4100 light years from earth.",
    "typeOfAstrography": "deep sky",
    "equipment": {
      "camera": "Nikon D5300",
      "mount": "Orion 9822 AstroView Equatorial",
      "telescope": "AstroMaster 76EQ Newtonian Telescope"
    },
    "processingData": [
      "Lightroom",
      "Photoshop"
    ],
    "calibrationFrame": [
      "Dark",
      "Flat"
    ],
    "location": {
      "latitude": "1.290270",
      "longitude": "103.851959"
    },
    "dateTime": "2022-07-06T13:09:28.081Z",
    "comment": [
        {
            "_id": "623bdaeb66f3c35a312c2ff6",
            "comment": “Great shot!”,
            "date_of_comment": "2022-09-06T13:09:28.081Z"
        }
    ]
  }
```
#### Response
```
New posts added
```

### Edit posts records based on ID of posts
#### Request
```
PUT /updatePosts/:_id
```
Sample body:
```
{
    "_id": "62c5af02cbdc9f98353126a7",
    "userName": “John,
    "imageUrl": "https://www.trivalleystargazers.org/gert/deepsky_foto/m33_opt.jpg",
    "description": "Last night sky was quite clear and bought my gear out.Big one shows Lagoon (M8) and small one shows trifid (M20) Nebula in the constellation Sagittarius. Lagoon is classified as an emission nebula and as an H II region. Trifid Nebula is an H II region in the north west of Sagittarius. It is a unusual combination of open clusters, an emission nebula with a red-yellow portion, a reflection nebula with blue portion and a dark nebula with the gaps in the appearance that cause the trifurcated appearance. Lagoon nebula is estimated about 4000-6000 light years from earth. Trifid is centered about 4100 light years from earth.",
    "typeOfAstrography": "deep sky",
    "equipment": {
      "camera": "Nikon D5300",
      "mount": "Orion 9822 AstroView Equatorial",
      "telescope": "AstroMaster 76EQ Newtonian Telescope"
    },
    "processingData": [
      "Lightroom",
      "Photoshop"
    ],
    "calibrationFrame": [
      “Light,
      "Flat"
    ],
    "location": {
      "latitude": "1.290270",
      "longitude": "103.851959"
    },
    "dateTime": "2022-07-06T13:09:28.081Z",
    "comment": [
        {
            "_id": "623bdaeb66f3c35a312c2ff6",
            "comment": “Great shot!”,
            "date_of_comment": "2022-09-06T13:09:28.081Z"
        }
    ]
  }
```
### Delete post
#### Request
```
DELETE /deletePosts/:_id
```
#### Response
```
Deleted
```
## Technologies Used
- HTML5
- CSS3
- JavaScript
- Express 
- Mongodb
- yup

## Acknowledgements

- Backend schema validation with yup and Express.js guide from [PedroTech](https://www.youtube.com/watch?v=KwrJSwWhIDI).

- YouTube and Stack Overflow community for guidance on various issues faced.

