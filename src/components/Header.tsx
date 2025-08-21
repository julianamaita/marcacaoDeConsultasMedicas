// Importa React para criação do componente
import React from 'react';
// styled-components para estilização declarativa
import styled from 'styled-components/native';
// Avatar pronto do react-native-elements
import { Avatar } from 'react-native-elements';
// Hook customizado para obter informações do usuário autenticado
import { useAuth } from '../contexts/AuthContext';
// Componente de sino de notificações
import NotificationBell from './NotificationBell';
// Tema centralizado (cores, etc.)
import theme from '../styles/theme';

// Componente de cabeçalho
const Header: React.FC = () => {
  // Obtém o usuário logado através do AuthContext
  const { user } = useAuth();

  // Caso não exista usuário logado, não renderiza nada
  if (!user) return null;

  return (
    <Container>
      {/* Bloco com informações do usuário */}
      <UserInfo>
        {/* Avatar do usuário (foto de perfil) */}
        <Avatar
          size="medium"
          rounded
          source={{ uri: user.image }}
          containerStyle={styles.avatar}
        />
        {/* Textos ao lado do avatar */}
        <TextContainer>
          <WelcomeText>Bem-vindo(a),</WelcomeText>
          <UserName>{user.name}</UserName>
        </TextContainer>
      </UserInfo>

      {/* Sino de notificações à direita */}
      <NotificationBell />
    </Container>
  );
};

// Estilo aplicado especificamente no Avatar
const styles = {
  avatar: {
    backgroundColor: theme.colors.primary, // Cor fallback se não carregar a imagem
  },
};

// Container principal do cabeçalho
const Container = styled.View`
  background-color: ${theme.colors.primary}; // Fundo do header
  padding: 16px; // Espaçamento interno
  flex-direction: row; // Organiza itens lado a lado
  justify-content: space-between; // Espaça elementos entre as extremidades
  align-items: center; // Centraliza verticalmente
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border}; // Linha de separação
`;

// Container que agrupa avatar e nome do usuário
const UserInfo = styled.View`
  flex-direction: row; // Avatar + texto lado a lado
  align-items: center;
  flex: 1; // Ocupa espaço disponível antes do sino
`;

// Container apenas para os textos ao lado do avatar
const TextContainer = styled.View`
  margin-left: 12px; // Distância entre avatar e textos
`;

// Texto de boas-vindas
const WelcomeText = styled.Text`
  font-size: 14px;
  color: ${theme.colors.white};
  opacity: 0.9; // Deixa o branco mais suave
`;

// Nome do usuário em destaque
const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.white};
`;

export default Header;
