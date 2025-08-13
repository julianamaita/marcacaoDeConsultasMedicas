"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppRoutes;
var native_stack_1 = require("@react-navigation/native-stack");
var CreateAppointmentScreen_1 = require("../screens/CreateAppointmentScreen");
var HomeScreen_1 = require("../screens/HomeScreen");
var ProfileScreen_1 = require("../screens/ProfileScreen");
var Stack = (0, native_stack_1.createNativeStackNavigator)();
function AppRoutes() {
    return (<Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
        }}>
            <Stack.Screen name="Home" component={HomeScreen_1.default}/>
            <Stack.Screen name="CreateAppointment" component={CreateAppointmentScreen_1.default}/>
            <Stack.Screen name="Profile" component={ProfileScreen_1.default}/>
        </Stack.Navigator>);
}
