import express from "express"

const app = express()

const port = process.env.port || 4000

const login = [
  {name: "Avishkar Gupta",
   email: "avi@gmail.com",
   password: "123",
   category: "empolyee"
  },
  {name: "Avishkar Gupta",
   email: "avi.admin@gmail.com",
   password: "123",
   category: "admin"
  },
  {name: "Prachi Singh",
   email: "prachi@gmail.com",
   password: "123",
   category: "empolyee"
  },
  {name: "Prachi Singh",
   email: "prachi.amin@gmail.com",
   password: "123",
   category: "admin"
  }
]

 app.use(express.json()); 

// app.get("/api/login-data", (req, res)=>{
//   res.send(login)
// })
app.post("/api/login", (req, res)=>{
  
  const {email, password} = req.body
  
  const user = login.find(u => u.email === email);

  if (!user) {
    return res.status(200).send("Invalid user and password");
  }

  if (user.password !== password) {
    return res.status(200).send("Invalid user and password");
  }

  // success
  console.log(email, password)
  return res.status(200).json(user);

})

app.listen(port, ()=>{
  console.log("App is listening at port", port)
})