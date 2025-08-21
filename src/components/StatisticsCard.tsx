// Importa React para criação do componente
import React from 'react';
// styled-components para estilização
import styled from 'styled-components/native';
// ViewStyle para permitir passar estilos adicionais via props
import { ViewStyle } from 'react-native';
// Tema centralizado (cores, etc.)
import theme from '../styles/theme';

// Tipagem das props do componente StatisticsCard
interface StatisticsCardProps {
  title: string;               // Título do card (ex: "Consultas realizadas")
  value: string | number;      // Valor principal exibido no card
  subtitle?: string;           // Texto auxiliar opcional (ex: "Últimos 30 dias")
  color?: string;              // Cor de destaque (default: tema primário)
  icon?: React.ReactNode;      // Ícone opcional exibido ao lado do título
  style?: ViewStyle;           // Estilos extras opcionais aplicados ao container
}

// Componente funcional
const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  subtitle,
  color = theme.colors.primary, // Cor padrão caso não seja passada
  icon,
  style,
}) => {
  return (
    // Container estilizado recebe a cor como prop
    <Container style={style} color={color}>
      {/* Cabeçalho: ícone opcional + título */}
      <Header>
        {icon && <IconContainer>{icon}</IconContainer>}
        <Title>{title}</Title>
      </Header>

      {/* Valor principal do card, colorido conforme prop */}
      <Value color={color}>{value}</Value>

      {/* Subtitle aparece apenas se for passado */}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Container>
  );
};

// Container principal do card
const Container = styled.View<{ color: string }>`
  background-color: ${theme.colors.white}; // Fundo branco
  border-radius: 12px; // Bordas arredondadas
  padding: 16px; // Espaçamento interno
  margin: 8px; // Espaçamento externo
  min-height: 120px; // Altura mínima para consistência
  justify-content: space-between; // Distribui conteúdo verticalmente
  border-left-width: 4px; // Borda colorida na lateral
  border-left-color: ${(props) => props.color}; // Usa a cor recebida via prop
  shadow-color: ${theme.colors.text}; // Configurações de sombra (iOS)
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3; // Sombra no Android
`;

// Cabeçalho do card (ícone + título)
const Header = styled.View`
  flex-direction: row; // Ícone e texto lado a lado
  align-items: center; // Alinha verticalmente ao centro
  margin-bottom: 8px; // Espaço abaixo do cabeçalho
`;

// Container do ícone (só aparece se houver ícone)
const IconContainer = styled.View`
  margin-right: 8px; // Distância entre ícone e título
`;

// Texto do título
const Title = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 500;
  opacity: 0.8; // Deixa um pouco mais suave
`;

// Valor principal do card
const Value = styled.Text<{ color: string }>`
  font-size: 28px; // Grande destaque
  font-weight: bold;
  color: ${(props) => props.color}; // Cor dinâmica recebida como prop
  margin-bottom: 4px;
`;

// Texto do subtítulo (informação complementar)
const Subtitle = styled.Text`
  font-size: 12px;
  color: ${theme.colors.text};
  opacity: 0.6; // Mais discreto que o título
`;

export default StatisticsCard;
