import {Colors} from '@colors';
import {fonts} from '@fonts';
import {globalStyles} from '@globalStyles';
import {GraphUpDownIcon, PlusIcon, SearchFillIcon, SearchIcon} from '@svgs';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TopSpace} from '../atoms';
import {useIntl} from '@context';

type PropertyType = {
  handleAdd: () => void;
  handlePromote: () => void;
  handleRequest: () => void;
};

export const AddPropertiesContent: React.FC<PropertyType> = ({
  handleAdd = () => {},
  handlePromote = () => {},
  handleRequest = () => {},
}) => {
  const {intl} = useIntl();
  return (
    <>
      <TopSpace top={30} />
      <TouchableOpacity
        onPress={handleAdd}
        activeOpacity={0.8}
        style={[globalStyles.simpleRow]}>
        <View style={styles.smallCircle}>
          <PlusIcon width={13} height={13} fill={Colors.light.primaryBtn} />
        </View>

        <Text style={styles.iconTitle}>
          {intl.formatMessage({
            id: 'addPropertiesModal.add',
          })}
        </Text>
      </TouchableOpacity>

      <TopSpace top={45} />

      <TouchableOpacity
        onPress={handlePromote}
        activeOpacity={0.8}
        style={globalStyles.simpleRow}>
        <GraphUpDownIcon width={20} height={20} />

        <Text style={styles.iconTitle}>
          {intl.formatMessage({
            id: 'addPropertiesModal.promote',
          })}
          {/* I want to promote  */}
        </Text>
      </TouchableOpacity>
      <TopSpace top={45} />
      <TouchableOpacity
        onPress={handleRequest}
        activeOpacity={0.8}
        style={globalStyles.simpleRow}>
        <SearchFillIcon width={20} height={20} />

        <Text style={styles.iconTitle}>
          {/* I want to request */}
          {intl.formatMessage({
            id: 'addPropertiesModal.request',
          })}
        </Text>
      </TouchableOpacity>
      <TopSpace top={45} />
    </>
  );
};

const styles = StyleSheet.create({
  smallCircle: {
    width: 18,
    height: 18,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.light.primaryBtn,
  },
  iconTitle: {
    fontFamily: fonts.primary.medium,
    fontSize: 14,
    marginLeft: 10,
    color: Colors.light.primaryBtn,
  },
});
