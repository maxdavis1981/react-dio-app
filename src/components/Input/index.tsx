import React from 'react'

import {InputContainer, InputText, IconContainer, ErrorText } from './styles';

import { Controller } from "react-hook-form";
import { IInput } from './types';

const Input = ({leftIcon, name, control, errorMenssage, ...rest}: IInput) => {
  return (
    <>
      <InputContainer>
          {leftIcon ? (<IconContainer>{leftIcon}</IconContainer>) : null}
          <Controller
          name={name}
          control={control}
          render={({ field }) =>  <InputText {...field} {...rest} />}
        />
        
      </InputContainer>
      {errorMenssage ? <ErrorText>{errorMenssage} </ErrorText>: null}
    </>
  )
}

export { Input }; 