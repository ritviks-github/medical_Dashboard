const express = require('express');
const app = express();
const cors = require('cors');
require('./dbConnect');


app.use(express.json())
app.use(cors());

app.use('/api',require('./routes/signup'));
app.use('/api',require('./routes/login'));
app.use('/api',require('./routes/getPatients'));
app.use('/api',require('./routes/submitReport'));
app.use('/api',require('./routes/getReports'));
app.use('/api',require('./routes/search'));
app.use('/api',require('./routes/admin'));





const port = 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})