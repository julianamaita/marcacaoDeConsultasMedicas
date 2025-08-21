// Importa o React e hooks para gerenciar estado.
import React from 'react';
// Permite criar componentes estilizados de forma declarativa.
import styled from 'styled-components/native';
// Modal para exibir sobreposição e ViewStyle para tipagem de estilos inline.
import { Modal, ViewStyle } from 'react-native';
// Botões e inputs prontos do react-native-elements.
import { Button, Input } from 'react-native-elements';
// Tema centralizado para cores e estilos consistentes.
import theme from '../styles/theme';

// Tipagem das props que o componente recebe.
interface AppointmentActionModalProps {
  visible: boolean; // Controla a visibilidade do modal
  onClose: () => void; // Função chamada ao fechar o modal
  onConfirm: (reason?: string) => void; // Função chamada ao confirmar (com ou sem motivo)
  actionType: 'confirm' | 'cancel'; // Tipo de ação que o modal executa
  appointmentDetails: { // Detalhes da consulta a serem exibidos
    patientName: string;
    doctorName: string;
    date: string;
    time: string;
    specialty: string;
  };
}

// Componente funcional tipado
const AppointmentActionModal: React.FC<AppointmentActionModalProps> = ({
  visible,
  onClose,
  onConfirm,
  actionType,
  appointmentDetails,
}) => {
  // Estado local para armazenar o motivo do cancelamento (quando aplicável)
  const [reason, setReason] = React.useState('');

  // Função chamada ao confirmar a ação
  const handleConfirm = () => {
    onConfirm(reason.trim() || undefined); // Passa o motivo, ou undefined se vazio
    setReason(''); // Reseta o campo motivo
    onClose(); // Fecha o modal
  };

  // Função chamada ao fechar sem confirmar
  const handleClose = () => {
    setReason(''); // Reseta motivo
    onClose(); // Fecha modal
  };

  // Booleano auxiliar para verificar se a ação é de cancelamento
  const isCancel = actionType === 'cancel';

  return (
    <Modal
      visible={visible} // Controla se o modal aparece ou não
      transparent // Permite ver o fundo escurecido
      animationType="slide" // Define animação de abertura
      onRequestClose={handleClose} // Chamado no Android ao clicar no back
    >
      <Overlay>
        <ModalContainer>
          <Header>
            <Title>
              {isCancel ? 'Cancelar Consulta' : 'Confirmar Consulta'}
            </Title>
          </Header>

          <Content>
            {/* Bloco que mostra as informações da consulta */}
            <AppointmentInfo>
              <InfoRow>
                <InfoLabel>Paciente:</InfoLabel>
                <InfoValue>{appointmentDetails.patientName}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Médico:</InfoLabel>
                <InfoValue>{appointmentDetails.doctorName}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Especialidade:</InfoLabel>
                <InfoValue>{appointmentDetails.specialty}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Data/Hora:</InfoLabel>
                <InfoValue>
                  {appointmentDetails.date} às {appointmentDetails.time}
                </InfoValue>
              </InfoRow>
            </AppointmentInfo>

            {/* Campo extra para motivo do cancelamento (só aparece se isCancel = true) */}
            {isCancel && (
              <ReasonContainer>
                <Input
                  label="Motivo do cancelamento (opcional)"
                  placeholder="Digite o motivo..."
                  value={reason}
                  onChangeText={setReason}
                  multiline // Permite várias linhas
                  numberOfLines={3}
                  containerStyle={styles.reasonInput}
                />
              </ReasonContainer>
            )}

            {/* Texto de confirmação, muda a cor conforme o tipo de ação */}
            <ConfirmationText isCancel={isCancel}>
              {isCancel
                ? 'Tem certeza que deseja cancelar esta consulta?'
                : 'Tem certeza que deseja confirmar esta consulta?'}
            </ConfirmationText>
          </Content>

          {/* Botões de ação */}
          <ButtonContainer>
            {/* Botão para fechar modal sem confirmar */}
            <Button
              title="Cancelar"
              onPress={handleClose}
              containerStyle={styles.cancelButton as ViewStyle}
              buttonStyle={styles.cancelButtonStyle}
            />
            {/* Botão de confirmação principal */}
            <Button
              title={isCancel ? 'Confirmar Cancelamento' : 'Confirmar'}
              onPress={handleConfirm}
              containerStyle={styles.confirmButton as ViewStyle}
              buttonStyle={[
                styles.confirmButtonStyle,
                {
                  backgroundColor: isCancel
                    ? theme.colors.error // Vermelho para cancelamento
                    : theme.colors.success, // Verde para confirmação
                },
              ]}
            />
          </ButtonContainer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};

// Estilos inline usados em componentes que não aceitam styled-components (como Input e Button)
const styles = {
  reasonInput: {
    marginBottom: 10,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  confirmButton: {
    flex: 1,
    marginLeft: 8,
  },
  cancelButtonStyle: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  },
  confirmButtonStyle: {
    paddingVertical: 12,
  },
};

// Estilização com styled-components
const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5); // Fundo escuro translúcido
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalContainer = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  width: 100%;
  max-width: 400px; // Responsivo em telas maiores
  shadow-color: ${theme.colors.text};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5; // Sombra no Android
`;

const Header = styled.View`
  padding: 20px 20px 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text};
  text-align: center;
`;

const Content = styled.View`
  padding: 20px;
`;

const AppointmentInfo = styled.View`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const InfoLabel = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 500;
`;

const InfoValue = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 400;
  flex: 1;
  text-align: right; // Alinha valores à direita
`;

const ReasonContainer = styled.View`
  margin-bottom: 16px;
`;

// Texto adaptável conforme tipo de ação (confirmar/cancelar)
const ConfirmationText = styled.Text<{ isCancel: boolean }>`
  font-size: 16px;
  color: ${(props) =>
    props.isCancel ? theme.colors.error : theme.colors.success};
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  padding: 0 20px 20px 20px;
`;

export default AppointmentActionModal;
