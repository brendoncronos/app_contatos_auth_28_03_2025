import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../lib/api';
import { global } from '../styles/global';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const cadastrar = async () => {
    try {
      await api.post('/usuarios/registrar', { nome, email, senha });
      Alert.alert('Cadastro realizado');
      router.replace('/');
    } catch {
      Alert.alert('Erro no cadastro');
    }
  };

  return (
    <View style={global.container}>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={global.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={global.input} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={global.input} />
      <Button title="Cadastrar" onPress={cadastrar} />
    </View>
  );
}