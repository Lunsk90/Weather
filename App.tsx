/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import WeatherScreen from './src/components/WeatherScreen';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>
          App de Clima
        </Text>
        <WeatherScreen />
      </View>
    </QueryClientProvider>
  );
};

export default App;
