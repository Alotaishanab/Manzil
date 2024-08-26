import React, { useState } from 'react';
import { View } from 'react-native';
import TitleValueRow from '../../agencydetails/components/TitleValueRow';
import TitleArrowIconWrap from '../../agencydetails/components/TitleArrowIconWrap';
import { useIntl } from '@context';
import { styles } from '../styles';

const AdInfo: React.FC = () => {
  const { intl } = useIntl();
  const [showAuthorityInfo, setShowAuthorityInfo] = useState(true);

  return (
    <View style={styles.roundedWrap}>
      <TitleArrowIconWrap
        showIcon={false}
        headingTitle={intl.formatMessage({
          id: 'agencyScreen.real-estate-authority-info',
        })}
        showRightArrowToggle={false}
        isVisible={showAuthorityInfo}
        setIsVisible={setShowAuthorityInfo}
      />

      <TitleValueRow
        title={intl.formatMessage({
          id: 'agencyScreen.advertising-license-number',
        })}
        value={'321'}
      />
      <TitleValueRow
        title={intl.formatMessage({
          id: 'agencyScreen.unified-number-establishment',
        })}
        value={'25'}
      />
      <TitleValueRow
        title={intl.formatMessage({
          id: 'agencyScreen.fal-license-no',
        })}
        value={'7'}
      />
      <TitleValueRow
        title={intl.formatMessage({
          id: 'agencyScreen.date-registration',
        })}
        value={'2024/06/29'}
      />
    </View>
  );
};

export default AdInfo;
