import { useEffect,useState } from "react";
import { FlatList,View } from "react-native";
import { Caption,List, Snackbar } from "react-native-paper";
import axios from "axios";

export default function HomeScreen ({navigation}) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        loadNotes()

        const subscribe = navigation.addListener('focus', () => {
            loadNotes();
        });

        return subscribe;
    },[])

    function loadNotes()
    {
        axios.get('http://192.168.1.14/notecrud/notecrud.php')
        .then(({data}) => {
            setNotes(data.data);
            setLoading(false);
        })
        .catch((e) =>  {
            console.error(e);
            setError('An Error occured, please try Again later.');
            setLoading(false);
        });
    }


        return (
            <View>
                {!loading && !notes.length && <Caption style={{textAlign: 'center', marginTop: '10'}}>You Have No Notes</Caption>}
                <FlatList
                data={notes}
                renderItem={({item}) => (
                    <List.Item
                    key={item.id}
                    judul={item.attributes.judul}
                    deskripsi={item.attributes.deskripsi}
                    onPress={() => navigation.navigate('Editor', {note: item})}/>
                )}
                refreshing={loading}
                onRefresh={loadNotes}
                style={{width: '100%', height: '100%'}}
                />
                <Snackbar visible={error.length > 0} onDismiss={() => setError('')}>{error}</Snackbar>
            </View>
        )
    }
