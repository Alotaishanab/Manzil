/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GenericModal} from './GenericModal';
import {useIntl} from '@context';
import {TopSpace} from '../atoms';
import TabButtons from './TabButtons';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {RowTitleValue} from './RowTitleValue';
import {globalStyles} from '@globalStyles';
import {CustomPicker} from './CustomPicker';

export const FilterModal = ({
  isVisible,
  selectedPropertyType,
  toggleModal,
  handlePropertyFeatures,
  showArea,
  handleArea,
  allAreas,
  allLocations,
  area,
  setArea,
  location,
  setLocation,
  showLocation,
  handleLocation,
  allDirections,
  direction,
  setDirection,
  showDirection,
  toggleDirection,
  allFurnishedTypes,
  furnished,
  setFurnished,
  showFurnished,
  toggleFurnished,
  propertyFeature,
  showBathroom,
  bathroom,
  setBathroom,
  allBathrooms,
  toggleBathroom,
  bedroom,
  setBedroom,
  toggleBedroom,
  showBedrooms,
  allBedroom,
  amenities,
  toggleAminities,
  price,
  setPrice,
  showPrice,
  togglePrice,
  allPrices,
  allSpaces,
  space,
  setSpace,
  toggleSpace,
  showSpace,
  handleClear = () => {},
  selectedPropertyFeatures,
  data,

  maxPrice,
  setMaxPrice,
  showMaxPrice,
  toggleMaxPrice,
  floor,
  setFloor,
  showFloor,
  toggleFloor,

  landsize,
  setLandSize,
  showLandSize,
  toggleLandSize,
  livingSpace,
  setLivingSpace,
  showLivingSpace,
  toggleLivingSpace,
}: any) => {
  const {intl} = useIntl();
  const [selectedBtn, setSelectedBtn] = useState(
    intl.formatMessage({
      id: 'buttons.for-sale',
    }),
  );
  console.log('data', data);
  return (
    <GenericModal
      isVisible={isVisible}
      modalTitle={intl.formatMessage({
        id: 'filterPropertyScreen.search-filter',
      })}
      borderTopLeftRadius={40}
      borderTopRightRadius={40}
      modalBg={Colors.light.background}
      centeredModal={false}
      toggleModal={toggleModal}>
      <TopSpace top={15} />
      <TabButtons
        options={[
          intl.formatMessage({
            id: 'buttons.for-sale',
          }),
          intl.formatMessage({
            id: 'buttons.for-rent',
          }),
        ]}
        onSelect={setSelectedBtn}
        borderRadius={10}
        paddingVertical={10}
        selectedOption={selectedBtn}
      />
      <TopSpace top={10} />

      <RowTitleValue
        title={intl.formatMessage({
          id: 'requestPropertyScreen.area',
        })}
        value={
          area
            ? area
            : intl.formatMessage({
                id: 'requestPropertyScreen.any',
              })
        }
        handleClick={handleArea}
      />
      {showArea && (
        <CustomPicker
          data={allAreas}
          selectedValue={area}
          setSelectedValue={setArea}
          toggleArea={handleArea}
        />
      )}
      <RowTitleValue
        title={intl.formatMessage({
          id: 'requestPropertyScreen.location',
        })}
        value={
          location
            ? location
            : intl.formatMessage({
                id: 'requestPropertyScreen.any',
              })
        }
        handleClick={handleLocation}
      />

      {showLocation && (
        <CustomPicker
          data={allLocations}
          selectedValue={location}
          setSelectedValue={setLocation}
          toggleArea={handleLocation}
        />
      )}

      <RowTitleValue
        title={intl.formatMessage({
          id: 'requestPropertyScreen.min-price',
        })}
        value={
          price ??
          intl.formatMessage({
            id: 'requestPropertyScreen.any',
          })
        }
        handleClick={togglePrice}
      />
      {showPrice && (
        <CustomPicker
          data={allPrices}
          selectedValue={price}
          setSelectedValue={setPrice}
          toggleArea={togglePrice}
        />
      )}

      <RowTitleValue
        title={intl.formatMessage({
          id: 'requestPropertyScreen.max-price',
        })}
        value={
          maxPrice ??
          intl.formatMessage({
            id: 'requestPropertyScreen.any',
          })
        }
        handleClick={toggleMaxPrice}
      />

      {showMaxPrice && (
        <CustomPicker
          data={allPrices}
          selectedValue={maxPrice}
          setSelectedValue={setMaxPrice}
          toggleArea={toggleMaxPrice}
        />
      )}
      {selectedPropertyType !==
        intl.formatMessage({
          id: 'requestPropertyScreen.properties-type.farm-house',
        }) && (
        <RowTitleValue
          title={intl.formatMessage({
            id: 'requestPropertyScreen.space',
          })}
          value={
            space ??
            intl.formatMessage({
              id: 'requestPropertyScreen.any',
            })
          }
          handleClick={toggleSpace}
        />
      )}
      {showSpace && (
        <CustomPicker
          data={allSpaces}
          selectedValue={space}
          setSelectedValue={setSpace}
          toggleArea={toggleSpace}
        />
      )}

      {selectedPropertyType ===
        intl.formatMessage({
          id: 'requestPropertyScreen.properties-type.farm-house',
        }) && (
        <>
          <RowTitleValue
            title={intl.formatMessage({
              id: 'requestPropertyScreen.land-size',
            })}
            value={
              landsize ??
              intl.formatMessage({
                id: 'requestPropertyScreen.any',
              })
            }
            handleClick={toggleLandSize}
          />
          {showLandSize && (
            <CustomPicker
              data={[
                {value: '1', label: '1'},
                {value: '2', label: '2'},
              ]}
              selectedValue={landsize}
              setSelectedValue={setLandSize}
              toggleArea={toggleLandSize}
            />
          )}

          <RowTitleValue
            title={intl.formatMessage({
              id: 'requestPropertyScreen.living-space',
            })}
            value={
              livingSpace ??
              intl.formatMessage({
                id: 'requestPropertyScreen.any',
              })
            }
            handleClick={toggleLivingSpace}
          />
          {showLivingSpace && (
            <CustomPicker
              data={[
                {value: '1', label: '1'},
                {value: '2', label: '2'},
              ]}
              selectedValue={livingSpace}
              setSelectedValue={setLivingSpace}
              toggleArea={toggleLivingSpace}
            />
          )}
        </>
      )}
      {(selectedPropertyType ===
        intl.formatMessage({
          id: 'requestPropertyScreen.properties-type.appartments',
        }) ||
        selectedPropertyType ===
          intl.formatMessage({
            id: 'requestPropertyScreen.properties-type.farm-house',
          }) ||
        selectedPropertyType ===
          intl.formatMessage({
            id: 'requestPropertyScreen.properties-type.chalet',
          })) && (
        <>
          <RowTitleValue
            title={intl.formatMessage({
              id: 'filterPropertyScreen.bedrooms',
            })}
            value={
              bedroom ??
              intl.formatMessage({
                id: 'requestPropertyScreen.any',
              })
            }
            handleClick={toggleBedroom}
          />
          {showBedrooms && (
            <CustomPicker
              data={allBedroom}
              selectedValue={bedroom}
              setSelectedValue={setBedroom}
              toggleArea={toggleBedroom}
            />
          )}
          <RowTitleValue
            title={intl.formatMessage({
              id: 'filterPropertyScreen.bathrooms',
            })}
            value={
              bathroom ??
              intl.formatMessage({
                id: 'requestPropertyScreen.any',
              })
            }
            handleClick={toggleBathroom}
          />
          {showBathroom && (
            <CustomPicker
              data={allBathrooms}
              selectedValue={bathroom}
              setSelectedValue={setBathroom}
              toggleArea={toggleBathroom}
            />
          )}
        </>
      )}

      {(selectedPropertyType ===
        intl.formatMessage({
          id: 'requestPropertyScreen.properties-type.shop',
        }) ||
        selectedPropertyType ===
          intl.formatMessage({
            id: 'requestPropertyScreen.properties-type.office',
          }) ||
        selectedPropertyType ===
          intl.formatMessage({
            id: 'requestPropertyScreen.properties-type.warehouse',
          }) ||
        selectedPropertyType ===
          intl.formatMessage({
            id: 'addpropertyScreen.properties-type.worker-warehouse',
          })) && (
        <>
          <RowTitleValue
            title={intl.formatMessage({
              id: 'requestPropertyScreen.number-floors',
            })}
            value={
              floor ??
              intl.formatMessage({
                id: 'requestPropertyScreen.any',
              })
            }
            handleClick={toggleFloor}
          />
          {showFloor && (
            <CustomPicker
              data={[
                {value: '1', label: '1'},
                {value: '2', label: '2'},
              ]}
              selectedValue={floor}
              setSelectedValue={setFloor}
              toggleArea={toggleFloor}
            />
          )}
        </>
      )}

      {selectedPropertyType ===
        intl.formatMessage({
          id: 'requestPropertyScreen.properties-type.appartments',
        }) ||
        (selectedPropertyType ===
          intl.formatMessage({
            id: 'requestPropertyScreen.properties-type.houses',
          }) && (
          <>
            <RowTitleValue
              title={intl.formatMessage({
                id: 'requestPropertyScreen.furnished-type',
              })}
              value={
                furnished ??
                intl.formatMessage({
                  id: 'requestPropertyScreen.any',
                })
              }
              handleClick={toggleFurnished}
            />
          </>
        ))}

      <RowTitleValue
        title={intl.formatMessage({
          id: 'requestPropertyScreen.property-features',
        })}
        value={
          selectedPropertyFeatures?.length > 0
            ? selectedPropertyFeatures[0]
            : intl.formatMessage({
                id: 'requestPropertyScreen.any',
              })
        }
        handleClick={handlePropertyFeatures}
      />

      {showFurnished && (
        <CustomPicker
          data={allFurnishedTypes}
          selectedValue={furnished}
          setSelectedValue={setFurnished}
          toggleArea={toggleFurnished}
        />
      )}

      <RowTitleValue
        title={intl.formatMessage({
          id: 'requestPropertyScreen.direction',
        })}
        value={
          direction ??
          intl.formatMessage({
            id: 'requestPropertyScreen.any',
          })
        }
        handleClick={toggleDirection}
      />

      {showDirection && (
        <CustomPicker
          data={allDirections}
          selectedValue={direction}
          setSelectedValue={setDirection}
          toggleArea={toggleDirection}
        />
      )}

      <TopSpace top={20} />
      <View style={globalStyles.simpleRow}>
        <Pressable
          onPress={handleClear}
          style={[
            styles.searchBtn,
            {
              borderWidth: 1,
              backgroundColor: Colors.light.background,
            },
          ]}>
          <Text
            style={[
              styles.searchBtnText,
              {
                color: Colors.light.headingTitle,
              },
            ]}>
            {intl.formatMessage({id: 'buttons.clear'})}
          </Text>
        </Pressable>
        <View style={{marginHorizontal: 5}} />

        <Pressable style={styles.searchBtn}>
          <Text style={styles.searchBtnText}>
            {intl.formatMessage({id: 'buttons.search'})}
          </Text>
        </Pressable>
      </View>
      <TopSpace top={10} />
    </GenericModal>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 12,
  },
  val: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
  },
  searchBtn: {
    paddingVertical: 10,
    borderRadius: 30,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.primaryButton,
  },
  searchBtnText: {
    color: Colors.light.background,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
  },
});
