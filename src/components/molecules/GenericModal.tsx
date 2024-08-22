/* eslint-disable react-native/no-inline-styles */
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {globalStyles} from '@globalStyles';
import {CloseIcon} from '@svgs';
import {width} from '@useDimension';
import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {TopSpace} from '../atoms';

type GenericModalType = {
  isVisible: boolean;
  toggleModal?: () => void;
  modalTitle: string;
  centerText?: boolean;
  children: React.ReactNode;
  centeredModal?: boolean;
  showCloseButton?: boolean;
  modalWidth?: any;
  borderTopLeftRadius?: any;
  borderTopRightRadius?: any;
  showTopLine?: boolean;
  modalBg?: any;
  borderBottomRightRadius?: any;
  borderBottomLeftRadius?: any;
};

const GenericModalComponent: React.FC<GenericModalType> = ({
  isVisible,
  toggleModal = () => {},
  children,
  modalTitle = '',
  centeredModal = true,
  centerText = false,
  showCloseButton = true,
  borderTopLeftRadius = 30,
  borderTopRightRadius = 30,
  borderBottomLeftRadius = 0,
  borderBottomRightRadius = 0,
  showTopLine = false,
  modalBg = Colors.light.offWhite,
  modalWidth = Math.round(Dimensions.get('window').width),
}) => {
  return (
    <Modal
      coverScreen={false}
      style={centeredModal ? styles.centeredModalStyle : styles.modalStyle}
      collapsable
      deviceHeight={Dimensions.get('screen').height * 2}
      onBackdropPress={() => toggleModal()}
      onBackButtonPress={() => toggleModal()}
      backdropOpacity={0.1}
      animationIn="slideInUp"
      // customBackdrop={undefined}
      animationOut="slideOutDown"
      // animationInTiming={400} // Adjust the timing for smoothness
      // animationOutTiming={400}
      isVisible={isVisible}>
      <View
        style={[
          styles.innerWrap,
          {
            width: modalWidth,
            overflow: 'visible',
            zIndex: 1000,
            backgroundColor: modalBg,
            // borderRadius: 10,
            borderTopLeftRadius: borderTopLeftRadius,

            borderBottomStartRadius: borderBottomLeftRadius,
            borderBottomEndRadius: borderBottomRightRadius,
            borderTopRightRadius: borderTopRightRadius,
            borderBottomLeftRadius: centeredModal ? 10 : 0,
            borderBottomRightRadius: centeredModal ? 10 : 0,
          },
        ]}>
        {showTopLine && <View style={styles.topLine} />}

        <TopSpace top={10} />
        <View style={globalStyles.simpleRow}>
          {showCloseButton && (
            <Pressable onPress={toggleModal} style={styles.backBtn}>
              <CloseIcon width={30} height={30} />
            </Pressable>
          )}

          <Text
            style={[
              styles.modalTitleStyle,
              {
                textAlign: showCloseButton
                  ? 'center'
                  : centerText
                  ? 'center'
                  : 'left',
              },
            ]}>
            {modalTitle}
          </Text>
        </View>
        <TopSpace top={15} />
        {children}
      </View>
    </Modal>
  );
};

export const GenericModal = React.memo(GenericModalComponent);

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    overflow: 'visible',
    zIndex: 1000,
    justifyContent: 'flex-end',
  },
  centeredModalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerWrap: {
    width: width,
    borderRadius: 10,
    // borderTopRightRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: Colors.light.offWhite,
    justifyContent: 'space-around',
    // alignItems: 'center',
  },
  topLine: {
    // height: 3,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.light.greyDescription,
    width: 30,
    backgroundColor: Colors.light.greyDescription,
    alignSelf: 'center',
  },
  backBtn: {
    zIndex: 100,
    // position: 'absolute',
    // left: 20,
    // top: 20,
  },
  modalTitleStyle: {
    fontSize: 24,
    fontFamily: fonts.secondary.bold,
    color: Colors.light.headingTitle,
    textAlign: 'center',
    flex: 1,
  },
});
