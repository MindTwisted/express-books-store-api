export default {
    serialize(errors: any) {
        const serializedErrors: any = {};
    
        errors.map((item: any) => {
            const fieldName = item.path;
            const validationMessage = item.message;
    
            if (!serializedErrors[fieldName]) {
                serializedErrors[fieldName] = [];
            }
    
            serializedErrors[fieldName].push(validationMessage);
        });
    
        return serializedErrors;
    }
};