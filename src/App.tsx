import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {CommonInput} from "./component/common/Input/CommonInput";
import {CommonButton} from "./component/common/Button/CommonButton";
import {CommonCheckbox} from "./component/common/Checkbox/CommonCheckbox";

function App() {
    const [stateForAllInputs, setValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const [stateForAllCheckboxes, setChecked] = useState<boolean>(false)

    return (
    <div className="App">
     <CommonInput id={'hw4-super-input-like-old'}
                  value={stateForAllInputs}
                  onChange={(e) => setValue(e.currentTarget.value)}/>
      <CommonButton id={'hw4-super-button-default'} xType={'default'}>BUTTON</CommonButton>
      <CommonCheckbox id={'hw4-super-checkbox-with-text'}
                      checked={stateForAllCheckboxes}
                      onChangeChecked={setChecked}/>

    </div>
  );
}

export default App;
