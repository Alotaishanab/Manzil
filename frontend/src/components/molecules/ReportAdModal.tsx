import React, {useState} from 'react';
import {GenericModal} from './GenericModal';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {useIntl} from '@context';
import {globalStyles} from '@globalStyles';
import {View} from 'react-native';
import {CustomCheckbox} from '../atoms/CustomCheckbox';
import {CustomButton, TopSpace} from '../atoms';
import {DropDownPicker} from './DropdownPicker';
import {fonts} from '@fonts';
import {Colors} from '@colors';
import {Checkbox} from 'react-native-paper';

export const ReportAdModal = ({isVisible, toggleVisible}: any) => {
  const {intl} = useIntl();
  const [reportAd, setReportAd] = useState(
    intl.formatMessage({id: 'buttons.yes'}),
  );

  const [value, setValue] = useState<any>('');
  const [isFocus, setIsFocus] = useState(false);

  const onValueChangeReport = val => {
    setReportAd(val);
  };

  const reportReasons: any = [
    {
      label: intl.formatMessage({
        id: 'reportAdd.reasonReport.property-not-available',
      }),
      value: '1',
    },
    {
      label: intl.formatMessage({
        id: 'reportAdd.reasonReport.location-incorrect',
      }),
      value: '2',
    },
    {
      label: intl.formatMessage({
        id: 'reportAdd.reasonReport.type-property-incorrect',
      }),
      value: '3',
    },
    {
      label: intl.formatMessage({
        id: 'reportAdd.reasonReport.images-inappropriate',
      }),
      value: '4',
    },
    {
      label: intl.formatMessage({id: 'reportAdd.reasonReport.price-not-sense'}),
      value: '5',
    },
    {
      label: intl.formatMessage({id: 'reportAdd.reasonReport.other-reasons'}),
      value: '6',
    },
  ];
  const [checked, setChecked] = React.useState(false);
  const handleReport = () => {
    toggleVisible();
  };
  return (
    <GenericModal
      centeredModal={false}
      isVisible={isVisible}
      showCloseButton={false}
      centerText={true}
      // modalWidth={'95%'}
      modalTitle={intl.formatMessage({id: 'reportAdd.report-ad'})}
      toggleModal={toggleVisible}>
      <TopSpace top={10} />
      <Text style={styles.reportAdText}>
        {intl.formatMessage({id: 'reportAdd.sure-report'})}
      </Text>
      <TopSpace top={10} />

      <View style={globalStyles.simpleRow}>
        <CustomCheckbox
          title={intl.formatMessage({id: 'buttons.yes'})}
          selectedOption={reportAd}
          onValueChange={onValueChangeReport}
        />
        <View style={{marginHorizontal: 10}} />
        <CustomCheckbox
          title={intl.formatMessage({id: 'buttons.no'})}
          selectedOption={reportAd}
          onValueChange={onValueChangeReport}
        />
      </View>

      <TopSpace top={20} />
      <Text style={styles.reportAdText}>
        {intl.formatMessage({id: 'reportAdd.reason-report'})}
      </Text>

      <DropDownPicker
        placeholder="Select"
        value={value}
        data={reportReasons}
        isFocus={isFocus}
        setValue={setValue}
        dropdownWidth={String(Dimensions.get('screen').width - 20)}
        setIsFocus={setIsFocus}
        containerWidth={'90%'}
        labelField="label"
        valueField="value"
        onChange={value => {
          setValue(value);
          //   console.log("pharmacy on change", value);
        }}
      />
      <TopSpace top={10} />

      <View style={{flexDirection: 'row'}}>
        <Checkbox.Android
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
          rippleColor={Colors.light.headingTitle}
          uncheckedColor={Colors.light.headingTitle}
        />
        <Text style={styles.checkText}>
          {intl.formatMessage({id: 'reportAdd.reason-check'})}
        </Text>
      </View>

      <TopSpace top={10} />

      <CustomButton
        btnWidth={'100%'}
        disabled={false}
        handleClick={handleReport}
        title={intl.formatMessage({id: 'buttons.report'})}
        showRightIconButton={false}
        borderRadius={30}
      />
      <TopSpace top={30} />
    </GenericModal>
  );
};

const styles = StyleSheet.create({
  reportAdText: {
    fontSize: 14,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
  },
  checkText: {
    width: '80%',
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
});
