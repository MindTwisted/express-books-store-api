import JsonResponseType from '@typings/JsonResponseType';

export default {
    generate(text: string | null, data?: object | null, success = true): JsonResponseType {
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