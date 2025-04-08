import { Colors } from '@colors';
import { fonts } from '@fonts';
import { globalStyles } from '@globalStyles';
import { CloseIcon } from '@svgs';
import { width } from '@useDimension';
import React from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { TopSpace } from '../atoms';

type GenericModalProps = {
  isVisible: boolean;
  toggleModal?: () => void;
  modalTitle: string;
  centerText?: boolean;
  children: React.ReactNode;
  centeredModal?: boolean;
  showCloseButton?: boolean;
  modalWidth?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  showTopLine?: boolean;
  modalBg?: string;
  borderBottomRightRadius?: number;
  borderBottomLeftRadius?: number;
  fontFamily?: string;
};

const GenericModalComponent: React.FC<GenericModalProps> = ({
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
  fontFamily = Platform.OS === 'ios' ? fonts.tertiary.bold : fonts.secondary.bold,
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
      animationOut="slideOutDown"
      animationInTiming={100}
      animationOutTiming={100}
      isVisible={isVisible}>
      <View
        style={[
          styles.innerWrap,
          {
            width: modalWidth,
            overflow: 'visible',
            zIndex: 1000,
            backgroundColor: modalBg,
            borderTopLeftRadius: borderTopLeftRadius,
            borderTopRightRadius: borderTopRightRadius,
            borderBottomStartRadius: borderBottomLeftRadius,
            borderBottomEndRadius: borderBottomRightRadius,
            borderBottomLeftRadius: centeredModal ? 10 : 0,
            borderBottomRightRadius: centeredModal ? 10 : 0,
          },
        ]}>
        {showTopLine && <View style={styles.topLine} />}
        <TopSpace top={10} />
        <View style={globalStyles.simpleRow}>
          {showCloseButton && (
            <Pressable onPress={toggleModal} style={styles.closeIconContainer}>
              <CloseIcon width={30} height={30} />
            </Pressable>
          )}
          <Text
            style={[
              styles.modalTitleStyle,
              {
                fontFamily: fontFamily,
                textAlign: showCloseButton ? 'center' : centerText ? 'center' : 'left',
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
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: Colors.light.offWhite,
    justifyContent: 'space-around',
  },
  topLine: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.light.greyDescription,
    width: 30,
    backgroundColor: Colors.light.greyDescription,
    alignSelf: 'center',
  },
  closeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.greyDescription,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitleStyle: {
    fontSize: 24,
    fontFamily: fonts.secondary.bold,
    color: Colors.light.headingTitle,
    textAlign: 'center',
    flex: 1,
  },
});
