import { type BottomTabBarProps, Tabs } from 'expo-router/js-tabs';

import { BottomNav, type BottomNavItem, type IconName } from '@/components/ui';

// Consumer tab vocabulary (Ark One · for individuals), in display order.
const TAB_META: Record<string, { label: string; icon: IconName }> = {
  home: { label: 'Home', icon: 'home' },
  pay: { label: 'Pay', icon: 'scan-line' },
  receive: { label: 'Receive', icon: 'qr-code' },
  history: { label: 'History', icon: 'clock' },
  settings: { label: 'Settings', icon: 'settings-2' },
};

/** Adapts the navigator state to the design's `BottomNav`. */
function TabBar({ state, navigation }: BottomTabBarProps) {
  const items: BottomNavItem[] = state.routes
    .filter((route) => TAB_META[route.name])
    .map((route) => ({ key: route.name, ...TAB_META[route.name] }));

  const activeKey = state.routes[state.index]?.name ?? 'home';

  return (
    <BottomNav
      items={items}
      activeKey={activeKey}
      onPress={(key) => {
        const route = state.routes.find((r) => r.name === key);
        if (!route) return;
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (key !== activeKey && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      }}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="pay" />
      <Tabs.Screen name="receive" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
