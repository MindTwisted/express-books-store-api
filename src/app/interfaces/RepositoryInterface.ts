interface RepositoryInterface {
    findAll(data: any): Promise<any>;
    findOne(data: any): Promise<any>;
    create(data: any): Promise<any>;
    update(data: any): Promise<any>;
    delete(data: any): Promise<any>;
};

export default RepositoryInterface;