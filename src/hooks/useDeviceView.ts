import { DeviceType, ScreenSizeReturn, WindowSize } from '@/types/hooks';
import { useState, useEffect } from 'react';

export const useScreenSize = (
  mobileBreakpoint: number = 768,
  tabletBreakpoint: number = 1024
): ScreenSizeReturn => {

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    if (typeof window !== 'undefined') {

      const handleResize = (): void => {

        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        
        if (window.innerWidth < mobileBreakpoint) {
          setDeviceType('mobile');
        } else if (window.innerWidth < tabletBreakpoint) {
          setDeviceType('tablet');
        } else {
          setDeviceType('desktop');
        }
      };

      window.addEventListener('resize', handleResize);

      handleResize();
    
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [mobileBreakpoint, tabletBreakpoint]);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';

  return {
    width: windowSize.width,
    height: windowSize.height,
    deviceType,
    isMobile,
    isTablet,
    isDesktop
  };
};