import {emptyState,exportJSON,importJSON} from './core.mjs';
export const STORAGE_KEY='cpx-practice-lab-en-review-v1';
export const STORAGE_NOTICE='Records are stored in this browser and can be transferred as JSON.';
export const STORAGE_FAILURE='Browser storage is unavailable. Current records are in memory. Export JSON before closing this tab.';
const CORRUPT_NOTICE='Stored records could not be read and the original data was preserved. Current practice remains in memory. Import valid JSON or export current records.';
export function createStore(storage) {
  let state=emptyState(),error=null,status='unloaded',writeProtected=false,recoveryText=null;
  const snapshot=()=>structuredClone(state);
  function load() {
    try {
      const raw=storage.getItem(STORAGE_KEY);
      if(raw!==null) {
        try { state=importJSON(raw); }
        catch { recoveryText=raw; writeProtected=true; status='corrupt'; error=CORRUPT_NOTICE; return snapshot(); }
      }
      writeProtected=false; recoveryText=null; error=null; status=raw===null?'empty':'ready';
    } catch {
      writeProtected=true; status='unavailable'; error=STORAGE_FAILURE;
    }
    return snapshot();
  }
  function update(candidate) {
    if(status==='unloaded') load();
    const next=importJSON(exportJSON(candidate));
    state=next;
    if(writeProtected) return false;
    try { storage.setItem(STORAGE_KEY,exportJSON(next)); error=null; status='ready'; return true; }
    catch { error=STORAGE_FAILURE; status='memory-only'; return false; }
  }
  return {
    get state(){return snapshot();},get error(){return error;},get status(){return status;},
    get canPersist(){return !writeProtected && status!=='unloaded';},
    get recoveryText(){return recoveryText;},load,update,
    seed(cases) {
      if(status==='unloaded') load();
      if(state.cases.length>0) return snapshot();
      update({...state,cases:structuredClone(cases)});
      return snapshot();
    },
    import(text) {
      // Validate first; commit memory only after the browser accepts the whole write.
      const candidate=importJSON(text);
      if(status==='unloaded') load();
      try { storage.setItem(STORAGE_KEY,exportJSON(candidate)); }
      catch { error='The import could not be saved, so existing records were retained. Keep the JSON file and try again.'; return false; }
      state=candidate; error=null; status='ready'; writeProtected=false; recoveryText=null; return true;
    },
    export(){return exportJSON(state);},
    clear(confirmation) {
      if(confirmation!=='DELETE ALL LOCAL DATA') throw new Error('Explicit data deletion confirmation required');
      try { storage.removeItem(STORAGE_KEY); state=emptyState(); error=null; status='empty'; writeProtected=false; recoveryText=null; return true; }
      catch { error='Could not clear browser storage. Records were preserved.'; return false; }
    }
  };
}
