# highjinro_backend
KOREA UNIVERSITY hackaton

## API Document

* Common Response
  HTTP 200: Success

  HTTP 400: Params Missing

  HTTP 401: Bad Request

  HTTP 404: not found

  HTTP 500: DB error

* POST /auth/signup : User register

> Params

    id : User's ID [String]

    passwd : User's   Password [String]
    
    name : User name
    
    interest_field : User school interest
    
    interest_school : User interest_school
    
    file : image file
    

> Response

    HTTP 200 : send User

    HTTP 400 : Param missing
    
* POST /auth/signin : User login

> Params

    id : User's ID [String]

    passwd : User's  Password [String]

> Response

    HTTP 200 : send User

    HTTP 400 : Param missing
    
    HTTP 412 : incorrect id or password
    
    HTTP 500 : DB err
    
* GET /auth/auto/{token} : Auto Login

> Params

    token : token [String]

> Response

    HTTP 200 : UserID and token

    HTTP 404 : User not found
    
    HTTP 500 : DB err
    
    
* GET /user/{token} : Auto Login

> Params

    token : token [String]

> Response

    HTTP 200 : send user

    HTTP 404 : User not found
    
    HTTP 500 : DB err
    
## Database Schema

### User

> id : User's id [String required unique]

> pw : User's Password [String required]

> token : User token [String]

> interest_field : User interest field

### School

> code : school_code [String]

> name : school_name [String]

> tag : 국공사립 [String]

> pathways: 진학률 [Number]

> employment: 취업률 [Number]

> class : 학교분류 [String]

> location_x 

> location_y

> coeducati 공학여부


### schooltags

> tag : 학교태그 [String]

> schools : schools [String array]
