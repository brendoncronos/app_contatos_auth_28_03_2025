import { useState } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import { globalStyles } from '../styles/global';
import * as ImagePicker from 'expo-image-picker';
import api from '../lib/api';

interface Props {
  valores?: any;
  onSubmit: (dados: any) => void;
}

export default function FormContato({ valores, onSubmit }: Props) {
  const [nome, setNome] = useState(valores?.nome || '');
  const [email, setEmail] = useState(valores?.email || '');
  const [telefone, setTelefone] = useState(valores?.telefone || '');
  const [endereco, setEndereco] = useState(valores?.endereco || '');
  const [foto, setFoto] = useState(valores?.foto || '');

  const escolherImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!resultado.canceled && resultado.assets.length > 0) {
      const file = resultado.assets[0];
      const form = new FormData();
      form.append('foto', {
        uri: file.uri,
        name: file.fileName || 'imagem.jpg',
        type: file.mimeType || 'image/jpeg'
      } as any);
      const res = await api.post('/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFoto(res.data.nomeArquivo);

      
    }
  };

  const enviar = () => {
    onSubmit({ nome, email, telefone, endereco, foto });
  };

  return (
    <View>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={globalStyles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={globalStyles.input} />
      <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} style={globalStyles.input} />
      <TextInput placeholder="Endereço" value={endereco} onChangeText={setEndereco} style={globalStyles.input} />
      <Button title="Selecionar imagem" onPress={escolherImagem} />
      {foto && <Image source={{ uri: `https://aula-27-03-5sqc.onrender.com/uploads/${foto}` }} style={{ width: 100, height: 100 }} />}
      <Button title="Salvar" onPress={enviar} />
    </View>
  );
}
