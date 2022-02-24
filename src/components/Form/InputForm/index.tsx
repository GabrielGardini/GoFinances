import React from 'react';

import {Input} from '../Input';

import {Container } from './styles';
import {TextInputProps} from "react-native";
import {Control, Controller} from "react-hook-form";

interface Props extends TextInputProps{
    control:Control;
    name:string;
}

export function InputForm({control,name, ...rest}:Props){
    return(
        <Container>
            <Controller control={control} render={({field:{onChange, onBlur, value}})=>(
                <Input onChangeText={onChange} value={value} {...rest} />
            )} name={name}/>
        </Container>
    );
}
