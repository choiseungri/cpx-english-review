import {emptyState,exportJSON,importJSON} from './core.mjs';
export const STORAGE_KEY='cpx-practice-lab-v1';
export const STORAGE_NOTICE='기록은 이 브라우저에 저장됩니다. JSON으로 옮길 수 있습니다.';
export const STORAGE_FAILURE='브라우저 저장을 사용할 수 없습니다. 현재 기록은 메모리에 있습니다. 탭을 닫기 전에 JSON으로 내보내세요.';
const CORRUPT_NOTICE='저장된 기록을 읽을 수 없어 원본을 보존했습니다. 현재 연습은 메모리에 유지됩니다. 유효한 JSON을 가져오거나 현재 기록을 내보낼 수 있습니다.';
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
      catch { error='가져오기를 저장하지 못해 기존 기록을 유지했습니다. JSON 파일을 보관한 뒤 다시 시도해 주세요.'; return false; }
      state=candidate; error=null; status='ready'; writeProtected=false; recoveryText=null; return true;
    },
    export(){return exportJSON(state);},
    clear(confirmation) {
      if(confirmation!=='DELETE ALL LOCAL DATA') throw new Error('Explicit data deletion confirmation required');
      try { storage.removeItem(STORAGE_KEY); state=emptyState(); error=null; status='empty'; writeProtected=false; recoveryText=null; return true; }
      catch { error='브라우저 저장 삭제에 실패했습니다. 기록을 보존했습니다.'; return false; }
    }
  };
}
