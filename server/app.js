const express = require('express');
const cors = require('cors');
require('./db/mongoConn')
let app =express()
const videoRouter =require('./routes/videoRoute')
const PORT = process.env.PORT||3000
app.use(cors())
app.use(express.json())
app.use('/assets', express.static('assets'))
app.use('/videos',videoRouter);

app.listen(PORT,()=>{
    console.log(`Listening to port number ${PORT}`);
})

