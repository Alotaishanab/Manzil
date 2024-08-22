/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {globalStyles} from '@globalStyles';
import {CheckedWindow} from '@svgs';
import {styles} from '../styles';
import {CustomButton, TopSpace} from '@components';

const PlanModalContent = ({
  data = [],
  handleMonthlyPlan = () => {},
  monthlyPlan,
  yearlyPlan,
  handleYearlyPlan = () => {},
}: any) => {
  return (
    <>
      <TopSpace top={10} />
      {data?.map(item => {
        return (
          <View
            key={item?.id}
            style={[globalStyles.simpleRow, {marginVertical: 6}]}>
            <CheckedWindow width={30} height={30} />
            <View style={{flex: 1, paddingHorizontal: 15}}>
              <Text style={styles.planTitle}>{item?.name}</Text>
              <Text style={styles.planDescription}>{item?.description}</Text>
            </View>
          </View>
        );
      })}
      <TopSpace top={10} />
      <CustomButton
        btnWidth={'100%'}
        disabled={false}
        borderRadius={30}
        handleClick={handleMonthlyPlan}
        title={monthlyPlan}
        showRightIconButton={false}
      />
      <TopSpace top={10} />
      <CustomButton
        btnWidth={'100%'}
        disabled={false}
        borderRadius={30}
        handleClick={handleYearlyPlan}
        title={yearlyPlan}
        showRightIconButton={false}
      />
      <TopSpace top={10} />

      <Text style={styles.planCheckConditions}>
        By placing this order you agree to Manzil's{' '}
        <Text style={styles.termsOfUseBlueText}> Terms of use</Text> and{' '}
        <Text style={styles.termsOfUseBlueText}>Privacy policy</Text>. Your
        Apple ID will be charged based on your subscription. Subscription
        automatically renews unless auto-renew is turned off at least 24-hours
        before the end of the current period.
      </Text>

      <TopSpace top={30} />
    </>
  );
};
export default PlanModalContent;
