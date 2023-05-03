import { useDispatch, useSelector } from "react-redux";
import AuthStore from 'stores/auth';
import CommonDialogStore from 'stores/commonDialog';

export function useCommonDialog() {
  const dispatch = useDispatch();
  
  function showDialog({ title, content }: any) {    
    dispatch(CommonDialogStore.actions.setOpen({ open: true, title, content }));
  }
  
  function showError(err: any) {
    const title = "Error";
    const content = (typeof err == 'object') ? err.message : `${err}`;
    dispatch(CommonDialogStore.actions.setOpen({ open: true, title, content }));
  }

  function hideDialog() {    
    dispatch(CommonDialogStore.actions.setOpen({ open: false }));
  }
  
  return { showDialog, showError, hideDialog };
}

export function useAuth() {
  const { isAuthenticated } = useSelector((state: any) => state.auth );
  const dispatch = useDispatch();
  
  function setAuthenticated(authenticated: boolean) {    
    dispatch(AuthStore.actions.setAuthenticated(authenticated));
  }

  return { isAuthenticated, setAuthenticated };
}
