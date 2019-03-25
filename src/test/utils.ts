export const countIntegersInArray = (array: any[]) => {
    return array.reduce((acc: number, curr: any): number => {
        if (Number.isInteger(curr)) {
            return ++acc;
        }

        return acc;
    }, 0);
};
