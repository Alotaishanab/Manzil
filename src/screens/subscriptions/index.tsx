/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {
  CustomButton,
  CustomTabButtons,
  GenericModal,
  HeaderBackButtonTitle,
  Screen,
  TopSpace,
} from '@components';
import {useIntl} from '@context';
import {styles} from './styles';
import {globalStyles} from '@globalStyles';
import {DangerIcon} from '@svgs';
import RowTitleValue from './components/RowTitleValue';
import PlanModalContent from './components/PlanModalContent';

export const Subscriptions = () => {
  const {intl} = useIntl();
  const [btnSelected, setBtnSelected] = useState(
    intl.formatMessage({
      id: 'subscriptionScreen.individuals',
    }),
  );

  const [showIndividualPlan, setShowIndividualPlan] = useState(false);
  const [showCorporatePlan, setShowCorporatePlan] = useState(false);

  const toggleIndividualPlan = () => {
    setShowIndividualPlan(!showIndividualPlan);
  };
  const toggleCorporatePlan = () => {
    setShowCorporatePlan(!showCorporatePlan);
  };

  const handleNext = () => {
    if (
      btnSelected ===
      intl.formatMessage({
        id: 'subscriptionScreen.individuals',
      })
    ) {
      toggleIndividualPlan();
    } else {
      toggleCorporatePlan();
    }
  };
  const individualPlans = [
    {
      id: 1,
      name: 'Today',
      description: 'Immediately access premium features and post your ads.',
    },
    {
      id: 2,
      name: 'Today',
      description:
        'We will send you an email explaining your subscription plan.',
    },
    {
      id: 3,
      name: 'Cancel anytime for any reason',
      description:
        'Easily cancel your subscription at any time in Settings > Apple ID.',
    },
  ];

  return (
    <Screen showKeyboardAware={true}>
      <HeaderBackButtonTitle
        text={intl.formatMessage({id: 'subscriptionScreen.header'})}
      />
      <TopSpace top={10} />

      <CustomTabButtons
        options={[
          intl.formatMessage({
            id: 'subscriptionScreen.individuals',
          }),
          intl.formatMessage({
            id: 'subscriptionScreen.corporate',
          }),
        ]}
        selectedOption={btnSelected}
        onSelect={setBtnSelected}
      />
      <TopSpace top={20} />
      <View style={styles.containerWrap}>
        <Text style={styles.headingTitle}>
          {intl.formatMessage({id: 'subscriptionScreen.ads'})}
        </Text>
        <TopSpace top={5} />
        <RowTitleValue
          title={intl.formatMessage({id: 'subscriptionScreen.ads'})}
          value={'200 Ads'}
          // handleClick={toggleIndividualPlan}
        />
        <RowTitleValue
          title={intl.formatMessage({
            id: 'subscriptionScreen.issue-ad-license',
          })}
          value={'49 Ads'}
          // handleClick={toggleIndividualPlan}
        />
      </View>

      <TopSpace top={15} />

      <View style={styles.containerWrap}>
        <Text style={styles.headingTitle}>
          {intl.formatMessage({id: 'subscriptionScreen.agency-details'})}
        </Text>
        <TopSpace top={5} />
        <RowTitleValue
          title={intl.formatMessage({id: 'subscriptionScreen.agency-page'})}
          value={
            btnSelected !==
            intl.formatMessage({
              id: 'subscriptionScreen.individuals',
            })
              ? 'Yes'
              : '200 Ads'
          }
          // handleClick={toggleCorporatePlan}
        />
        <RowTitleValue
          title={intl.formatMessage({id: 'subscriptionScreen.agency-page'})}
          value={
            btnSelected !==
            intl.formatMessage({
              id: 'subscriptionScreen.individuals',
            })
              ? 'Yes'
              : '49 Ads'
          }
          // handleClick={toggleCorporatePlan}
        />
        <RowTitleValue
          title={intl.formatMessage({id: 'subscriptionScreen.agency-page'})}
          value={
            btnSelected !==
            intl.formatMessage({
              id: 'subscriptionScreen.individuals',
            })
              ? 'Yes'
              : '200 Ads'
          }
          // handleClick={toggleCorporatePlan}
        />
      </View>
      <TopSpace top={15} />

      <View
        style={[
          styles.containerWrap,
          globalStyles.flexRow,
          {
            paddingBottom: 30,
          },
        ]}>
        <DangerIcon width={30} height={30} />
        <Text
          style={[
            styles.warningMsg,
            {
              lineHeight: 27,
            },
          ]}>
          {intl.formatMessage({id: 'subscriptionScreen.warning'})}
        </Text>
      </View>

      <TopSpace top={25} />
      <CustomButton
        btnWidth={'100%'}
        disabled={false}
        borderRadius={30}
        handleClick={handleNext}
        title={intl.formatMessage({id: 'buttons.next'})}
        showRightIconButton={true}
      />
      {/*  */}
      <GenericModal
        isVisible={showIndividualPlan}
        // borderBottomLeftRadius={30}
        // borderBottomRightRadius={30}
        modalTitle={intl.formatMessage({
          id: 'subscriptionScreen.individual-plan-detail',
        })}
        centeredModal={false}
        showCloseButton={false}
        toggleModal={toggleIndividualPlan}>
        <PlanModalContent
          data={individualPlans}
          //
          monthlyPlan={intl.formatMessage({
            id: 'subscriptionScreen.individual.monthly',
          })}
          yearlyPlan={intl.formatMessage({
            id: 'subscriptionScreen.individual.yearly',
          })}
        />
      </GenericModal>

      <GenericModal
        isVisible={showCorporatePlan}
        modalTitle={intl.formatMessage({
          id: 'subscriptionScreen.corporate-plan-detail',
        })}
        centeredModal={false}
        // borderBottomLeftRadius={30}
        // borderBottomRightRadius={30}
        showCloseButton={false}
        toggleModal={toggleCorporatePlan}>
        <PlanModalContent
          data={individualPlans}
          monthlyPlan={intl.formatMessage({
            id: 'subscriptionScreen.corporate.monthly',
          })}
          yearlyPlan={intl.formatMessage({
            id: 'subscriptionScreen.corporate.yearly',
          })}
        />
      </GenericModal>
    </Screen>
  );
};
