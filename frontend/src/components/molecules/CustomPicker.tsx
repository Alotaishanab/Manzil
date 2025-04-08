import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {View} from 'react-native';

export const CustomPicker = ({
  data = [],
  selectedValue,
  setSelectedValue,
  toggleArea,
}: any) => {
  // const [selectedLanguage, setSelectedLanguage] = React.useState();

  return (
    <Picker
      selectedValue={selectedValue}
      style={{zIndex: 10000}}
      mode="dialog"
      selectionColor={'red'}
      onValueChange={(itemValue, itemIndex) => {
        setSelectedValue(itemValue);
        toggleArea();
      }}>
      {data?.map(item => {
        return <Picker.Item label={item?.label} value={item?.value} />;
      })}
    </Picker>
  );
};
