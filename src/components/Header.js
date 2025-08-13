"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderTitle = exports.HeaderContainer = void 0;
var react_native_1 = require("react-native");
var native_1 = require("styled-components/native");
var theme_1 = require("../styles/theme");
exports.HeaderContainer = native_1.default.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  padding-top: ", "px;\n  padding: ", "px;\n  elevation: 4;\n  shadow-color: #000;\n  shadow-opacity: 0.3;\n  shadow-radius: 4px;\n  shadow-offset: 0px 2px;\n"], ["\n  background-color: ", ";\n  padding-top: ", "px;\n  padding: ", "px;\n  elevation: 4;\n  shadow-color: #000;\n  shadow-opacity: 0.3;\n  shadow-radius: 4px;\n  shadow-offset: 0px 2px;\n"])), theme_1.default.colors.primary, react_native_1.StatusBar.currentHeight, theme_1.default.spacing.medium);
exports.HeaderTitle = native_1.default.Text(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color: ", ";\n  font-size: ", "px;\n  font-weight: ", ";\n"], ["\n  color: ", ";\n  font-size: ", "px;\n  font-weight: ", ";\n"])), theme_1.default.colors.white, theme_1.default.typography.title.fontSize, theme_1.default.typography.title.fontWeight);
var templateObject_1, templateObject_2;
