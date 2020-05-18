export {};

import express from "express";
import config from "config";
import path from "path";
import cors from "cors";

const app = express();

app.use(cors());


// app.use(express.json({ extended: true }));

app.use('/api', require('./routes/api.routes'));

// Node to serve static files
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req: express.Request, res: express.Response) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = config.get('port') || 5000;

async function start() {
    try {
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    } catch (e) {
        console.error('Server Error', e.message);
        process.exit(1);
    }
}

start();
