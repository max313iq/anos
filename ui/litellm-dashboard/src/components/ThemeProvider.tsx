"use client";

import { ConfigProvider } from 'antd';
import redDarkTheme from '@/styles/theme';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={redDarkTheme}>
      {children}
    </ConfigProvider>
  );
}
