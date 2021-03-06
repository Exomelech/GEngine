import React, { useState } from 'react';
import { useStateController } from '../../../state/StateController';
import { MenuButton } from '../components/MenuButton';
import { StartGamePanel } from './StartGamePanel';
import { OptionsPanel } from './OptionsPanel';
import { AboutPanel } from './AboutPanel';

const panels = {
  none: <></>,
  startGame: <StartGamePanel />,
  options: <OptionsPanel />,
  about: <AboutPanel />
};

export const MenuPanel = () => {

  const [currentPanel, setPanel] = useState('none');

  const panel = panels[currentPanel];

  return ( <>
    <div className='menuPanel'>
      <MenuButton title="Start game" onPress={() => { setPanel('startGame'); }}/>
      <MenuButton title="Options" onPress={() => { setPanel('options'); }}/>
      <MenuButton title="About" onPress={() => { setPanel('about'); }}/>
    </div>
    {panel}
  </>);
};