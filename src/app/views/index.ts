'use strict';

export default {
    generate(text: string | null, data?: object | null, success = true) {
        const response: any = {
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