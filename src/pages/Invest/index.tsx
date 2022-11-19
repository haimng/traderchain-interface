import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import { VuiBox, VuiButton, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import SystemList from 'components/SystemList';
import { useAuth } from 'utils';
import { useTcContracts } from 'utils/tc';

export default function Invest() {
  const [systems, setSystems] = useState<any[]>([]);
  const { isAuthenticated } = useAuth();
  const { getAccounts, fetchAllSystems, fetchSystems, fetchSystem } = useTcContracts();
  
  useEffect(() => {
    async function init() {
      await fetchTradingSystems();
    }
    init();
  }, [isAuthenticated]);
    
  async function fetchTradingSystems() {    
    const newSystems = await fetchAllSystems();
    setSystems(systems => newSystems);
  }
    
  return (
    <div id="invest">      
      <SystemList systems={systems} />
    </div>
  );
}
