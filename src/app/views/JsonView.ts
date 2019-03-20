import ViewInterface from '@interfaces/ViewInterface';

class JsonView implements ViewInterface {
    public render(res: any, payload: { code: number; text?: string; data?: any }): void {
        const { code, text, data } = payload;
        const response: any = {
            status: code === 200 ? 'success' : 'failed',
            body: {},
        };

        if (text) {
            response.body.text = text;
        }

        if (data) {
            response.body.data = data;
        }

        res.status(code).send(response);
    }
}

export default new JsonView();
