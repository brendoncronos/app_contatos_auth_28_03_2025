import { View } from 'react-native';
import { useRouter } from 'expo-router';
import FormContato from '../../components/FormContato';
import api from '../../lib/api';
import { globalStyles } from '../../styles/global';

export default function NovoContato() {
  const router = useRouter();

  const salvar = async (dados: any) => {
    await api.post('/contatos', dados);
    router.back();
  };

  return (
    <View style={globalStyles.container}>
      <FormContato onSubmit={salvar} />
    </View>
  );
}