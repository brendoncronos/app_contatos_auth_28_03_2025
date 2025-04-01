import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api, { setAuthToken } from '../lib/api';
import { global } from '../styles/global';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const entrar = async () => {
    try {
      const { data } = await api.post('/usuarios/login', { email, senha });
      setAuthToken(data.token);
      router.push('/contatos');
    } catch (err) {
      Alert.alert('Erro ao entrar');
    }
  };

  return (
    <View style={global.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={global.input} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={global.input} />
      <Button title="Entrar" onPress={entrar} />
      <Button title="Cadastrar" onPress={() => router.push('/cadastro')} />
    </View>
  );
}
