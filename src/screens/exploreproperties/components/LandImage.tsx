import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ImageCarousel, TopSpace} from '@components';

export const LandImage = ({loading}: any) => {
  const images = [
    {uri: 'https://picsum.photos/200/300', id: 1},
    {uri: 'https://picsum.photos/200/301', id: 2},
    {uri: 'https://picsum.photos/200/302', id: 3},
    {uri: 'https://picsum.photos/200/303', id: 4},
  ];
  return (
    <>
      <TopSpace top={5} />
      {!loading ? (
        <ImageCarousel images={images} />
      ) : (
        <SkeletonPlaceholder backgroundColor={'#ffff'} borderRadius={14}>
          <SkeletonPlaceholder.Item height={300}>
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={'100%'}
              borderRadius={10}
              backgroundColor={'#e0e0e0'}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      )}
    </>
  );
};

export default LandImage;
