import { Colors } from '@colors';
import { CustomButton } from '@components';
import { useIntl } from '@context';
import { fonts } from '@fonts';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const commissionOptions = ['0.5%', '1%', '1.5%', '2%', '2.5%'];

const FinalStep = ({ data, handleSubmit, handleBack }) => {
  const { intl } = useIntl();

  // Accordion state for each card
  const [accordion, setAccordion] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });

  // Local states for form fields
  const [price, setPrice] = useState(data.price || '');
  const [rentDuration, setRentDuration] = useState(data.rentDuration || 'monthly');
  const [selectedCommission, setSelectedCommission] = useState(null);

  // Validation error state for price
  const [priceError, setPriceError] = useState('');

  // Animate accordion toggling
  const toggleAccordion = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAccordion((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle price input: allow only digits and clamp to 999,999,999
  const handlePriceChange = (val) => {
    let numericVal = val.replace(/[^0-9]/g, '');
    // Remove leading zeros
    numericVal = numericVal.replace(/^0+/, '');
    if (numericVal && Number(numericVal) > 999999999) {
      numericVal = '999999999';
    }
    setPrice(numericVal);
  };

  const validatePrice = () => {
    if (!price) {
      setPriceError('Price is required.');
    } else {
      setPriceError('');
    }
  };

  // Render price label based on property type and rent duration
  const renderPriceLabel = () => {
    if (data.propertyType === 'Rent' && rentDuration) {
      return ` / ${rentDuration === 'semi-annual' ? '6 months' : rentDuration}`;
    }
    return '';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Review & Finalize</Text>
        <Text style={styles.headerSubtitle}>Double-check your listing details below</Text>
      </View>

      {/* Accordion Cards */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.cardHeader} onPress={() => toggleAccordion('step1')}>
          <Text style={styles.cardHeaderTitle}>Property Info</Text>
          <Text style={styles.cardHeaderIndicator}>{accordion.step1 ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {accordion.step1 && (
          <View style={styles.cardContent}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Type:</Text>
              <Text style={styles.infoValue}>{data.propertyType}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Size:</Text>
              <Text style={styles.infoValue}>{data.size} m²</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Age:</Text>
              <Text style={styles.infoValue}>{data.propertyAge}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.cardHeader} onPress={() => toggleAccordion('step2')}>
          <Text style={styles.cardHeaderTitle}>Property Details</Text>
          <Text style={styles.cardHeaderIndicator}>{accordion.step2 ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {accordion.step2 && (
          <View style={styles.cardContent}>
            {data.selectedPropertyType === 'House' && (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Bedrooms:</Text>
                  <Text style={styles.infoValue}>{data.beds}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Bathrooms:</Text>
                  <Text style={styles.infoValue}>{data.baths}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Floors:</Text>
                  <Text style={styles.infoValue}>{data.floors}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Living Rooms:</Text>
                  <Text style={styles.infoValue}>{data.livingRooms}</Text>
                </View>
              </>
            )}
            {data.selectedPropertyType === 'Appartment' && (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Rooms:</Text>
                  <Text style={styles.infoValue}>{data.rooms}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Bathrooms:</Text>
                  <Text style={styles.infoValue}>{data.baths}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Floor:</Text>
                  <Text style={styles.infoValue}>{data.floorNumber}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Living Rooms:</Text>
                  <Text style={styles.infoValue}>{data.livingRooms}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Total Floors:</Text>
                  <Text style={styles.infoValue}>{data.floors}</Text>
                </View>
              </>
            )}
          </View>
        )}
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.cardHeader} onPress={() => toggleAccordion('step3')}>
          <Text style={styles.cardHeaderTitle}>Utilities & Features</Text>
          <Text style={styles.cardHeaderIndicator}>{accordion.step3 ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {accordion.step3 && (
          <View style={styles.cardContent}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Water:</Text>
              <Text style={styles.infoValue}>{data.waterAccess ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Electricity:</Text>
              <Text style={styles.infoValue}>{data.electricityAccess ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Sewage:</Text>
              <Text style={styles.infoValue}>{data.sewageSystem ? 'Yes' : 'No'}</Text>
            </View>
            {data.selectedPropertyFeatures && data.selectedPropertyFeatures.length > 0 && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Features:</Text>
                <Text style={styles.infoValue}>{data.selectedPropertyFeatures.join(', ')}</Text>
              </View>
            )}
          </View>
        )}
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.cardHeader} onPress={() => toggleAccordion('step4')}>
          <Text style={styles.cardHeaderTitle}>Ad Details</Text>
          <Text style={styles.cardHeaderIndicator}>{accordion.step4 ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {accordion.step4 && (
          <View style={styles.cardContent}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Title:</Text>
              <Text style={styles.infoValue}>{data.title}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Description:</Text>
              <Text style={styles.infoValue}>{data.description}</Text>
            </View>
            {data.propertyFeature && data.propertyFeature.length > 0 && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Features:</Text>
                <Text style={styles.infoValue}>
                  {data.propertyFeature.map((f) => f.name).join(', ')}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.cardHeader} onPress={() => toggleAccordion('step5')}>
          <Text style={styles.cardHeaderTitle}>Media & Floor Plan</Text>
          <Text style={styles.cardHeaderIndicator}>{accordion.step5 ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {accordion.step5 && (
          <View style={styles.cardContent}>
            <Text style={styles.subSectionTitle}>Property Images</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaScroller}>
              {data.media && data.media.length > 0 ? (
                data.media.map((img, index) => (
                  <Image key={index} source={{ uri: img.uri }} style={styles.mediaImage} />
                ))
              ) : (
                <Text style={styles.infoValue}>No images provided</Text>
              )}
            </ScrollView>
            <Text style={styles.subSectionTitle}>Floor Plan</Text>
            {data.floorPlan ? (
              <Image source={{ uri: data.floorPlan }} style={styles.floorPlanImage} />
            ) : (
              <Text style={styles.infoValue}>No floor plan provided</Text>
            )}
            <View style={styles.arInfo}>
              <Text style={styles.infoLabel}>AR View:</Text>
              <Text style={styles.infoValue}>{data.arView ? 'Supported' : 'Not Supported'}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Ownership & Pricing Section */}
      <View style={styles.ownershipCard}>
        <Text style={styles.ownershipTitle}>Ownership & Pricing</Text>
        <Text style={styles.ownershipSubtitle}>Required details for finalizing your listing</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Ownership:</Text>
          <Text style={styles.infoValue}>{data.ownershipType}</Text>
        </View>
        {data.ownershipType === 'independent' && (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Instrument:</Text>
              <Text style={styles.infoValue}>{data.independentFields?.instrumentNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Owner ID:</Text>
              <Text style={styles.infoValue}>{data.independentFields?.ownerIDNumber}</Text>
            </View>
          </>
        )}
        {data.ownershipType === 'multipleOwners' && (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Instrument:</Text>
              <Text style={styles.infoValue}>{data.multipleOwnersFields?.instrumentNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Owner ID:</Text>
              <Text style={styles.infoValue}>{data.multipleOwnersFields?.ownerIDNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Agency:</Text>
              <Text style={styles.infoValue}>{data.multipleOwnersFields?.agencyNumber}</Text>
            </View>
          </>
        )}
        {data.ownershipType === 'agency' && (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Instrument:</Text>
              <Text style={styles.infoValue}>{data.agencyFields?.instrumentNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Commercial Reg:</Text>
              <Text style={styles.infoValue}>{data.agencyFields?.commercialRegNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Agent ID:</Text>
              <Text style={styles.infoValue}>{data.agencyFields?.agentIDNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Agency:</Text>
              <Text style={styles.infoValue}>{data.agencyFields?.agencyNumber}</Text>
            </View>
          </>
        )}

        {/* Price Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            {intl.formatMessage({ id: 'requestPropertyScreen.select-price' })}
          </Text>
          <View style={[styles.priceContainer, priceError && styles.errorBorder]}>
            <TextInput
              placeholder="2,000,000"
              placeholderTextColor={Colors.light.grey}
              style={styles.priceInput}
              keyboardType="numeric"
              value={price}
              onChangeText={handlePriceChange}
              onBlur={validatePrice}
              maxLength={9}
            />
            <Text style={styles.priceLabel}>SAR{renderPriceLabel()}</Text>
          </View>
          {priceError ? <Text style={styles.errorText}>{priceError}</Text> : null}
        </View>

        {/* Rent Duration Selector (if property type is Rent) */}
        {data.propertyType.toLowerCase() === 'rent' && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Rent Duration</Text>
            <View style={styles.chipContainer}>
              {['monthly', 'quarterly', 'semi-annual', 'annual'].map((duration) => (
                <TouchableOpacity
                  key={duration}
                  style={[
                    styles.chip,
                    rentDuration === duration && styles.chipActive,
                  ]}
                  onPress={() => setRentDuration(duration)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      rentDuration === duration && styles.chipTextActive,
                    ]}
                  >
                    {duration === 'semi-annual'
                      ? '6 months'
                      : duration.charAt(0).toUpperCase() + duration.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Commission Selector */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Commission</Text>
          <View style={styles.chipContainer}>
            {commissionOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.chip,
                  selectedCommission === option && styles.chipActive,
                ]}
                onPress={() => setSelectedCommission(option)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedCommission === option && styles.chipTextActive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Action Button */}
      <View style={styles.buttonWrapper}>
        <CustomButton
          btnWidth={'100%'}
          borderRadius={30}
          disabled={!!priceError || !price}
          handleClick={handleSubmit}
          title={intl.formatMessage({ id: 'buttons.next' })}
          showRightIconButton={true}
        />
      </View>
    </ScrollView>
  );
};

export default FinalStep;

const styles = StyleSheet.create({
  // Container & Header
  container: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: fonts.primary.bold,
    color: Colors.darkText || '#000',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: '#8B4513',
    marginTop: 5,
  },
  // Accordion Cards
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  cardHeaderTitle: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: '#2E7D32',
  },
  cardHeaderIndicator: {
    fontSize: 18,
    color: '#2E7D32',
  },
  cardContent: {
    padding: 20,
    backgroundColor: '#fff',
  },
  // Info Rows
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    color: '#2E7D32',
    width: 120,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: '#333',
    flex: 1,
  },
  // Media & Floor Plan
  subSectionTitle: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    color: '#2E7D32',
    marginBottom: 10,
  },
  mediaScroller: {
    marginBottom: 15,
  },
  mediaImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 10,
  },
  floorPlanImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  arInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Ownership & Pricing Card
  ownershipCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  ownershipTitle: {
    fontSize: 22,
    fontFamily: fonts.primary.bold,
    color: '#2E7D32',
    marginBottom: 5,
  },
  ownershipSubtitle: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: '#8B4513',
    marginBottom: 15,
  },
  // Price Input (using provided styles)
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    color: '#2E7D32',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.light.inputBg,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.light.inputBg,
    height: 50,
    paddingHorizontal: 10,
  },
  priceInput: {
    flex: 1,
    fontSize: 24,
    textAlign: 'center',
    color: Colors.light.black,
    fontFamily: fonts.primary.bold,
  },
  priceLabel: {
    marginLeft: 10,
    fontSize: 18,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.bold,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  errorBorder: {
    borderColor: 'red',
  },
  // Chip Styles for Rent Duration and Commission
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.primaryBtnLight,
    borderColor: Colors.light.primaryBtn,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  chipText: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.light.primaryBtn,
  },
  chipActive: {
    backgroundColor: Colors.light.primaryBtn,
  },
  chipTextActive: {
    fontSize: 14,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
  },
  // Button Wrapper
  buttonWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
});
