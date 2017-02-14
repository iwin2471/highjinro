# highjinro_backend
KOREA UNIVERSITY hackaton

## API request url hacka.iwin247.kr

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
    
    gender : user gender
    

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
    
* GET /auth/fb/token : facebook auth

> Params

    access_token : user facebook access_token [String]
    
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
    
* GET /user/{token}/fb/token : facebook Peristalsis to user

> Params

    token : user token [String]
    
    access_token : user facebook token [String]

> Response

    HTTP 200 : send user

    HTTP 404 : User not found
    
    HTTP 500 : DB err
    
 * GET /schools : school

> Response

    HTTP 200 : send schools

    HTTP 404 : school not found
    
       
* GET /schools/:name : school find

> Params

    name : school name [String]
    
> Response

    HTTP 200 : send school

    HTTP 404 : school not found
    
* GET /schools/tag : tag

> Params

    name : school name [String]
    
> Response

    HTTP 200 : send school

    HTTP 404 : school not found
    
    
## Database Schema

### User

> id : User's id [String required unique]

> facebook_id : user facebook id [String]

> pw : User's Password [String required]

> token : User token [String]

> interest_field : User interest field

> interest_school : user interest school

### School

> code : school_code [String]

> name : school_name [String]

> tag : 국공사립 [String]

> pathways: 진학률 [Number]

> employment: 취업률 [Number]

> class : 학교분류 [String]

> location_x 

> location_y

> coeducation 공학여부


### schooltags

> tag : 학교태그 [String]

> schools : schools [String array]
