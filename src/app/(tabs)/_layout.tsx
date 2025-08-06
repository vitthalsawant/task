import { Tabs } from "expo-router";
import { Entypo, Feather } from "@expo/vector-icons";

export default function TabsLayout() {
    return <Tabs screenOptions={{tabBarActiveTintColor: "#EC324E", tabBarShowLabel: false, headerShown: false}}>
        <Tabs.Screen
            name="index"
            options={{
                title: "Home", tabBarIcon: ({ color, size }) => (
                    <Entypo name="home" color={color} size={size} />
                )
            }}
        />
         <Tabs.Screen
            name="(voices)/list"
            options={{
                title: "Voices", tabBarIcon: ({ color, size }) => (
                    <Entypo name="sound" color={color} size={size} />
                )
            }}
        />
        <Tabs.Screen
            name="createVoice"
            options={{
                title: "Create Voice",  
                tabBarIcon: ({ color, size }) => (
                    <Entypo name="plus" color={color} size={size} />
                ),
            }}
        />
          <Tabs.Screen
            name="news"
            options={{
                title: "News", tabBarIcon: ({ color, size }) => (
                    <Entypo name="news" color={color} size={size} />
                )
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: "Profile", tabBarIcon: ({ color, size }) => (
                    <Feather name="user" color={color} size={size} />
                )
            }}
        />


        <Tabs.Screen
            name="(voices)/map"
            options={{
                href: null,
            }}
        />
      

    </Tabs>
}