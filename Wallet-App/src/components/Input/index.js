import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
} from 'react';

import { ViewPropTypes } from 'react-native';

import { useField } from '@unform/core';

import PropTypes from 'prop-types';

import { Container, TextInput, Icon } from './styles';

function Input({ name, icon, containerStyle, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current.value);
  }, []);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        inputRef.current.value = value;
      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} style={containerStyle}>
      <Icon
        name={icon}
        size={24}
        color={isFocused || isFilled ? '#232129' : '#000'}
      />
      <TextInput
        ref={inputRef}
        keyboardAppearance="dark"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        placeholderTextColor="#232129"
        onChangeText={value => {
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        {...rest}
      />
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

Input.defaultProps = {
  style: null,
};

export default forwardRef(Input);
