const app = require('./app');
const { initializeDatabase } = require('./models');

const PORT = process.env.PORT || 3000;

initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is live at http://localhost:${PORT}`);
    });
});
