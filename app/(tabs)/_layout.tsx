import { Tabs } from 'expo-router'
import { Platform } from 'react-native'
import TabBarBackground from "@/components/ui/TabBarBackground"
import { IconSymbol } from '@/components/ui/IconSymbol'

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
          },
          android: {
            position: 'absolute',
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
          }
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'My Library',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="books.vertical.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'New',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="plus.app.fill" color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
