import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  AreaIcon,
  BathroomIcon,
  BedIcon,
  LivingRoomIcon,
  GateIcon,
  StreetIcon,
  FootTrafficIcon,
  StorageIcon,
  FloorIcon,
  WaterIcon,
  ElectricityIcon,
  SewageIcon,
} from '@svgs'; // Ensure all icons are correctly imported

interface Property {
  area?: string;
  bedrooms?: number;
  bathrooms?: number;
  living_rooms?: number;
  has_water?: boolean;
  has_electricity?: boolean;
  has_sewage?: boolean;
  number_of_streets?: number;
  direction?: string;
  number_of_gates?: number;
  storage_capacity?: string;
  floors?: number;
  number_of_units?: number;
  foot_traffic?: string;
  property_category?: string;
}

export const renderPropertyIcons = (property: Property) => {
  const { property_category } = property || {};

  const renderSeparator = () => (
    <Text style={styles.separator}>|</Text>
  );

  const iconElements = [];

  if (property?.area) {
    iconElements.push(
      <View style={styles.iconWrapper} key="area">
        <AreaIcon width={24} height={24} />
        <Text style={styles.countText}>{`${parseInt(property.area).toLocaleString()} sq ft`}</Text>
      </View>
    );
  }

  if (property_category === 'House') {
    if (property?.bedrooms) {
      iconElements.push(
        <View style={styles.iconWrapper} key="bedrooms">
          <BedIcon width={20} height={20} />
          <Text style={styles.countText}>{`${property.bedrooms} Beds`}</Text>
        </View>
      );
    }
    if (property?.bathrooms) {
      iconElements.push(
        <View style={styles.iconWrapper} key="bathrooms">
          <BathroomIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.bathrooms} Baths`}</Text>
        </View>
      );
    }
    if (property?.living_rooms) {
      iconElements.push(
        <View style={styles.iconWrapper} key="living_rooms">
          <LivingRoomIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.living_rooms} Living Room(s)`}</Text>
        </View>
      );
    }
  }

  if (property_category === 'Land') {
    if (property?.has_water) {
      iconElements.push(
        <View style={styles.iconWrapper} key="has_water">
          <WaterIcon width={28} height={28} />
          <Text style={styles.countText}>Has Water</Text>
        </View>
      );
    }
    if (property?.has_electricity) {
      iconElements.push(
        <View style={styles.iconWrapper} key="has_electricity">
          <ElectricityIcon width={28} height={28} />
          <Text style={styles.countText}>Has Electricity</Text>
        </View>
      );
    }
    if (property?.has_sewage) {
      iconElements.push(
        <View style={styles.iconWrapper} key="has_sewage">
          <SewageIcon width={28} height={28} />
          <Text style={styles.countText}>Has Sewage</Text>
        </View>
      );
    }
    if (property?.number_of_streets) {
      iconElements.push(
        <View style={styles.iconWrapper} key="number_of_streets">
          <StreetIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.number_of_streets} Streets`}</Text>
        </View>
      );
    }
    if (property?.direction) {
      iconElements.push(
        <View style={styles.iconWrapper} key="direction">
          <Text style={styles.countText}>{`Direction: ${property.direction}`}</Text>
        </View>
      );
    }
  }

  if (property_category === 'Warehouse') {
    if (property?.number_of_gates) {
      iconElements.push(
        <View style={styles.iconWrapper} key="number_of_gates">
          <GateIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.number_of_gates} Gates`}</Text>
        </View>
      );
    }
    if (property?.storage_capacity) {
      iconElements.push(
        <View style={styles.iconWrapper} key="storage_capacity">
          <StorageIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.storage_capacity} Capacity`}</Text>
        </View>
      );
    }
  }

  if (property_category === 'Office') {
    if (property?.floors) {
      iconElements.push(
        <View style={styles.iconWrapper} key="floors">
          <FloorIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.floors} Floors`}</Text>
        </View>
      );
    }
    if (property?.living_rooms) {
      iconElements.push(
        <View style={styles.iconWrapper} key="living_rooms_office">
          <LivingRoomIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.living_rooms} Living Room(s)`}</Text>
        </View>
      );
    }
  }

  if (property_category === 'Chalet') {
    if (property?.bedrooms) {
      iconElements.push(
        <View style={styles.iconWrapper} key="bedrooms_chalet">
          <BedIcon width={20} height={20} />
          <Text style={styles.countText}>{`${property.bedrooms} Beds`}</Text>
        </View>
      );
    }
    if (property?.bathrooms) {
      iconElements.push(
        <View style={styles.iconWrapper} key="bathrooms_chalet">
          <BathroomIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.bathrooms} Baths`}</Text>
        </View>
      );
    }
    if (property?.living_rooms) {
      iconElements.push(
        <View style={styles.iconWrapper} key="living_rooms_chalet">
          <LivingRoomIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.living_rooms} Living Room(s)`}</Text>
        </View>
      );
    }
  }

  if (property_category === 'Farmhouse') {
    if (property?.bedrooms) {
      iconElements.push(
        <View style={styles.iconWrapper} key="bedrooms_farmhouse">
          <BedIcon width={20} height={20} />
          <Text style={styles.countText}>{`${property.bedrooms} Beds`}</Text>
        </View>
      );
    }
    if (property?.bathrooms) {
      iconElements.push(
        <View style={styles.iconWrapper} key="bathrooms_farmhouse">
          <BathroomIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.bathrooms} Baths`}</Text>
        </View>
      );
    }
    if (property?.living_rooms) {
      iconElements.push(
        <View style={styles.iconWrapper} key="living_rooms_farmhouse">
          <LivingRoomIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.living_rooms} Living Room(s)`}</Text>
        </View>
      );
    }
  }

  if (property_category === 'Tower') {
    if (property?.floors) {
      iconElements.push(
        <View style={styles.iconWrapper} key="floors_tower">
          <FloorIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.floors} Floors`}</Text>
        </View>
      );
    }
    if (property?.number_of_units) {
      iconElements.push(
        <View style={styles.iconWrapper} key="number_of_units">
          <BedIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.number_of_units} Units`}</Text>
        </View>
      );
    }
  }

  if (property_category === 'Workers Residence') {
    if (property?.number_of_units) {
      iconElements.push(
        <View style={styles.iconWrapper} key="units_workers_residence">
          <BedIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.number_of_units} Units`}</Text>
        </View>
      );
    }
    if (property?.living_rooms) {
      iconElements.push(
        <View style={styles.iconWrapper} key="living_rooms_workers_residence">
          <LivingRoomIcon width={28} height={28} />
          <Text style={styles.countText}>{`${property.living_rooms} Living Room(s)`}</Text>
        </View>
      );
    }
  }

  if (property_category === 'Shop') {
    if (property?.foot_traffic) {
      iconElements.push(
        <View style={styles.iconWrapper} key="foot_traffic">
          <FootTrafficIcon width={28} height={28} />
          <Text style={styles.countText}>{`Foot Traffic: ${property.foot_traffic}`}</Text>
        </View>
      );
    }
  }

  const elementsWithSeparators = [];
  iconElements.forEach((icon, index) => {
    elementsWithSeparators.push(icon);
    if (index < iconElements.length - 1) {
      elementsWithSeparators.push(renderSeparator());
    }
  });

  return <View style={styles.iconRow}>{elementsWithSeparators}</View>;
};


const styles = StyleSheet.create({
  iconRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Align icons to the left
    alignItems: 'center',     // Vertically center icons
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,  // Adjust horizontal spacing between icons
  },
  countText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#000',
  },
});

export default renderPropertyIcons;
