import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext'; 
// Provedor de contexto de autenticação para toda a aplicação.

import { AppNavigator } from './src/navigation/AppNavigator'; 
// Responsável pela navegação principal do app (rotas e telas).

import { ThemeProvider } from 'styled-components/native'; 
// Fornece o tema para os componentes estilizados (styled-components).

import theme from './src/styles/theme'; 
// Arquivo de definição do tema (cores, fontes, etc.).

import { StatusBar } from 'react-native'; 
// Componente nativo para customizar a barra de status.

export default function App() {
  return (
    // Provedor de tema, deixando disponível o tema em toda a aplicação.
    <ThemeProvider theme={theme}> 
      {/* Provedor de autenticação, garantindo acesso ao contexto de login/usuário */}
      <AuthProvider>
        {/* Configuração da barra de status: cor e estilo dos ícones */}
        <StatusBar 
          barStyle="light-content" 
          backgroundColor={theme.colors.primary} 
        />
        {/* Componente principal de navegação */}
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
