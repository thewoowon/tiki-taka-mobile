# 리액트 네이티브에서 유용한 API

리액트 네이틀브에서는 다양한 API를 제공합니다. 이번에는 그 중에서도 유용한 API를 알아보겠습니다.

## Dimensions

`Dimensions`는 디바이스의 크기를 가져오는 API입니다. 리액트 네이티브에서는 `Dimensions`를 사용하여 디바이스의 크기를 가져올 수 있습니다.

```jsx
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
```

`Dimensions.get('window')`를 사용하여 디바이스의 크기를 가져올 수 있습니다. 이때 `width`와 `height`를 사용하여 디바이스의 너비와 높이를 가져올 수 있습니다.

### useWindowDimensions

`useWindowDimensions`는 `Dimensions` API를 훅으로 사용할 수 있게 해주는 API입니다. 이 API를 사용하면 함수 컴포넌트에서 디바이스의 크기를 가져올 수 있습니다.

```jsx
import { useWindowDimensions } from 'react-native';

const { width, height } = useWindowDimensions();
```

`useWindowDimensions`를 사용하여 디바이스의 크기를 가져올 수 있습니다. 이때 `width`와 `height`를 사용하여 디바이스의 너비와 높이를 가져올 수 있습니다.

### 참고 자료

- [https://reactnative.dev/docs/dimensions](https://reactnative.dev/docs/dimensions)
- [https://reactnative.dev/docs/usewindowdimensions](https://reactnative.dev/docs/usewindowdimensions)

### 요약

리액트 네이티브에서는 `Dimensions`와 `useWindowDimensions`를 사용하여 디바이스의 크기를 가져올 수 있습니다.

## Platform

`Platform`은 디바이스의 플랫폼을 가져오는 API입니다. 리액트 네이티브에서는 `Platform`을 사용하여 디바이스의 플랫폼을 가져올 수 있습니다.

```jsx

import { Platform } from 'react-native';

const platform = Platform.OS;
```

`Platform.OS`를 사용하여 디바이스의 플랫폼을 가져올 수 있습니다. 이때 `platform`을 사용하여 디바이스의 플랫폼을 가져올 수 있습니다.

### 참고자료

- [https://reactnative.dev/docs/platform](https://reactnative.dev/docs/platform)
