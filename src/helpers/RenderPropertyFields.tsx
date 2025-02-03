import React from 'react';
import {
  HouseComponent,
  ApartmentComponent,
  WorkersResidenceComponent,
  LandComponent,
  FarmhouseComponent,
  ShopComponent,
  ChaletComponent,
  OfficeComponent,
  WarehouseComponent,
  TowerComponent,
} from '@components';
import { Text } from 'react-native';


interface PropertyFieldsProps {
  selectedPropertyType: string;
  errors: { [key: string]: string };
  beds: number;
  setBeds: (val: number) => void;
  baths: number;
  setBaths: (val: number) => void;
  floors: number;
  setFloors: (val: number) => void;
  livingRooms: number;
  setLivingRooms: (val: number) => void;
  rooms: number;
  setRooms: (val: number) => void;
  direction: string;
  setDirection: (val: string) => void;
  numberOfStreets: number;
  setNumberOfStreets: (val: number) => void;
  footTraffic: string;
  setFootTraffic: (val: string) => void;
  proximity: string;
  setProximity: (val: string) => void;
  floorNumber: number;
  setFloorNumber: (val: number) => void;
  numberOfGates: number;
  setNumberOfGates: (val: number) => void;
  loadingDocks: number;
  setLoadingDocks: (val: number) => void;
  storageCapacity: number;
  setStorageCapacity: (val: number) => void;
  numberOfUnits: number;
  setNumberOfUnits: (val: number) => void;
  parkingSpaces: number;
  setParkingSpaces: (val: number) => void;
}

export const RenderPropertyFields = (props: PropertyFieldsProps) => {
  const {
    selectedPropertyType,
    errors,
    beds,
    setBeds,
    baths,
    setBaths,
    floors,
    setFloors,
    livingRooms,
    setLivingRooms,
    rooms,
    setRooms,
    direction,
    setDirection,
    numberOfStreets,
    setNumberOfStreets,
    footTraffic,
    setFootTraffic,
    proximity,
    setProximity,
    floorNumber,
    setFloorNumber,
    numberOfGates,
    setNumberOfGates,
    loadingDocks,
    setLoadingDocks,
    storageCapacity,
    setStorageCapacity,
    numberOfUnits,
    setNumberOfUnits,
    parkingSpaces,
    setParkingSpaces,
  } = props;

  switch (selectedPropertyType) {
    case 'House':
      return (
        <HouseComponent
          beds={beds}
          setBeds={setBeds}
          baths={baths}
          setBaths={setBaths}
          floors={floors}
          setFloors={setFloors}
          livingRooms={livingRooms}
          setLivingRooms={setLivingRooms}
          direction={direction}
          setDirection={setDirection}
          errors={errors}
        />
      );

    case 'Appartment':
      return (
        <ApartmentComponent
          rooms={rooms}
          setRooms={setRooms}
          baths={baths}
          setBaths={setBaths}
          floorNumber={floorNumber}
          setFloorNumber={setFloorNumber}
          livingRooms={livingRooms}
          setLivingRooms={setLivingRooms}
          floors={floors}
          setFloors={setFloors}
          direction={direction}
          setDirection={setDirection}
          errors={errors}
        />
      );

    case 'Workers Residence':
      return (
        <WorkersResidenceComponent
          beds={beds}
          setBeds={setBeds}
          baths={baths}
          setBaths={setBaths}
          direction={direction}
          setDirection={setDirection}
          errors={errors}
        />
      );

    case 'Land':
      return (
        <LandComponent
          direction={direction}
          setDirection={setDirection}
          numberOfStreets={numberOfStreets}
          setNumberOfStreets={setNumberOfStreets}
          errors={errors}
        />
      );

    case 'Farmhouse':
      return (
        <FarmhouseComponent
          beds={beds}
          setBeds={setBeds}
          baths={baths}
          setBaths={setBaths}
          livingRooms={livingRooms}
          setLivingRooms={setLivingRooms}
          direction={direction}
          setDirection={setDirection}
          errors={errors}
        />
      );

    case 'Shop':
      return (
        <ShopComponent
          footTraffic={footTraffic}
          setFootTraffic={setFootTraffic}
          proximity={proximity}
          setProximity={setProximity}
          errors={errors}
        />
      );

    case 'Chalet':
      return (
        <ChaletComponent
          beds={beds}
          setBeds={setBeds}
          baths={baths}
          setBaths={setBaths}
          livingRooms={livingRooms}
          setLivingRooms={setLivingRooms}
          direction={direction}
          setDirection={setDirection}
          errors={errors}
        />
      );

    case 'Office':
      return (
        <OfficeComponent
          floors={floors}
          setFloors={setFloors}
          parkingSpaces={parkingSpaces}
          setParkingSpaces={setParkingSpaces}
          direction={direction}
          setDirection={setDirection}
          errors={errors}
        />
      );

    case 'Warehouse':
      return (
        <WarehouseComponent
          numberOfGates={numberOfGates}
          setNumberOfGates={setNumberOfGates}
          loadingDocks={loadingDocks}
          setLoadingDocks={setLoadingDocks}
          storageCapacity={storageCapacity}
          setStorageCapacity={setStorageCapacity}
          errors={errors}
        />
      );

    case 'Tower':
      return (
        <TowerComponent
          rooms={rooms}
          setRooms={setRooms}
          baths={baths}
          setBaths={setBaths}
          numberOfUnits={numberOfUnits}
          setNumberOfUnits={setNumberOfUnits}
          floors={floors}
          setFloors={setFloors}
          direction={direction}
          setDirection={setDirection}
          errors={errors}
        />
      );

    default:
      return (
        <Text style={{ color: 'red', textAlign: 'center' }}>
          Please select a valid property type
        </Text>
      );
  }
};

export default RenderPropertyFields;
