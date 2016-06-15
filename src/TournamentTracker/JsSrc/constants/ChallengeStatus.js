export const PENDING = 0;
export const ACCEPTED = 1;
export const DECLINED = 2;
export const COMPLETED = 3;

export function getNameFromStatus(status){
    switch (status){
        case PENDING:
        return 'Pending';
        case ACCEPTED:
        return 'Accepted';
        case DECLINED:
        return 'Declined';
        case COMPLETED:
        return 'Completed';
        default:
        return '';
    }
}