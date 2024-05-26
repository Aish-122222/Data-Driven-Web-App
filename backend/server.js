// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();

app.use(cors('*'));

const uploadDir = 'uploads';

const PORT = 5001;


// Multer setup for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, 'user_data' + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    const csvFilePath = path.join(uploadDir, req.file.filename);
    const jsonFilePath = path.join(uploadDir, 'user_data.json');
    const csvData = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            csvData.push(row);
        })
        .on('end', () => {
            fs.writeFileSync(jsonFilePath, JSON.stringify(csvData, null, 2));
            res.send('File uploaded and data saved as JSON successfully');
        });
});

// Endpoint to return paginated results from JSON
app.get('/data', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const jsonFilePath = path.join(uploadDir, 'user_data.json');

    fs.readFile(jsonFilePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading JSON file');
        }

        const csvData = JSON.parse(data);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const resultData = csvData.slice(startIndex, endIndex);

        res.json({
            page: page,
            limit: limit,
            totalRows: csvData.length,
            data: resultData,
            totalRows: csvData.length,
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
