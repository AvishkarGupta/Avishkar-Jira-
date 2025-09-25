import dotenv from 'dotenv'
import connecDB from './db/index.js'
import app from './app.js'


dotenv.config({ path: './.env' })

connecDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
      console.log(`😊App is listening at ${process.env.PORT}`)
    })
})
.catch((error)=>{
  console.log("Something went wrong while conecting with DB", error)
})