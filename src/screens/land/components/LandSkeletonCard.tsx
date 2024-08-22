import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const LandSkeletonCard = () => {
  return (
    <SkeletonPlaceholder
      //   highlightColor={'#F2F8FC'}
      backgroundColor={'#f0f0f0'}
      borderRadius={14}>
      {/* <SkeletonPlaceholder.Item /> */}

      <SkeletonPlaceholder.Item
        // marginTop={15}
        // paddingBottom={10}
        borderRadius={10}
        shadowColor={'#000'}
        backgroundColor={'#f0f0f0'}
        shadowOpacity={0.1}
        shadowRadius={3.84}
        elevation={5}
        shadowOffset={{
          width: 0,
          height: 2,
        }}>
        {/* ImageBackground with like icon */}
        <SkeletonPlaceholder.Item
          height={250}
          alignItems="flex-end"
          padding={5}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={'100%'}
            borderRadius={10}
            backgroundColor={'#e0e0e0'}
          />
          {/* <SkeletonPlaceholder.Item
            width={30}
            height={30}
            backgroundColor={'#fff'}
            borderRadius={15}
            position="absolute"
            top={30}
            right={30}
          /> */}
        </SkeletonPlaceholder.Item>

        {/* <TopSpace top={10} /> */}
        <SkeletonPlaceholder.Item marginTop={10} marginHorizontal={8}>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              width={100}
              height={18}
              backgroundColor={'#ccc'}
            />
          </SkeletonPlaceholder.Item>

          {/* Placeholder for description */}
          <SkeletonPlaceholder.Item
            width={'80%'}
            height={14}
            marginTop={10}
            backgroundColor={'#ccc'}
          />

          {/* Placeholder for row of icons and counts */}
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            marginTop={15}
            // justifyContent="space-between"
          >
            {/* Placeholder for bed icon */}
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item
                width={32}
                height={32}
                backgroundColor={'#ccc'}
              />

              <SkeletonPlaceholder.Item
                width={50}
                height={18}
                backgroundColor={'#ccc'}
                marginLeft={5}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
          {/* Placeholder for row of icons and counts ends here */}
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginTop={10}
          paddingHorizontal={10}
          justifyContent="space-between">
          {/* Placeholder for date text */}
          <SkeletonPlaceholder.Item
            width={100}
            height={12}
            backgroundColor={'#ccc'}
          />

          <SkeletonPlaceholder.Item
            width={32}
            height={32}
            backgroundColor={'#ccc'}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default LandSkeletonCard;
