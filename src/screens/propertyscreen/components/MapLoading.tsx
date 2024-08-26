import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MapSkeleton = ({height}: any) => {
  return (
    <SkeletonPlaceholder backgroundColor={'#ffff'} borderRadius={14}>
      <SkeletonPlaceholder.Item height={height}>
        <SkeletonPlaceholder.Item
          width={'100%'}
          height={'100%'}
          borderRadius={10}
          backgroundColor={'#e0e0e0'}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default MapSkeleton;
