import { useState, useEffect } from 'react';
import { Grid, Divider } from '@mui/material';
import { VuiBox, VuiButton, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import SystemList from 'components/SystemList';
import { useAuth } from 'utils';
import { hasWallet, useTcContracts}  from 'utils/tc';

export default function Trade() {
  const [account, setAccount] = useState<string>('');
  const [systems, setSystems] = useState<any[]>([]);
  const { isAuthenticated } = useAuth();
  const { checkConnect, getAccounts, fetchSystem, fetchSystems, createSystem } = useTcContracts();
    
  useEffect(() => {
    async function init() {
      await loadAccount();
    }
    init();
  }, [isAuthenticated]);
  
  useEffect(() => {
    if (account)  loadTradingSystems();
  }, [account]);
  
  async function loadAccount() {    
    if (!hasWallet())  return;
    
    try {
      const accounts = await getAccounts();
      setAccount(accounts[0]);
    }
    catch(err) {
      console.log(err);
    }
  }
  
  async function loadTradingSystems() {
    if (!account)  return;

    const newSystems = await fetchSystems(account);
    setSystems(systems => newSystems);
  }

  async function createTradingSystem() {
    const tx = await createSystem();
    console.log(tx);
    
    // setSystems(systems => [...systems, system]);
  }
  
  return (
    <div id="trade">   
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Section                    
            body = {
              <VuiBox display="flex" alignItems="center" justifyContent="center">                
                <VuiButton variant="contained" color="info" onClick={createTradingSystem}>
                  START FUND
                </VuiButton>
              </VuiBox>
            }
            minHeight = "50px"
          />
        </Grid>
      </Grid>                                
      <Divider />
      
      <SystemList systems={systems} />
    </div>
  );
}
