import React from 'react';
import { useStateController } from 'State';
import { MenuButton } from '../components/MenuButton';
// const panels = {
//   none: <></>,
//   startGame: <StartGamePanel />,
//   options: <OptionsPanel />,
//   about: <AboutPanel />
// };

export const GameMenu = () => {

  const state = useStateController();
  //const [currentPanel, setPanel] = useState('none');

  //const panel = panels[currentPanel];

  return ( <>
    <div className='menuPanel'>
      <MenuButton title="Exit to menu" onPress={state.stopGame}/>
    </div>
    {/* {panel} */}
  </>);
};