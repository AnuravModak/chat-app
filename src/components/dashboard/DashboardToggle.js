import React from 'react';
import { Button, Drawer, Icon } from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import Dashboard from './index';

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();
  const isMobile = useMediaQuery('(max-width:992px)');
  //this will return a boolean value if the screen size is less than 992 px or not
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
