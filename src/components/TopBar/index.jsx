import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context';

function TopBar() {
  const { contextInfo, advancedFeatures, setAdvancedFeatures } = useContext(AppContext);

  const handleToggle = () => {
    setAdvancedFeatures(!advancedFeatures);
  };

  return (
    <AppBar position="absolute">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="inherit">
          Lê Ngọc An
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Typography variant="subtitle1" color="inherit">
            {contextInfo}
          </Typography>
          <Switch
            checked={advancedFeatures}
            onChange={handleToggle}
            color="default"
          />
          <Typography variant="caption" color="inherit">
            Enable Advanced Features
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
