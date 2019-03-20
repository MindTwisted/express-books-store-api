interface ControllerInterface {
    index(req: any, res: any, next: Function): void;
    show(req: any, res: any, next: Function): void;
    store(req: any, res: any, next: Function): void;
    update(req: any, res: any, next: Function): void;
    destroy(req: any, res: any, next: Function): void;
}

export default ControllerInterface;
