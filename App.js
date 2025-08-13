"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var styled_components_1 = require("styled-components");
var routes_1 = require("./src/routes");
var theme_1 = require("./src/styles/theme");
function App() {
    return (<styled_components_1.ThemeProvider theme={theme_1.default}>
      <native_1.NavigationContainer>
        <react_native_1.StatusBar barStyle="light-content" backgroundColor={theme_1.default.colors.primary}/>
        <routes_1.default />
      </native_1.NavigationContainer>
    </styled_components_1.ThemeProvider>);
}
