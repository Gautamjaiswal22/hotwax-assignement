const app = require('./app');
const db = require('./config/db');
const port = 5000;

app.get('/', (req, res) => {
    res.send("HELLO HOTWAX");
});
app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`);
});