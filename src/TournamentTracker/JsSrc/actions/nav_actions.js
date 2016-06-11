export const NAVIGATE = 'NAVIGATE'

export function routerDidNavigate(path){
    return {
        type: NAVIGATE,
        path: path
    }
}