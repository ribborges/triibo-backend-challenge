import app from '#root/server.js';

import { port } from '#root/config/env.js';

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});