"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_elements_1 = require("react-native-elements");
var native_1 = require("styled-components/native");
var Header_1 = require("../components/Header");
var theme_1 = require("../styles/theme");
var ProfileScreen = function (_a) {
    var navigation = _a.navigation;
    return (<Container>
            <Header_1.HeaderContainer>
                <Header_1.HeaderTitle>Meu Perfil</Header_1.HeaderTitle>
            </Header_1.HeaderContainer>

            <Content>
                <react_native_elements_1.Button title="Voltar" icon={{
            name: 'arrow-left',
            type: 'font-awesome',
            size: 20,
            color: 'white'
        }} buttonStyle={{
            backgroundColor: theme_1.default.colors.primary,
            borderRadius: 8,
            padding: 12,
            marginBottom: 20
        }} onPress={function () { return navigation.goBack(); }}/>

                <ProfileInfo>
                    <Avatar source={{ uri: 'https://via.placeholder.com/150' }}/>
                    <Name>Nome do Usuário</Name>
                    <Email>usuario@email.com</Email>
                </ProfileInfo>
            </Content>
        </Container>);
};
var Container = native_1.default.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1;\n  background-color: ", ";\n"], ["\n  flex: 1;\n  background-color: ", ";\n"])), theme_1.default.colors.background);
var Content = native_1.default.View(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  flex: 1;\n  padding: ", "px;\n"], ["\n  flex: 1;\n  padding: ", "px;\n"])), theme_1.default.spacing.medium);
var ProfileInfo = native_1.default.View(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  align-items: center;\n  margin-top: ", "px;\n"], ["\n  align-items: center;\n  margin-top: ", "px;\n"])), theme_1.default.spacing.large);
var Avatar = native_1.default.Image(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 120px;\n  height: 120px;\n  border-radius: 60px;\n  margin-bottom: ", "px;\n"], ["\n  width: 120px;\n  height: 120px;\n  border-radius: 60px;\n  margin-bottom: ", "px;\n"])), theme_1.default.spacing.medium);
var Name = native_1.default.Text(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-size: ", "px;\n  font-weight: ", ";\n  color: ", ";\n  margin-bottom: ", "px;\n"], ["\n  font-size: ", "px;\n  font-weight: ", ";\n  color: ", ";\n  margin-bottom: ", "px;\n"])), theme_1.default.typography.title.fontSize, theme_1.default.typography.title.fontWeight, theme_1.default.colors.text, theme_1.default.spacing.small);
var Email = native_1.default.Text(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-size: ", "px;\n  color: ", ";\n  opacity: 0.8;\n"], ["\n  font-size: ", "px;\n  color: ", ";\n  opacity: 0.8;\n"])), theme_1.default.typography.body.fontSize, theme_1.default.colors.text);
exports.default = ProfileScreen;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
