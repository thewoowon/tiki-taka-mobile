import React, {createContext, useState, useEffect, useContext} from 'react';
import {Platform, Alert} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  PermissionStatus,
  RESULTS,
  openSettings,
  requestLocationAccuracy,
} from 'react-native-permissions';

type PermissionContextType = {
  locationPermission: PermissionStatus;
  fetchPermission: () => Promise<PermissionStatus>;
};

const PermissionContext = createContext<PermissionContextType>({
  locationPermission: 'denied',
  fetchPermission: async () => 'denied',
});

export const PermissionProvider = ({children}: {children: React.ReactNode}) => {
  const [locationPermission, setLocationPermission] =
    useState<PermissionStatus>('denied');

  const fetchPermission = async (): Promise<PermissionStatus> => {
    const permissionType =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await check(permissionType);
    if (result === RESULTS.GRANTED) {
      setLocationPermission(RESULTS.GRANTED);
    } else if (result === RESULTS.DENIED) {
      const reqResult = await request(permissionType);
      setLocationPermission(reqResult);
      if (reqResult !== RESULTS.GRANTED) {
        // 권한 거부 시 사용자에게 안내
        Alert.alert(
          '위치 서비스 사용',
          '위치서비스를 사용할 수 없습니다. \n설정에서 위치 서비스를 허용해주세요.',
          [
            {text: '취소', style: 'cancel'},
            {text: '설정으로 이동', onPress: () => openSettings()},
          ],
        );
      }
    } else if (result === RESULTS.BLOCKED) {
      setLocationPermission(RESULTS.BLOCKED);
      Alert.alert(
        '권한 필요',
        '위치 권한이 차단되어 있습니다. 설정에서 권한을 허용해주세요.',
        [
          {text: '취소', style: 'cancel'},
          {text: '설정으로 이동', onPress: () => openSettings()},
        ],
      );
    } else {
      setLocationPermission(result);
    }
    return result;
  };

  return (
    <PermissionContext.Provider
      value={{
        locationPermission,
        fetchPermission,
      }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => useContext(PermissionContext);
