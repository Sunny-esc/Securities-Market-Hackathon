import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Book, Bookmark, Home, Layers, Play, Search } from "lucide-react-native";

import HomeScreen from "./screens/Home";
import QuizScreen from "./screens/Quiz";
import SavedScreen from "./screens/Saved";
import SearchScreen from "./screens/Search";
import TutorialsScreen from "./screens/Tutorials";
import VirtualTradingSimScreen from "./screens/VirtualTradingSim";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#6b7280",
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 1,
            paddingBottom: 4,
            height: 60,
          },
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Home: Home,
              Search: Search,
              Quiz: Layers,
              "Virtual Trading": Play,
              Tutorials: Book,
              Saved: Bookmark,
            };
            const Icon = icons[route.name];
            return <Icon size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Quiz" component={QuizScreen} />
        <Tab.Screen name="Virtual Trading" component={VirtualTradingSimScreen} />
        <Tab.Screen name="Tutorials" component={TutorialsScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
