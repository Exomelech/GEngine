import React from 'react';
import './style/index.scss';
import { observer } from 'mobx-react-lite';
import { MenuPanel } from './panels/Menu';
import { WaterMark } from './components/WaterMark';
import { GameMenu } from './panels/GameMenu';
import { useStateController } from '@C/state/StateController';

const panels = {
  menu: <>
    <MenuPanel />
    <WaterMark />
  </>,
  ingameMenu: <GameMenu />
};

export const App = observer(() => {

  const {clientState} = useStateController();

  const panel = panels[clientState];

  return (
    <>
      { panel }
    </>
  );

});