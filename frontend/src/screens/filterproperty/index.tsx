import React, {useState} from 'react';
import {CustomButton, Screen, TabButtons, TopSpace} from '@components';
import {Text, View} from 'react-native';
import FilterHeader from './components/FilterHeader';
import PriceRangeSlider from './components/PriceRangeSlider';
import {useIntl} from '@context';
import {styles} from './styles';
import {useFilterProps} from './useFilterProps';
import HouseTypeButtons from './components/HouseTypeButton';
import BedroomView from './components/BedroomView';
import TitleOptionRow from './components/TitleOptionRow';

export const FilterProperty = () => {
  const {intl} = useIntl();
  const [selectedBtn, setSelectedBtn] = useState(
    intl.formatMessage({
      id: 'buttons.for-rent',
    }),
  );

  const {
    houseTypes,
    bedrooms,
    selectedHouseType,
    setSelectedHouseType,
    bedroomCount,
    bathroomCount,
    setBathroomCount,
    setBedroomCount,
  } = useFilterProps();

  const handleSaveFilter = () => {};
  return (
    <Screen showKeyboardAware={true}>
      <View>
        <FilterHeader />
        <TopSpace top={15} />
        <TabButtons
          options={[
            intl.formatMessage({
              id: 'buttons.for-rent',
            }),
            intl.formatMessage({
              id: 'buttons.for-sale',
            }),
          ]}
          onSelect={setSelectedBtn}
          borderRadius={10}
          paddingVertical={10}
          selectedOption={selectedBtn}
        />
        <PriceRangeSlider />

        <TopSpace top={10} />
        <Text style={styles.titleText}>
          {intl.formatMessage({
            id: 'filterPropertyScreen.house-type',
          })}
        </Text>

        <HouseTypeButtons
          iconWidth={50}
          iconHeight={50}
          selectedBtn={selectedHouseType}
          handleSelect={setSelectedHouseType}
          options={houseTypes}
        />
        <View style={styles.bedroomBathroomContent}>
          <BedroomView
            selectedOption={bedroomCount}
            setSelectedOption={setBedroomCount}
            iconName="BedIcon"
            data={bedrooms}
            title={intl.formatMessage({
              id: 'filterPropertyScreen.bathrooms',
            })}
          />
          <BedroomView
            iconName="BathroomIcon"
            data={bedrooms}
            title={intl.formatMessage({
              id: 'filterPropertyScreen.bathrooms',
            })}
            selectedOption={bathroomCount}
            setSelectedOption={setBathroomCount}
          />
        </View>
        <TopSpace top={25} />

        <TitleOptionRow
          title={intl.formatMessage({
            id: 'filterPropertyScreen.price-range',
          })}
          option={'Any'}
        />
        <TitleOptionRow
          title={intl.formatMessage({
            id: 'filterPropertyScreen.radius',
          })}
          option={'This area only'}
        />
        <TitleOptionRow
          title={intl.formatMessage({
            id: 'filterPropertyScreen.rental-duration',
          })}
          option={'Any'}
        />
        <TitleOptionRow
          title={intl.formatMessage({
            id: 'filterPropertyScreen.date-added',
          })}
          option={'Any'}
        />
        <TitleOptionRow
          title={intl.formatMessage({
            id: 'filterPropertyScreen.furniture',
          })}
          option={'Any'}
        />

        <TopSpace top={70} />

        <CustomButton
          btnWidth={'90%'}
          textSize={14}
          disabled={false}
          handleClick={handleSaveFilter}
          title={intl.formatMessage({id: 'buttons.save-filter'})}
          showRightIconButton={false}
        />
      </View>
    </Screen>
  );
};
