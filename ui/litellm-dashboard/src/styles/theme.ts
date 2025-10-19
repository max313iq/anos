import { ThemeConfig } from 'antd';

// Hacker Dark Theme Configuration - Intense, Scary, Futuristic
export const redDarkTheme: ThemeConfig = {
  token: {
    // Primary Colors - Red Neon
    colorPrimary: '#ff0040',
    colorPrimaryHover: '#ff1a55',
    colorPrimaryActive: '#cc0033',
    colorPrimaryBorder: '#ff0040',
    
    // Background Colors - Deep Black (Pure Black)
    colorBgBase: '#000000',
    colorBgContainer: '#000000',
    colorBgElevated: '#0a0a0a',
    colorBgLayout: '#000000',
    colorBgSpotlight: '#0a0a0a',
    colorBgMask: 'rgba(0, 0, 0, 0.95)',
    
    // Border Colors - Blue Glow
    colorBorder: '#0066ff',
    colorBorderSecondary: '#0052cc',
    
    // Text Colors - High Contrast
    colorText: '#ffffff',
    colorTextSecondary: '#cccccc',
    colorTextTertiary: '#999999',
    colorTextQuaternary: '#666666',
    colorTextDisabled: '#444444',
    
    // Link Colors - Blue Neon
    colorLink: '#00ccff',
    colorLinkHover: '#33d9ff',
    colorLinkActive: '#0099cc',
    
    // Success/Error/Warning/Info - Neon Style
    colorSuccess: '#00ff88',
    colorSuccessBg: '#001a0f',
    colorSuccessBorder: '#00cc6a',
    
    colorError: '#ff0040',
    colorErrorBg: '#1a0008',
    colorErrorBorder: '#cc0033',
    
    colorWarning: '#ffaa00',
    colorWarningBg: '#1a1400',
    colorWarningBorder: '#cc8800',
    
    colorInfo: '#00ccff',
    colorInfoBg: '#001a26',
    colorInfoBorder: '#0099cc',
    
    // Component specific - Subtle overlays
    colorFillSecondary: 'rgba(255, 0, 64, 0.1)',
    colorFillTertiary: 'rgba(0, 102, 255, 0.05)',
    colorFillQuaternary: 'rgba(255, 255, 255, 0.02)',
    
    // Border radius - Sharp edges for hacker aesthetic
    borderRadius: 2,
    borderRadiusLG: 4,
    borderRadiusSM: 1,
    
    // Font
    fontSize: 14,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,
    fontSizeHeading5: 14,
    
    // Shadows - Neon glow effects
    boxShadow: '0 0 20px rgba(255, 0, 64, 0.3), 0 0 40px rgba(0, 102, 255, 0.2)',
    boxShadowSecondary: '0 0 10px rgba(255, 0, 64, 0.2)',
  },
  
  algorithm: undefined, // We'll use custom dark theme
  
  components: {
    // Layout
    Layout: {
      headerBg: '#000000',
      bodyBg: '#000000',
      footerBg: '#000000',
      siderBg: '#000000',
      triggerBg: '#0a0a0a',
      triggerColor: '#ffffff',
    },
    
    // Menu
    Menu: {
      darkItemBg: 'transparent',
      darkItemColor: '#ffffff',
      darkItemHoverBg: 'rgba(0, 102, 255, 0.2)',
      darkItemHoverColor: '#00ccff',
      darkItemSelectedBg: 'rgba(255, 0, 64, 0.2)',
      darkItemSelectedColor: '#ff0040',
      darkSubMenuItemBg: '#000000',
      itemBg: 'transparent',
      itemColor: '#ffffff',
      itemHoverBg: 'rgba(0, 102, 255, 0.2)',
      itemHoverColor: '#00ccff',
      itemSelectedBg: 'rgba(255, 0, 64, 0.2)',
      itemSelectedColor: '#ff0040',
    },
    
    // Button - Glowing neon effect
    Button: {
      primaryColor: '#ffffff',
      primaryShadow: '0 0 20px rgba(255, 0, 64, 0.6), 0 0 40px rgba(255, 0, 64, 0.3)',
      defaultBg: '#0a0a0a',
      defaultColor: '#ffffff',
      defaultBorderColor: '#0066ff',
      dangerColor: '#ffffff',
      dangerShadow: '0 0 20px rgba(255, 0, 64, 0.6)',
    },
    
    // Input - Terminal style
    Input: {
      colorBgContainer: '#0a0a0a',
      colorBorder: '#0066ff',
      colorText: '#ffffff',
      colorTextPlaceholder: '#666666',
      hoverBorderColor: '#00ccff',
      activeBorderColor: '#ff0040',
    },
    
    // Select
    Select: {
      colorBgContainer: '#0a0a0a',
      colorBgElevated: '#0a0a0a',
      colorBorder: '#0066ff',
      colorText: '#ffffff',
      colorTextPlaceholder: '#666666',
      optionSelectedBg: 'rgba(255, 0, 64, 0.2)',
      optionSelectedColor: '#ff0040',
      optionActiveBg: 'rgba(0, 102, 255, 0.2)',
    },
    
    // Table - Matrix style
    Table: {
      colorBgContainer: '#000000',
      colorText: '#ffffff',
      colorTextHeading: '#ffffff',
      colorBorderSecondary: '#0066ff',
      headerBg: '#0a0a0a',
      headerColor: '#ff0040',
      rowHoverBg: 'rgba(0, 102, 255, 0.1)',
      rowSelectedBg: 'rgba(255, 0, 64, 0.15)',
      rowSelectedHoverBg: 'rgba(255, 0, 64, 0.25)',
    },
    
    // Card
    Card: {
      colorBgContainer: '#0a0a0a',
      colorBorderSecondary: '#0066ff',
      colorTextHeading: '#ffffff',
      colorTextDescription: '#cccccc',
    },
    
    // Modal
    Modal: {
      contentBg: '#0a0a0a',
      headerBg: '#0a0a0a',
      titleColor: '#ff0040',
      colorText: '#ffffff',
    },
    
    // Dropdown
    Dropdown: {
      colorBgElevated: '#0a0a0a',
      colorText: '#ffffff',
      controlItemBgHover: 'rgba(0, 102, 255, 0.2)',
      controlItemBgActive: 'rgba(255, 0, 64, 0.2)',
    },
    
    // Tabs
    Tabs: {
      cardBg: '#0a0a0a',
      itemColor: '#cccccc',
      itemHoverColor: '#00ccff',
      itemSelectedColor: '#ff0040',
      itemActiveColor: '#ff0040',
      inkBarColor: '#ff0040',
    },
    
    // Form
    Form: {
      labelColor: '#ffffff',
      labelRequiredMarkColor: '#ff0040',
    },
    
    // Notification
    Notification: {
      colorBgElevated: '#0a0a0a',
      colorText: '#ffffff',
      colorTextHeading: '#ff0040',
    },
    
    // Message
    Message: {
      contentBg: '#0a0a0a',
      contentPadding: '10px 16px',
    },
    
    // Tooltip
    Tooltip: {
      colorBgSpotlight: '#0a0a0a',
      colorTextLightSolid: '#ffffff',
    },
    
    // Popover
    Popover: {
      colorBgElevated: '#0a0a0a',
      colorText: '#ffffff',
    },
    
    // Switch
    Switch: {
      colorPrimary: '#ff0040',
      colorPrimaryHover: '#ff1a55',
    },
    
    // Checkbox & Radio
    Checkbox: {
      colorPrimary: '#ff0040',
      colorPrimaryHover: '#ff1a55',
      colorBorder: '#0066ff',
    },
    
    Radio: {
      colorPrimary: '#ff0040',
      colorPrimaryHover: '#ff1a55',
      colorBorder: '#0066ff',
    },
    
    // Progress
    Progress: {
      defaultColor: '#ff0040',
      remainingColor: 'rgba(0, 102, 255, 0.3)',
    },
    
    // Badge
    Badge: {
      colorError: '#ff0040',
      colorErrorHover: '#ff1a55',
    },
    
    // Tag
    Tag: {
      defaultBg: '#0a0a0a',
      defaultColor: '#ffffff',
    },
    
    // Divider
    Divider: {
      colorSplit: '#0066ff',
    },
    
    // Pagination
    Pagination: {
      itemBg: '#0a0a0a',
      itemActiveBg: '#ff0040',
      itemLinkBg: '#0a0a0a',
      itemInputBg: '#0a0a0a',
    },
  },
};

export default redDarkTheme;
