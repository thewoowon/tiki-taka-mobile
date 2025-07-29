import React from 'react';
import Svg, {Circle, Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

type GoogleIconProps = {
  width?: number;
  height?: number;
};

const GoogleIcon = ({width = 44, height = 44}: GoogleIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 44 44" fill="none">
    <Circle cx="22" cy="22" r="21.5" />
    <G clipPath="url(#clip0_186_3310)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.0001 22.3179C36.0001 21.3248 35.9086 20.3712 35.7404 19.4546H22.2861V24.8699H29.9749C29.6438 26.6201 28.6371 28.1025 27.1244 29.0957V32.6079H31.7419C34.443 30.1706 36.0015 26.5819 36.0015 22.3179H36.0001Z"
        fill="#4285F4"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.2861 36C26.1432 36 29.3773 34.7457 31.7405 32.6078L27.123 29.0956C25.8431 29.9357 24.2079 30.4316 22.2847 30.4316C18.5635 30.4316 15.4143 27.9692 14.2905 24.6602H9.51953V28.2871C11.8707 32.8623 16.7009 36 22.2861 36Z"
        fill="#34A853"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2918 24.6602C14.0064 23.8201 13.8436 22.9233 13.8436 22C13.8436 21.0768 14.0064 20.18 14.2918 19.3398V15.7129H9.51944C8.55179 17.6029 8 19.7408 8 22C8 24.2593 8.55179 26.3972 9.51944 28.2872L14.2918 24.6602Z"
        fill="#FBBC05"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.2861 13.5683C24.3829 13.5683 26.267 14.2753 27.7475 15.6614L31.8455 11.6454C29.3705 9.38747 26.1365 8 22.2861 8C16.7009 8 11.8707 11.1376 9.51953 15.7129L14.2918 19.3398C15.4156 16.0307 18.5649 13.5683 22.2861 13.5683Z"
        fill="#EA4335"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_186_3310">
        <Rect width="28" height="28" fill="white" transform="translate(8 8)" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default GoogleIcon;
