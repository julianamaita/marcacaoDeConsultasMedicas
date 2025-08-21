// Importa React para criação do componente funcional
import React from 'react';
// Importa styled-components para estilização declarativa
import styled from 'styled-components/native';
// ViewStyle é usado para tipar estilos que podem ser passados via props
import { ViewStyle } from 'react-native';
// ListItem e Avatar são componentes prontos do react-native-elements
import { ListItem, Avatar } from 'react-native-elements';
// Importa o tema centralizado para manter consistência visual
import theme from '../styles/theme';

// Interface que representa um médico
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string; // URL da foto do médico
}

// Props que o componente DoctorList recebe
interface DoctorListProps {
  doctors: Doctor[]; // Lista de médicos a serem exibidos
  onSelectDoctor: (doctor: Doctor) => void; // Callback ao selecionar um médico
  selectedDoctorId?: string; // ID do médico atualmente selecionado (opcional)
  style?: ViewStyle; // Estilo adicional para o container externo (opcional)
}

// Componente funcional DoctorList
const DoctorList: React.FC<DoctorListProps> = ({
  doctors,
  onSelectDoctor,
  selectedDoctorId,
  style,
}) => {
  return (
    // Container principal, pode receber estilos externos via props
    <Container style={style}>
      {doctors.map((doctor) => (
        <ListItem
          key={doctor.id} // Usa id único do médico como key
          onPress={() => onSelectDoctor(doctor)} // Dispara callback ao clicar
          containerStyle={[
            styles.listItem, // Estilo base
            selectedDoctorId === doctor.id && styles.selectedItem, // Aplica estilo extra se estiver selecionado
          ]}
        >
          {/* Avatar com imagem do médico */}
          <Avatar
            size="medium"
            rounded
            source={{ uri: doctor.image }}
            containerStyle={styles.avatar}
          />
          {/* Conteúdo textual dentro do ListItem */}
          <ListItem.Content>
            <ListItem.Title style={styles.name}>{doctor.name}</ListItem.Title>
            <ListItem.Subtitle style={styles.specialty}>
              {doctor.specialty}
            </ListItem.Subtitle>
          </ListItem.Content>
          {/* Chevron (setinha à direita indicando que é clicável) */}
          <ListItem.Chevron />
        </ListItem>
      ))}
    </Container>
  );
};

// Estilos usados nos itens da lista
const styles = {
  listItem: {
    borderRadius: 8, // Borda arredondada
    marginVertical: 4, // Espaçamento vertical entre itens
    backgroundColor: theme.colors.background, // Fundo neutro
    borderWidth: 1,
    borderColor: theme.colors.border, // Borda sutil
  },
  selectedItem: {
    backgroundColor: theme.colors.primary + '20', // Fundo levemente colorido (transparente)
    borderColor: theme.colors.primary, // Destaque na borda
  },
  avatar: {
    backgroundColor: theme.colors.primary, // Cor fallback caso não carregue a imagem
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text, // Texto principal
  },
  specialty: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.7, // Deixa o subtítulo mais suave
  },
};

// Container externo para espaçamento da lista
const Container = styled.View`
  margin-bottom: 15px;
`;

export default DoctorList;
