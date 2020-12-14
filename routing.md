create 
GET /users/new  /users/create --- create
POST /users


Query opertaion

GET /users
GET /users/:id

Update opertaion

GET /users/:id/edit
PUT/PATCH /users/:id

Delete

DELETE /users/:id

PUT /users/:id/follow

PUT /articles/:id/likes



### Associations

#### Embedding

```js 
var articleSchema = {
  title: String,
  decripton: String,
  ...,
  comments: [
    {
      text: String,
      author: String
    }
  ]
} 
```

#### Referencing

```js
var articleSchema = new Schema({
  
})

var commentSchema = new Schema({
  text: String,
  author: String,
  articleId: Schema.Types.ObjectId
}, { timestamps: true })
```

#### Types Of association

1. One to one association => user <> identity
2. One to many -> user <> articles , articles <> comments , user <> comment
3. many to many -> articles <> tags








