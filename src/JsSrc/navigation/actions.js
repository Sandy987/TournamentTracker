export const NAVIGATE = 'navigation/NAVIGATE';
export const OPENMENU = 'navigation/OPENMENU';
export const CLOSEMENU = 'navigation/CLOSEMENU';

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