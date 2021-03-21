import React from 'react';
import './style/index.scss';
import { observer } from 'mobx-react-lite';
import { MenuPanel } from './panels/Menu';
import { WaterMark } from './components/WaterMark';
import { GameMenu } from './panels/GameMenu';
import { useStateController } from 'State';

const panels = {
  menu: <>
    <MenuPanel />
    <WaterMark />
  </>,
  ingameMenu: <GameMenu />
};

export const App = observer(() => {

  const state = useStateController();

  const panel = panels[state.clientState];

  return (
    <>
      { panel }
    </>
  );

});