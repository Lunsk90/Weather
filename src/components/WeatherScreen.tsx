/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, Button, Text, ActivityIndicator} from 'react-native';
import {useQuery} from 'react-query';
import axios from 'axios';

const API_KEY = 'gCcnH3oA1pUguWvTFNd1ZaSHbCtVHTLk'; // Reemplaza con tu clave de API

const WeatherScreen: React.FC = () => {
  const [location, setLocation] = useState('');
  const {isLoading, isError, data, error} = useQuery(
    ['weather', location],
    async () => {
      try {
        const response = await axios.get(
          `https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature&timesteps=1h&units=metric&apikey=gCcnH3oA1pUguWvTFNd1ZaSHbCtVHTLk'${API_KEY}`,
        );
        return response.data;
      } catch (error) {
        //@ts-ignore
        throw (error.response?.data || {message: 'Error desconocido'}) as any;
      }
    },
  );

  const handleSearch = () => {
    // Realiza la búsqueda al hacer clic en el botón
    if (location) {
      setLocation(location.trim());
    }
  };

  return (
    <View>
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Ingrese un lugar"
        style={{borderWidth: 1, padding: 10, marginBottom: 10}}
      />
      <Button title="Buscar" onPress={handleSearch} />

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {isError && <Text>Error: {(error as {message?: string})?.message}</Text>}

      {data && (
        <Text>
          Temperatura en {location}:{' '}
          {data.data.timelines[0].intervals[0].values.temperature_2m}°C
        </Text>
      )}
    </View>
  );
};

export default WeatherScreen;
