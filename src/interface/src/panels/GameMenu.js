import React from 'react';
import { useStateController } from '../../../state/StateController';
import { MenuButton } from '../components/MenuButton';
// const panels = {
//   none: <></>,
//   startGame: <StartGamePanel />,
//   options: <OptionsPanel />,
//   about: <AboutPanel />
// };

export const GameMenu = () => {

  //const [currentPanel, setPanel] = useState('none');

  //const panel = panels[currentPanel];

  return ( <>
    <div className='menuPanel'>
      <MenuButton title="Exit to menu" onPress={() => {}}/>
    </div>
    {/* {panel} */}
  </>);
};