'use strict';

interface ControllerInterface {
    index(req: any, res: any, next: Function): any;
    show(req: any, res: any, next: Function): any;
    store(req: any, res: any, next: Function): any;
    update(req: any, res: any, next: Function): any;
    destroy(req: any, res: any, next: Function): any;
};

export default ControllerInterface;