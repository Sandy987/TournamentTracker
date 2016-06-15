export const NAVIGATE = 'NAVIGATE';
export const OPENMENU = 'OPENMENU';
export const CLOSEMENU = 'CLOSEMENU';

export function routerDidNavigate(path){
    return {
        type: NAVIGATE,
        path: path
    }
}

export function routerOpenMenu(){
    return {
        type: OPENMENU
    }
}

export function routerCloseMenu(){
    return {
        type: CLOSEMENU
    }
}