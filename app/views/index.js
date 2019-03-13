'use strict';

module.exports = {
    generate(text, data, success = true) {
        const response = {
            status: success ? 'success' : 'failed',
            body: {}
        };

        if (text) {
            response.body.text = text;
        }

        if (data) {
            response.body.data = data;
        }

        return response;
    }
};