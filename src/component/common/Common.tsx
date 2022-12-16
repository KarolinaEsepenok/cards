import React, {useState} from 'react';
import {CommonInput} from "./Input/CommonInput";
import {CommonButton} from "./Button/CommonButton";
import {CommonCheckbox} from "./Checkbox/CommonCheckbox";

const Common = () => {
    const [stateForAllInputs, setValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const [stateForAllCheckboxes, setChecked] = useState<boolean>(false)
    return (
        <div>
            <CommonInput id={'hw4-super-input-like-old'}
                         value={stateForAllInputs}
                         onChange={(e) => setValue(e.currentTarget.value)}/>
            {/*инпут с ошибкой:*/}
            <div>
                <CommonInput
                    id={'hw4-super-input-with-error'}
                    value={stateForAllInputs}
                    onChangeText={setValue}
                    error={error}
                    onEnter={() => {
                        setError(
                            stateForAllInputs.trim()
                                ? ''
                                : 'Error'
                        )
                        setValue('')
                    }}
                />
            </div>

            <CommonButton id={'hw4-super-button-default'} xType={'default'}>BUTTON</CommonButton>
            {/*красная кнопка:*/}
            <div>
                <CommonButton id={'hw4-super-button-red'} xType={'red'}>
                    red!!!
                </CommonButton>
            </div>
            {/*задизэйбленная кнопка:*/}
            <div>
                <CommonButton
                    id={'hw4-super-button-disabled'}
                    xType={'disabled'}
                    disabled
                >
                    disabled
                </CommonButton>
            </div>
            {/*задизэйбленная кнопка:*/}
            <div>
                <CommonButton
                    id={'hw4-super-button-secondary'}
                    xType={'secondary'}
                >
                    secondary
                </CommonButton>
            </div>



            <CommonCheckbox id={'hw4-super-checkbox-with-text'}
                            checked={stateForAllCheckboxes}
                            onChangeChecked={setChecked}/>
        </div>
    );
};

export default Common;