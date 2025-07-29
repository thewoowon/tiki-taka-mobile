import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
  Keyboard,
  KeyboardEvent,
} from 'react-native';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const { height } = Dimensions.get('window');

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('info');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const opacity = useMemo(() => new Animated.Value(0), []);
  const translateY = useMemo(() => new Animated.Value(0), []);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const keyboardWillShow = (e: KeyboardEvent) => {
      const newKeyboardHeight = e.endCoordinates.height;
      setKeyboardHeight(newKeyboardHeight);

      if (isVisible && !isAnimatingRef.current) {
        Animated.spring(translateY, {
          toValue: -newKeyboardHeight,
          useNativeDriver: true,
          bounciness: 0,
        }).start();
      }
    };

    const keyboardWillHide = () => {
      setKeyboardHeight(0);
      if (isVisible && !isAnimatingRef.current) {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
        }).start();
      }
    };

    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardWillShow,
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardWillHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [isVisible, translateY]);

  const hideToast = useCallback(() => {
    isAnimatingRef.current = true;
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }),
    ]).start(() => {
      setIsVisible(false);
      isAnimatingRef.current = false;
    });
  }, [opacity, translateY]);

  const showToast = useCallback(
    (newMessage: string, newType: ToastType = 'info') => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setMessage(newMessage);
      setType(newType);
      setIsVisible(true);
      isAnimatingRef.current = true;

      const initialTranslateY = keyboardHeight > 0 ? -keyboardHeight : 0;
      translateY.setValue(initialTranslateY);

      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
      ]).start(() => {
        isAnimatingRef.current = false;
        hideToast();
      });
    },
    [hideToast, opacity, translateY, keyboardHeight],
  );

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#333333';
      case 'error':
        return '#F44336';
      default:
        return '#333333';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isVisible && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'transparent',
              zIndex: 9999,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.container,
              {
                opacity,
                transform: [{ translateY }],
                backgroundColor: getBackgroundColor(),
              },
            ]}
          >
            <Text style={styles.text}>{message}</Text>
          </Animated.View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: height * 0.05,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
});

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
