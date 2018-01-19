const DriversController = require('../controllers/drivers_controller');

module.exports = (server) => {
    server.get('/api', DriversController.greeting);
};