export const PENDING = 0;
export const ACCEPTED = 1;
export const COMPLETED = 2;

export function getNameFromStatus(status){
    switch (status){
        case PENDING:
        return 'Pending';
        case ACCEPTED:
        return 'Accepted';
        case COMPLETED:
        return 'Completed';
        default:
        return '';
    }
}