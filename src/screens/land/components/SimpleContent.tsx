import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import LandSkeletonCard from './LandSkeletonCard';
import {styles} from '../styles';
import {GlobalIcon} from '@svgs';
import {useIntl} from '@context';

const SimpleContent = ({
  showContent,
  renderLand,
  showButton,
  handleMap,
  handleScroll,
}) => {
  const {intl} = useIntl();
  return (
    <View style={{flexGrow: 1, zIndex: 100}}>
      <View style={{flex: 1}}>
        {showContent ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={[1, 2, 3, 4, 5, 6]}
              onScroll={handleScroll}
              contentContainerStyle={{paddingHorizontal: 2}}
              ListFooterComponent={<View style={styles.footer} />}
              renderItem={renderLand}
            />
          </ScrollView>
        ) : (
          <>
            <LandSkeletonCard />
            <LandSkeletonCard />
          </>
        )}
      </View>

      {showButton && (
        <TouchableOpacity style={styles.mapBtn} onPress={handleMap}>
          <Text style={styles.mapBtnText}>
            {intl.formatMessage({id: 'buttons.map'})}
          </Text>
          <GlobalIcon width={20} height={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SimpleContent;
