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
    
    // Border Colors - Red Glow
    colorBorder: '#ff0040',
    colorBorderSecondary: '#cc0033',
    
    // Text Colors - High Contrast
    colorText: '#ffffff',
    colorTextSecondary: '#cccccc',
    colorTextTertiary: '#999999',
    colorTextQuaternary: '#666666',
    colorTextDisabled: '#444444',
    
    // Link Colors - Red Neon
    colorLink: '#ff0040',
    colorLinkHover: '#ff1a55',
    colorLinkActive: '#cc0033',
    
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
    
    colorInfo: '#ff0040',
    colorInfoBg: '#1a0008',
    colorInfoBorder: '#cc0033',
    
    // Component specific - Subtle overlays
    colorFillSecondary: 'rgba(255, 0, 64, 0.1)',
    colorFillTertiary: 'rgba(255, 0, 64, 0.05)',
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
    
    // Shadows - Red neon glow effects
    boxShadow: '0 0 20px rgba(255, 0, 64, 0.4), 0 0 40px rgba(255, 0, 64, 0.2)',
    boxShadowSecondary: '0 0 10px rgba(255, 0, 64, 0.3)',
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
      darkItemHoverBg: 'rgba(255, 0, 64, 0.15)',
      darkItemHoverColor: '#ff0040',
      darkItemSelectedBg: 'rgba(255, 0, 64, 0.25)',
      darkItemSelectedColor: '#ff0040',
      darkSubMenuItemBg: '#000000',
      itemBg: 'transparent',
      itemColor: '#ffffff',
      itemHoverBg: 'rgba(255, 0, 64, 0.15)',
      itemHoverColor: '#ff0040',
      itemSelectedBg: 'rgba(255, 0, 64, 0.25)',
      itemSelectedColor: '#ff0040',
    },
    
    // Button - Glowing red neon effect
    Button: {
      primaryColor: '#ffffff',
      primaryShadow: '0 0 20px rgba(255, 0, 64, 0.6), 0 0 40px rgba(255, 0, 64, 0.3)',
      defaultBg: '#0a0a0a',
      defaultColor: '#ffffff',
      defaultBorderColor: '#ff0040',
      dangerColor: '#ffffff',
      dangerShadow: '0 0 20px rgba(255, 0, 64, 0.6)',
    },
    
    // Input - Terminal style
    Input: {
      colorBgContainer: '#0a0a0a',
      colorBorder: '#ff0040',
      colorText: '#ffffff',
      colorTextPlaceholder: '#666666',
      hoverBorderColor: '#ff1a55',
      activeBorderColor: '#ff0040',
    },
    
    // Select
    Select: {
      colorBgContainer: '#0a0a0a',
      colorBgElevated: '#0a0a0a',
      colorBorder: '#ff0040',
      colorText: '#ffffff',
      colorTextPlaceholder: '#666666',
      optionSelectedBg: 'rgba(255, 0, 64, 0.25)',
      optionSelectedColor: '#ff0040',
      optionActiveBg: 'rgba(255, 0, 64, 0.15)',
    },
    
    // Table - Matrix style
    Table: {
      colorBgContainer: '#000000',
      colorText: '#ffffff',
      colorTextHeading: '#ffffff',
      colorBorderSecondary: '#ff0040',
      headerBg: '#0a0a0a',
      headerColor: '#ff0040',
      rowHoverBg: 'rgba(255, 0, 64, 0.1)',
      rowSelectedBg: 'rgba(255, 0, 64, 0.15)',
      rowSelectedHoverBg: 'rgba(255, 0, 64, 0.25)',
    },
    
    // Card
    Card: {
      colorBgContainer: '#0a0a0a',
      colorBorderSecondary: '#ff0040',
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
      controlItemBgHover: 'rgba(255, 0, 64, 0.15)',
      controlItemBgActive: 'rgba(255, 0, 64, 0.25)',
    },
    
    // Tabs
    Tabs: {
      cardBg: '#0a0a0a',
      itemColor: '#cccccc',
      itemHoverColor: '#ff1a55',
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
      colorBorder: '#ff0040',
    },
    
    Radio: {
      colorPrimary: '#ff0040',
      colorPrimaryHover: '#ff1a55',
      colorBorder: '#ff0040',
    },
    
    // Progress
    Progress: {
      defaultColor: '#ff0040',
      remainingColor: 'rgba(255, 0, 64, 0.2)',
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
      colorSplit: '#ff0040',
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
