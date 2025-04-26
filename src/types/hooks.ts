export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export interface ScreenSizeReturn {
  width: number | undefined;
  height: number | undefined;
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}