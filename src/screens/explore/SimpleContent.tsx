import React from 'react';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import {useIntl} from '@context';
import PropertyCardSkeleton from './components/PropertyCardSkeleton';
import {styles} from './styles';
import {Text} from 'react-native';
import {GlobalIcon} from '@svgs';

const SimpleContent = ({
  showButton,
  exploreList,
  handleScroll,
  renderList,
  handleMap,
  showContent,
  onRefresh,
  refreshing,
}: any) => {
  const {intl} = useIntl();
  return (
    <View style={{flexGrow: 1}}>
      <View style={{flex: 1}}>
        {showContent ? (
          <FlatList
            // ListFooterComponent={<View style={{marginBottom: 120}} />}
            data={exploreList}
            keyExtractor={item => item?.toString()}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 2}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            // onScrollToTop={onRefresh}
            renderItem={renderList}
            ListFooterComponent={
              <>
                <View style={{height: 40}} />
              </>
            }
          />
        ) : (
          <>
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
          </>
        )}
      </View>
    </View>
  );
};

export default SimpleContent;
