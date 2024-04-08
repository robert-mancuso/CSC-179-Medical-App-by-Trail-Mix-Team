// MyTabBarIcon.js
import React from 'react';
import { SvgXml } from 'react-native-svg';

import calendarSvg from '../Assets/calendar.svg';
import patientIconSvg from '../Assets/patientIcon.svg';


const iconMap = {
  calendar: calendarSvg,
  patientIcon: patientIconSvg,
};

const MyTabBarIcon = ({ icon, color, size }) => {
  const iconXml = iconMap[icon];

  if (!iconXml) {
    console.error(`Icon "${icon}" not found`);
    return null;
  }

  return (
    <SvgXml
      xml={iconXml}
      width={size}
      height={size}
      fill={color}
    />
  );
};

export default MyTabBarIcon;
