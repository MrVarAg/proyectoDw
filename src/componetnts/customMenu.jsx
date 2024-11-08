// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';  


const CustomMenu = ({ buttonLabel, menuItems, onMenuItemClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item) => {
    if (onMenuItemClick) onMenuItemClick(item);
    handleClose();
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {buttonLabel}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={() => handleMenuItemClick(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

CustomMenu.propTypes = {
  buttonLabel: PropTypes.string.isRequired,       
  menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,  
  onMenuItemClick: PropTypes.func,                
};

export default CustomMenu;
