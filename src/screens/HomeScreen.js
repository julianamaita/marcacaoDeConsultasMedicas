"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var vector_icons_1 = require("@expo/vector-icons");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var native_2 = require("styled-components/native");
var Header_1 = require("../components/Header");
var theme_1 = require("../styles/theme");
var doctors = [
    {
        id: '1',
        name: 'Dr. João Silva',
        specialty: 'Cardiologista',
        image: 'https://mighty.tools/mockmind-api/content/human/91.jpg',
    },
    {
        id: '2',
        name: 'Dra. Maria Santos',
        specialty: 'Dermatologista',
        image: 'https://mighty.tools/mockmind-api/content/human/97.jpg',
    },
    {
        id: '3',
        name: 'Dr. Pedro Oliveira',
        specialty: 'Oftalmologista',
        image: 'https://mighty.tools/mockmind-api/content/human/79.jpg',
    },
];
var HomeScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = (0, react_1.useState)([]), appointments = _b[0], setAppointments = _b[1];
    var _c = (0, react_1.useState)(false), refreshing = _c[0], setRefreshing = _c[1];
    var loadAppointments = function () { return __awaiter(void 0, void 0, void 0, function () {
        var storedAppointments, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, async_storage_1.default.getItem('appointments')];
                case 1:
                    storedAppointments = _a.sent();
                    if (storedAppointments) {
                        setAppointments(JSON.parse(storedAppointments));
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Erro ao carregar consultas:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    (0, native_1.useFocusEffect)(react_1.default.useCallback(function () {
        loadAppointments();
    }, []));
    var onRefresh = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setRefreshing(true);
                    return [4 /*yield*/, loadAppointments()];
                case 1:
                    _a.sent();
                    setRefreshing(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var getDoctorInfo = function (doctorId) {
        return doctors.find(function (doctor) { return doctor.id === doctorId; });
    };
    var renderAppointment = function (_a) {
        var item = _a.item;
        var doctor = getDoctorInfo(item.doctorId);
        return (<AppointmentCard>
        <DoctorImage source={{ uri: (doctor === null || doctor === void 0 ? void 0 : doctor.image) || 'https://via.placeholder.com/100' }}/>
        <InfoContainer>
          <DoctorName>{(doctor === null || doctor === void 0 ? void 0 : doctor.name) || 'Médico não encontrado'}</DoctorName>
          <DoctorSpecialty>{(doctor === null || doctor === void 0 ? void 0 : doctor.specialty) || 'Especialidade não encontrada'}</DoctorSpecialty>
          <DateTime>{new Date(item.date).toLocaleDateString()} - {item.time}</DateTime>
          <Description>{item.description}</Description>
          <Status status={item.status}>
            {item.status === 'pending' ? 'Pendente' : 'Confirmado'}
          </Status>
          <ActionButtons>
            <ActionButton>
              <react_native_elements_1.Icon name="edit" type="material" size={20} color={theme_1.default.colors.primary}/>
            </ActionButton>
            <ActionButton>
              <react_native_elements_1.Icon name="delete" type="material" size={20} color={theme_1.default.colors.error}/>
            </ActionButton>
          </ActionButtons>
        </InfoContainer>
      </AppointmentCard>);
    };
    return (<Container>
      <Header_1.HeaderContainer>
        <Header_1.HeaderTitle>Minhas Consultas</Header_1.HeaderTitle>
      </Header_1.HeaderContainer>

      <Content>
        <react_native_elements_1.Button title="Agendar Nova Consulta" icon={<vector_icons_1.FontAwesome name="calendar-plus-o" size={20} color="white" style={{ marginRight: 8 }}/>} buttonStyle={{
            backgroundColor: theme_1.default.colors.primary,
            borderRadius: 8,
            padding: 12,
            marginBottom: theme_1.default.spacing.medium
        }} onPress={function () { return navigation.navigate('CreateAppointment'); }}/>

        <AppointmentList data={appointments} keyExtractor={function (item) { return item.id; }} renderItem={renderAppointment} refreshControl={<react_native_1.RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} ListEmptyComponent={<EmptyText>Nenhuma consulta agendada</EmptyText>}/>
      </Content>
    </Container>);
};
var Container = native_2.default.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1;\n  background-color: ", ";\n"], ["\n  flex: 1;\n  background-color: ", ";\n"])), theme_1.default.colors.background);
var Content = native_2.default.View(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  flex: 1;\n  padding: ", "px;\n"], ["\n  flex: 1;\n  padding: ", "px;\n"])), theme_1.default.spacing.medium);
var AppointmentList = (0, native_2.default)(react_native_1.FlatList)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex: 1;\n"], ["\n  flex: 1;\n"])));
var AppointmentCard = native_2.default.View(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background-color: ", ";\n  border-radius: 8px;\n  padding: ", "px;\n  margin-bottom: ", "px;\n  flex-direction: row;\n  align-items: center;\n  elevation: 2;\n  shadow-color: #000;\n  shadow-opacity: 0.1;\n  shadow-radius: 4px;\n  shadow-offset: 0px 2px;\n"], ["\n  background-color: ", ";\n  border-radius: 8px;\n  padding: ", "px;\n  margin-bottom: ", "px;\n  flex-direction: row;\n  align-items: center;\n  elevation: 2;\n  shadow-color: #000;\n  shadow-opacity: 0.1;\n  shadow-radius: 4px;\n  shadow-offset: 0px 2px;\n"])), theme_1.default.colors.white, theme_1.default.spacing.medium, theme_1.default.spacing.medium);
var DoctorImage = native_2.default.Image(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 60px;\n  height: 60px;\n  border-radius: 30px;\n  margin-right: ", "px;\n"], ["\n  width: 60px;\n  height: 60px;\n  border-radius: 30px;\n  margin-right: ", "px;\n"])), theme_1.default.spacing.medium);
var InfoContainer = native_2.default.View(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  flex: 1;\n"], ["\n  flex: 1;\n"])));
var DoctorName = native_2.default.Text(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font-size: ", "px;\n  font-weight: ", ";\n  color: ", ";\n"], ["\n  font-size: ", "px;\n  font-weight: ", ";\n  color: ", ";\n"])), theme_1.default.typography.subtitle.fontSize, theme_1.default.typography.subtitle.fontWeight, theme_1.default.colors.text);
var DoctorSpecialty = native_2.default.Text(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  font-size: ", "px;\n  color: ", ";\n  opacity: 0.8;\n  margin-bottom: 4px;\n"], ["\n  font-size: ", "px;\n  color: ", ";\n  opacity: 0.8;\n  margin-bottom: 4px;\n"])), theme_1.default.typography.body.fontSize, theme_1.default.colors.text);
var DateTime = native_2.default.Text(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  font-size: ", "px;\n  color: ", ";\n  margin-top: 4px;\n"], ["\n  font-size: ", "px;\n  color: ", ";\n  margin-top: 4px;\n"])), theme_1.default.typography.body.fontSize, theme_1.default.colors.primary);
var Description = native_2.default.Text(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  font-size: ", "px;\n  color: ", ";\n  opacity: 0.8;\n  margin-top: 4px;\n"], ["\n  font-size: ", "px;\n  color: ", ";\n  opacity: 0.8;\n  margin-top: 4px;\n"])), theme_1.default.typography.body.fontSize, theme_1.default.colors.text);
var Status = native_2.default.Text(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  font-size: ", "px;\n  color: ", ";\n  margin-top: 4px;\n  font-weight: bold;\n"], ["\n  font-size: ", "px;\n  color: ", ";\n  margin-top: 4px;\n  font-weight: bold;\n"])), theme_1.default.typography.body.fontSize, function (props) { return props.status === 'pending' ? theme_1.default.colors.error : theme_1.default.colors.success; });
var ActionButtons = native_2.default.View(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  flex-direction: row;\n  justify-content: flex-end;\n  margin-top: ", "px;\n"], ["\n  flex-direction: row;\n  justify-content: flex-end;\n  margin-top: ", "px;\n"])), theme_1.default.spacing.small);
var ActionButton = (0, native_2.default)(react_native_1.TouchableOpacity)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  padding: ", "px;\n  margin-left: ", "px;\n"], ["\n  padding: ", "px;\n  margin-left: ", "px;\n"])), theme_1.default.spacing.small, theme_1.default.spacing.small);
var EmptyText = native_2.default.Text(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  text-align: center;\n  color: ", ";\n  opacity: 0.6;\n  margin-top: ", "px;\n"], ["\n  text-align: center;\n  color: ", ";\n  opacity: 0.6;\n  margin-top: ", "px;\n"])), theme_1.default.colors.text, theme_1.default.spacing.large);
exports.default = HomeScreen;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14;
