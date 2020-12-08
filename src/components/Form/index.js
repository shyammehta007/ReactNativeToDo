import React, {useEffect} from 'react';
import {View, Button, Text, TextInput} from 'react-native';
import {useForm} from 'react-hook-form';

import styles from './style';
import {COLORS} from '../../styles/colors';

const Form = (props) => {
  const {register, handleSubmit, setValue} = useForm();
  const {formData = [], onSubmit} = props;
  useEffect(() => {
    formData.map(({name}) => {
      register(name);
    });
  }, [register]); /* eslint-disable-line react-hooks/exhaustive-deps*/
  return (
    <View style={styles.formContainer}>
      {formData.map(({name, label, secureTextEntry = false}) => {
        return (
          <View key={name} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <TextInput
              placeholder={name}
              style={styles.feildInput}
              onChangeText={(text) => {
                setValue(name, text);
              }}
              secureTextEntry={secureTextEntry}
            />
          </View>
        );
      })}
      <View style={styles.submitButton}>
        <Button
          title="Submit"
          color={COLORS.WHITE}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default Form;
