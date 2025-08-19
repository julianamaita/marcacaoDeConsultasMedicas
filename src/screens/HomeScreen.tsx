import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { HeaderContainer, HeaderTitle } from '../components/Header';
import theme from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '../types/appointments';
import { Doctor } from '../types/doctors';
import { RootStackParamList } from '../types/navigation';
import { useFocusEffect } from '@react-navigation/native';

/**
 * Tipagem das props da HomeScreen, integrando com a navegação
 */
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

/**
 * Lista fixa de médicos mockada para exibição
 */
const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. João Silva',
    specialty: 'Cardiologista',
    image: 'https://mighty.tools/mockmind-api/content/human/91.jpg',
  },
  ...
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Estado que armazena consultas salvas no AsyncStorage
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  // Controle do "puxar para atualizar"
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Carrega consultas armazenadas no AsyncStorage
   */
  const loadAppointments = async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem('appointments');
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  };

  /**
   * useFocusEffect → recarrega consultas sempre que a tela volta ao foco
   */
  useFocusEffect(
    React.useCallback(() => {
      loadAppointments();
    }, [])
  );

  /**
   * Função de refresh (pull-to-refresh)
   */
  const onRefresh = async () => {
    setRefreshing(true);
    await loadAppointments();
    setRefreshing(false);
  };

  /**
   * Busca os dados do médico pelo id associado à consulta
   */
  const getDoctorInfo = (doctorId: string): Doctor | undefined => {
    return doctors.find(doctor => doctor.id === doctorId);
  };

  /**
   * Renderização de cada card de consulta
   */
  const renderAppointment = ({ item }: { item: Appointment }) => {
    const doctor = getDoctorInfo(item.doctorId);
    
    return (
      <AppointmentCard>
        <DoctorImage source={{ uri: doctor?.image || 'https://via.placeholder.com/100' }} />
        <InfoContainer>
          <DoctorName>{doctor?.name || 'Médico não encontrado'}</DoctorName>
          <DoctorSpecialty>{doctor?.specialty || 'Especialidade não encontrada'}</DoctorSpecialty>
          <DateTime>{new Date(item.date).toLocaleDateString()} - {item.time}</DateTime>
          <Description>{item.description}</Description>
          <Status status={item.status}>
            {item.status === 'pending' ? 'Pendente' : 'Confirmado'}
          </Status>
          {/* Botões de ação para editar e deletar */}
          <ActionButtons>
            <ActionButton>
              <Icon name="edit" type="material" size={20} color={theme.colors.primary} />
            </ActionButton>
            <ActionButton>
              <Icon name="delete" type="material" size={20} color={theme.colors.error} />
            </ActionButton>
          </ActionButtons>
        </InfoContainer>
      </AppointmentCard>
    );
  };

  return (
    <Container>
      {/* Cabeçalho */}
      <HeaderContainer>
        <HeaderTitle>Minhas Consultas</HeaderTitle>
      </HeaderContainer>

      <Content>
        {/* Botão para agendar nova consulta */}
        <Button
          title="Agendar Nova Consulta"
          icon={
            <FontAwesome
              name="calendar-plus-o"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
          }
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            borderRadius: 8,
            padding: 12,
            marginBottom: theme.spacing.medium
          }}
          onPress={() => navigation.navigate('CreateAppointment')}
        />

        {/* Lista de consultas */}
        <AppointmentList
          data={appointments}
          keyExtractor={(item: Appointment) => item.id}
          renderItem={renderAppointment}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <EmptyText>Nenhuma consulta agendada</EmptyText>
          }
        />
      </Content>
    </Container>
