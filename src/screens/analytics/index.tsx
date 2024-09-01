import React, { useState, useRef } from 'react';
import { ScrollView, Animated, View } from 'react-native';
import { HeaderBackButtonTitle, Screen } from '@components';
import { styles } from './styles';
import HeaderComponent from './components/HeaderComponent';
import ChartComponent from './components/ChartComponent';
import StatisticsComponent from './components/StatisticsComponent';
import DataCardsComponent from './components/DataCardsComponent';
import UserLocationsComponent from './components/UserLocationsComponent';
import ModalComponent from './components/ModalComponent';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  TouchIcon,
  ShareIcon,
  TimerIcon,
  HeartIcon,
  InquiryIcon,
} from '@svgs';

export const Analytics: React.FC = () => {
  const [selectedData, setSelectedData] = useState({ value: 0, label: 'Select a day' });
  const [totalViews, setTotalViews] = useState(228);
  const [modalVisible, setModalVisible] = useState(false);
  const [daysRange, setDaysRange] = useState(7);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [selectedDataLineX, setSelectedDataLineX] = useState<number | null>(null);

  const getChartData = (days: number) => {
    const today = new Date();
    const labels: string[] = [];
    const data: number[] = [];

    for (let i = days - 1; i >= 0; i -= Math.max(Math.ceil(days / 5), 1)) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
      data.push(Math.floor(Math.random() * 100)); // Random data for demonstration
    }

    return {
      labels,
      datasets: [
        {
          data,
          color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  };

  const chartData = getChartData(daysRange);

  const data = [
    {
      id: 2,
      name: 'Clicks',
      value: '480',
      icon: <TouchIcon width={30} height={30} />,
      increase: true,
      percent: '5',
      style: styles.halfWidthCard,
    },
    {
      id: 3,
      name: 'Time Spent',
      value: '1,200 mins',
      icon: <TimerIcon width={30} height={30} />,
      increase: true,
      percent: '9',
      style: styles.halfWidthCard,
    },
    {
      id: 4,
      name: 'Inquiries',
      value: '900',
      icon: <InquiryIcon width={30} height={30} />,
      increase: true,
      percent: '5',
      style: styles.thirdRowCard,
    },
    {
      id: 5,
      name: 'Saves',
      value: '480',
      icon: <HeartIcon width={30} height={30} />,
      increase: true,
      percent: '5',
      style: styles.thirdRowCard,
    },
    {
      id: 6,
      name: 'Shares',
      value: '900',
      icon: <ShareIcon width={30} height={30} />,
      increase: false,
      percent: '20',
      style: styles.thirdRowCard,
    },
  ];

  const userLocations = [
    { id: 1, name: 'Riyadh', value: '60%' },
    { id: 2, name: 'Jeddah', value: '20%' },
    { id: 3, name: 'Dammam', value: '20%' },
  ];

  const handleDaysRangeChange = (range: number) => {
    setDaysRange(range);
    setSelectedData({ value: 0, label: 'Select a day' });
    hideModal();
  };

  const showModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setModalVisible(false));
  };

  return (
    <Screen showKeyboardAware={false}>
      <HeaderBackButtonTitle text="Analytics" />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <HeaderComponent daysRange={daysRange} showModal={showModal} />
        <ChartComponent
          chartData={chartData}
          setSelectedData={setSelectedData}
          setSelectedDataLineX={setSelectedDataLineX}
          selectedDataLineX={selectedDataLineX}
        />
        <StatisticsComponent selectedData={selectedData} totalViews={totalViews} />
        <View style={styles.separatorLine} />
        {/* Correct Prop Passing */}
        <DataCardsComponent data={data} daysRange={daysRange} />
        <UserLocationsComponent userLocations={userLocations} />
      </ScrollView>
      <ModalComponent
        modalVisible={modalVisible}
        hideModal={hideModal}
        handleDaysRangeChange={handleDaysRangeChange}
        slideAnim={slideAnim}
      />
    </Screen>
  );
};
