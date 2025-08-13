"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var native_1 = require("styled-components/native");
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
var generateTimeSlots = function () {
    var slots = [];
    for (var hour = 9; hour < 18; hour++) {
        slots.push("".concat(hour.toString().padStart(2, '0'), ":00"));
        slots.push("".concat(hour.toString().padStart(2, '0'), ":30"));
    }
    return slots;
};
var AppointmentForm = function (_a) {
    var onSubmit = _a.onSubmit;
    var _b = (0, react_1.useState)(''), selectedDoctor = _b[0], setSelectedDoctor = _b[1];
    var _c = (0, react_1.useState)(''), dateInput = _c[0], setDateInput = _c[1];
    var _d = (0, react_1.useState)(''), selectedTime = _d[0], setSelectedTime = _d[1];
    var _e = (0, react_1.useState)(''), description = _e[0], setDescription = _e[1];
    var timeSlots = generateTimeSlots();
    var validateDate = function (inputDate) {
        var dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        var match = inputDate.match(dateRegex);
        if (!match)
            return false;
        var day = match[1], month = match[2], year = match[3];
        var date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        var today = new Date();
        var maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3));
        return date >= today && date <= maxDate;
    };
    var handleDateChange = function (text) {
        // Remove todos os caracteres não numéricos
        var numbers = text.replace(/\D/g, '');
        // Formata a data enquanto digita
        var formattedDate = '';
        if (numbers.length > 0) {
            if (numbers.length <= 2) {
                formattedDate = numbers;
            }
            else if (numbers.length <= 4) {
                formattedDate = "".concat(numbers.slice(0, 2), "/").concat(numbers.slice(2));
            }
            else {
                formattedDate = "".concat(numbers.slice(0, 2), "/").concat(numbers.slice(2, 4), "/").concat(numbers.slice(4, 8));
            }
        }
        setDateInput(formattedDate);
    };
    var handleSubmit = function () {
        if (!selectedDoctor || !selectedTime || !description) {
            alert('Por favor, preencha todos os campos');
            return;
        }
        if (!validateDate(dateInput)) {
            alert('Por favor, insira uma data válida (DD/MM/AAAA)');
            return;
        }
        var _a = dateInput.split('/'), day = _a[0], month = _a[1], year = _a[2];
        var date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        onSubmit({
            doctorId: selectedDoctor,
            date: date,
            time: selectedTime,
            description: description,
        });
    };
    var isTimeSlotAvailable = function (time) {
        // Aqui você pode adicionar lógica para verificar se o horário está disponível (Faremos isto nas próximas aulas)
        // Por exemplo, verificar se já existe uma consulta agendada para este horário
        return true;
    };
    return (<Container>
            <Title>Selecione o Médico</Title>
            <DoctorList>
                {doctors.map(function (doctor) { return (<DoctorCard key={doctor.id} selected={selectedDoctor === doctor.id} onPress={function () { return setSelectedDoctor(doctor.id); }}>
                        <DoctorImage source={{ uri: doctor.image }}/>
                        <DoctorInfo>
                            <DoctorName>{doctor.name}</DoctorName>
                            <DoctorSpecialty>{doctor.specialty}</DoctorSpecialty>
                        </DoctorInfo>
                    </DoctorCard>); })}
            </DoctorList>

            <Title>Data e Hora</Title>
            <react_native_elements_1.Input placeholder="Data (DD/MM/AAAA)" value={dateInput} onChangeText={handleDateChange} keyboardType="numeric" maxLength={10} containerStyle={InputContainer} errorMessage={dateInput && !validateDate(dateInput) ? 'Data inválida' : undefined}/>

            <TimeSlotsContainer>
                <TimeSlotsTitle>Horários Disponíveis:</TimeSlotsTitle>
                <TimeSlotsGrid>
                    {timeSlots.map(function (time) {
            var isAvailable = isTimeSlotAvailable(time);
            return (<TimeSlotButton key={time} selected={selectedTime === time} disabled={!isAvailable} onPress={function () { return isAvailable && setSelectedTime(time); }}>
                                <TimeSlotText selected={selectedTime === time} disabled={!isAvailable}>
                                    {time}
                                </TimeSlotText>
                            </TimeSlotButton>);
        })}
                </TimeSlotsGrid>
            </TimeSlotsContainer>

            <react_native_elements_1.Input placeholder="Descrição da consulta" value={description} onChangeText={setDescription} multiline numberOfLines={4} containerStyle={InputContainer}/>

            <SubmitButton title="Agendar Consulta" onPress={handleSubmit} buttonStyle={{
            backgroundColor: theme_1.default.colors.primary,
            borderRadius: 8,
            padding: 12,
            marginTop: 20,
        }}/>
        </Container>);
};
var Container = native_1.default.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: ", "px;\n"], ["\n  padding: ", "px;\n"])), theme_1.default.spacing.medium);
var Title = native_1.default.Text(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: ", "px;\n  font-weight: ", ";\n  color: ", ";\n  margin-bottom: ", "px;\n"], ["\n  font-size: ", "px;\n  font-weight: ", ";\n  color: ", ";\n  margin-bottom: ", "px;\n"])), theme_1.default.typography.subtitle.fontSize, theme_1.default.typography.subtitle.fontWeight, theme_1.default.colors.text, theme_1.default.spacing.medium);
var DoctorList = native_1.default.ScrollView(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-bottom: ", "px;\n"], ["\n  margin-bottom: ", "px;\n"])), theme_1.default.spacing.large);
var DoctorCard = (0, native_1.default)(react_native_1.TouchableOpacity)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  flex-direction: row;\n  align-items: center;\n  padding: ", "px;\n  background-color: ", ";\n  border-radius: 8px;\n  margin-bottom: ", "px;\n  elevation: 2;\n  shadow-color: #000;\n  shadow-opacity: 0.1;\n  shadow-radius: 4px;\n  shadow-offset: 0px 2px;\n"], ["\n  flex-direction: row;\n  align-items: center;\n  padding: ", "px;\n  background-color: ", ";\n  border-radius: 8px;\n  margin-bottom: ", "px;\n  elevation: 2;\n  shadow-color: #000;\n  shadow-opacity: 0.1;\n  shadow-radius: 4px;\n  shadow-offset: 0px 2px;\n"])), theme_1.default.spacing.medium, function (props) { return props.selected ? theme_1.default.colors.primary : theme_1.default.colors.white; }, theme_1.default.spacing.medium);
var DoctorImage = native_1.default.Image(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 60px;\n  height: 60px;\n  border-radius: 30px;\n  margin-right: ", "px;\n"], ["\n  width: 60px;\n  height: 60px;\n  border-radius: 30px;\n  margin-right: ", "px;\n"])), theme_1.default.spacing.medium);
var DoctorInfo = native_1.default.View(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  flex: 1;\n"], ["\n  flex: 1;\n"])));
var DoctorName = native_1.default.Text(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font-size: ", "px;\n  font-weight: ", ";\n  color: ", ";\n"], ["\n  font-size: ", "px;\n  font-weight: ", ";\n  color: ", ";\n"])), theme_1.default.typography.subtitle.fontSize, theme_1.default.typography.subtitle.fontWeight, theme_1.default.colors.text);
var DoctorSpecialty = native_1.default.Text(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  font-size: ", "px;\n  color: ", ";\n  opacity: 0.8;\n"], ["\n  font-size: ", "px;\n  color: ", ";\n  opacity: 0.8;\n"])), theme_1.default.typography.body.fontSize, theme_1.default.colors.text);
var TimeSlotsContainer = native_1.default.View(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  margin-bottom: ", "px;\n"], ["\n  margin-bottom: ", "px;\n"])), theme_1.default.spacing.large);
var TimeSlotsTitle = native_1.default.Text(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  font-size: ", "px;\n  color: ", ";\n  margin-bottom: ", "px;\n"], ["\n  font-size: ", "px;\n  color: ", ";\n  margin-bottom: ", "px;\n"])), theme_1.default.typography.body.fontSize, theme_1.default.colors.text, theme_1.default.spacing.small);
var TimeSlotsGrid = native_1.default.View(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  flex-direction: row;\n  flex-wrap: wrap;\n  gap: ", "px;\n"], ["\n  flex-direction: row;\n  flex-wrap: wrap;\n  gap: ", "px;\n"])), theme_1.default.spacing.small);
var TimeSlotButton = (0, native_1.default)(react_native_1.TouchableOpacity)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  background-color: ", ";\n  padding: ", "px ", "px;\n  border-radius: 8px;\n  border-width: 1px;\n  border-color: ", ";\n  opacity: ", ";\n"], ["\n  background-color: ", ";\n  padding: ", "px ", "px;\n  border-radius: 8px;\n  border-width: 1px;\n  border-color: ", ";\n  opacity: ", ";\n"])), function (props) {
    return props.disabled
        ? theme_1.default.colors.background
        : props.selected
            ? theme_1.default.colors.primary
            : theme_1.default.colors.white;
}, theme_1.default.spacing.small, theme_1.default.spacing.medium, function (props) {
    return props.disabled
        ? theme_1.default.colors.background
        : props.selected
            ? theme_1.default.colors.primary
            : theme_1.default.colors.text;
}, function (props) { return props.disabled ? 0.5 : 1; });
var TimeSlotText = (0, native_1.default)(react_native_elements_1.Text)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  font-size: ", "px;\n  color: ", ";\n"], ["\n  font-size: ", "px;\n  color: ", ";\n"])), theme_1.default.typography.body.fontSize, function (props) {
    return props.disabled
        ? theme_1.default.colors.text
        : props.selected
            ? theme_1.default.colors.white
            : theme_1.default.colors.text;
});
var InputContainer = {
    marginBottom: theme_1.default.spacing.medium,
    backgroundColor: theme_1.default.colors.white,
    borderRadius: 8,
    paddingHorizontal: theme_1.default.spacing.medium,
};
var SubmitButton = (0, native_1.default)(react_native_elements_1.Button)(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  margin-top: ", "px;\n"], ["\n  margin-top: ", "px;\n"])), theme_1.default.spacing.large);
exports.default = AppointmentForm;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14;
