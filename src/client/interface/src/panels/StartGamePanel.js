import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { MenuButton } from '../components/MenuButton';
import { Panel } from '../components/Panel';
import { useStateController } from '../../../state/StateController';
import Select from 'react-select'

export const StartGamePanel = observer(() => {

  const state = useStateController();
  const maps = state.getMapsListForSelect();

  const onMapSelectChange = ({value}) => {
    state.updateMapSelect(value);
  };

  return (
    <Panel title='Start game'>
      <Select
        className='map_selector'
        options={maps}
        placeholder='Select map'
        onChange={onMapSelectChange}/>
      <MenuButton
        title='Start'
        fontSize={26}
        onPress={state.startGame}/>
    </Panel>
  );
});