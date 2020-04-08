const express = require('express');
const config = require("config");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const RequestLog = require('./models/RequestLog');

app.use(cors());
app.use(express.json({ extended: true }));

const db = config.get('mongoUri');
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use(require('./routes/middleware/consoleLog.middleware'));
app.use(require('./routes/middleware/requestLog.middleware'));

app.use('/api/clearDB', require('./routes/api/clearDB.routes'));
app.use('/api/auth', require('./routes/api/auth.routes'));

app.use(require('./routes/middleware/auth.middleware'));

app.use('/api/user', require('./routes/api/user.routes'));
app.use('/api/truck', require('./routes/api/truck.routes'));
app.use('/api/load', require('./routes/api/load.routes'));

app.get('/api/allRequestLogs', async (req, res) => {
    try {
        const logs = await RequestLog.find({});
        res.status(200).send(logs);

    } catch (e) {
        res.status(500).json({ status: e.message });
    }
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
