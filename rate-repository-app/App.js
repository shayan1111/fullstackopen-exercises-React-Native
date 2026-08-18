import { StyleSheet, View } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client/react';
import { PaperProvider } from 'react-native-paper';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';

import AuthStorage from './src/utils/authStorage';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <PaperProvider>
        <NativeRouter>
          <ApolloProvider client={apolloClient}>
            <Main />
          </ApolloProvider>
        </NativeRouter>
      </PaperProvider>
    </View>
  );
}

