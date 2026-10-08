// Local development & standalone server launcher
require('dotenv').config();
const app = require('./api/index.js');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`RVCP Backend & Telemetry Server running on http://localhost:${PORT}`);
    console.log(`Dashboard accessible at http://localhost:${PORT}/dashboard`);
});
