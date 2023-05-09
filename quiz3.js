const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')

app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)

    let result = login(req.body.username, req.body.password)

    // let Token = generateToken(result)
    // res.send(Token)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/bye', verifyToken, (req, res) => {
    res.send('Bubyeee Semua!')
})

app.post('/register', (req, res) => {
  res.send('Account Created.')
})

app.post('/register', (req, res) => {
  let result = register(
    req.body.username, 
    req.body.password, 
    req.body.name, 
    req.body.email
    )
    res.send(Result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let dbUsers = [
  {
    username: "Amsyar",
    password: "1234",
    name: "Alif",
    email: "Amsyar@utem.edu.my"
  }
]

  async function login(requsername, reqpassword) {
    // let matchUser = dbUsers.find(
    //     user => user.username == username      //=> what to do with user
    // )
     let matchUser = await client.db('benr2434')
        .collection('users')
        .findOne({username:{ $eq: requsername} })

    console.log(matchUser)
    
    if (!matchUser) return "User not found!"
    if (matchUser.password == reqpassword) 
    {
        return matchUser
    } else
    {
        return "Invalid password"
    }
    }

// function register(requsername, reqpassword, reqname, reqemail) {
//   dbUsers.push({
//       username: requsername,
//       password: reqpassword,
//       name: reqname,
//       email: reqemail
//   })
// }

function register(requsername, reqpassword, reqname, reqemail) {
  client.db('benr2434').collection('users').insertOne({
      username: requsername,
      password: reqpassword,
      name: reqname,
      email: reqemail
  })
}

function generateToken(userData)
{
  const Token = jwt.sign
  (
    userData,
    'inipassword',
    {expiresIn: 60}
  );
  return Token
}

function verifyToken (req,res,next){
  let header = req.headers.authorization
  console.log (header)

  let Token = header.split('')[1]

  jwt.verify(Token, 'inipassword',function(err,decoded){
    if(err){
      res.send("Invalid Token")
    }
    req.user = decoded
    next()
  });
}


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://AlifAmsyar:Amsyarsusi1112!@amsyar.slnbl2c.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect().then(res => {
  console.log(res)
})