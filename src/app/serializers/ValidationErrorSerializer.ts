import SerializerInterface from '@interfaces/SerializerInterface';

class ValidationErrorSerializer implements SerializerInterface {
    public serialize(data: any): any {
        const serializedErrors: any = {};

        data.map((item: any) => {
            const fieldName = item.path;
            const validationMessage = item.message;

            if (!serializedErrors[fieldName]) {
                serializedErrors[fieldName] = [];
            }

            serializedErrors[fieldName].push(validationMessage);
        });

        return serializedErrors;
    }
}

export default new ValidationErrorSerializer();
