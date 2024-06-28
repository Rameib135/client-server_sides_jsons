const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// Route to handle dynamic profile data and images
app.get('/data/:folderName', async (req, res) => {
    const folderName = req.params.folderName;
    const folderPath = path.join(__dirname, 'private', folderName);

    try {
        const files = await fs.readdir(folderPath);
        const data = {
            images: {},
            bio: '',
            endorsements: [],
            friends: []
        };

        for (let file of files) {
            const filePath = path.join(folderPath, file);
            if (file.endsWith('.png') || file.endsWith('.jpg')) {
                data.images[file] = `/${folderName}/${file}`;
            } else if (file === 'bio.txt') {
                data.bio = await fs.readFile(filePath, 'utf8');
            } else if (file.startsWith('text') && file.endsWith('.txt')) {
                const content = await fs.readFile(filePath, 'utf8');
                data.endorsements.push(content);
            } else if (file === 'friends.json') {
                data.friends = JSON.parse(await fs.readFile(filePath, 'utf8'));
            }
        }

        res.json(data);
    } catch (err) {
        console.error('Error reading directory:', err);
        res.status(500).send('Error reading directory');
    }
});

const port = 3020;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
