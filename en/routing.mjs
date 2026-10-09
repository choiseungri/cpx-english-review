export const VIEWS=Object.freeze(['project','practice','review','editor','about']);
export function viewFromHash(hash=''){const name=hash.replace(/^#\/?/,'').split(/[?&]/)[0];return VIEWS.includes(name)?name:'project'}
export function hashForView(view){return '#'+(VIEWS.includes(view)?view:'project')}
