import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Controller} from 'react-hook-form';
import {Colors} from '@colors';
import {fonts} from '../../assets/fonts';

interface CodeTypes {
  control: any;
  isRequired: boolean;
  name: string;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search';
  theme?: string;
  cellCount?: any;
}

export const CodeInputField: React.FC<CodeTypes> = ({
  control,
  isRequired,
  name,
  keyboardType,
  theme,
  cellCount = 6,
}) => {
  const [props, getCellOnLayoutHandler] = useClearByFocusCell();

  return (
    <View style={{alignSelf: 'center', marginVertical: 30}}>
      <Controller
        control={control}
        rules={{
          required: isRequired,
        }}
        render={({
          field: {ref, onChange, onBlur, value},
          fieldState: {error},
        }) => (
          <>
            <CodeField
              ref={ref}
              caretHidden={false}
              onChangeText={onChange}
              value={value}
              cellCount={cellCount}
              rootStyle={styles.codeFieldRoot}
              keyboardType={keyboardType}
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[
                    styles.cell,
                    {
                      borderWidth: 1,
                      borderColor: isFocused
                        ? Colors.light.primaryBtn
                        : Colors.light.inputBg,
                      backgroundColor: Colors.light.inputBg,
                      color: Colors.light.headingTitle,
                    },
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            {error?.message && (
              <Text style={styles.errorMessage}>{error?.message}</Text>
            )}
          </>
        )}
        name={name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {
    textAlign: 'center',
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    backgroundColor: 'red',
  },
  codeFieldRoot: {marginVertical: 3},
  cell: {
    width: 50,
    height: 50,
    marginHorizontal: 4,
    justifyContent: 'center',
    lineHeight: 50,
    alignContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    fontFamily: fonts.primary.semiBold,
    fontSize: 24,
    color: Colors.light.headingTitle,
    overflow: 'hidden',
    borderRadius: 12,
    borderColor: Colors.light.inputBg,
    backgroundColor: Colors.light.inputBg,
  },
  focusCell: {
    width: 60,
    height: 60,
    textAlignVertical: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    alignItems: 'center',
    color: Colors.light.headingTitle,
    borderColor: Colors.light.inputBg,
  },
  errorMessage: {
    color: Colors.light.danger,
    fontSize: 12,
    fontFamily: fonts.primary.medium,
  },
});
