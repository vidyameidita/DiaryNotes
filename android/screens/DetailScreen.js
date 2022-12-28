import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native";
import { style } from "./Style";
import { RichEditor } from "react-native-pell-rich-editor";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";

class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.klikSimpan = this.klikSimpan.bind(this)
        this.state = {
            judul: '',
            deskripsi: '',
            listData:[],
            
        };
        
        this.url = "http://192.168.98.20/DiaryNotes/DiaryNotes.php";
    }
    componentDidMount(){
        this.ambilListData()
    }

    async ambilListData() {
        await fetch(this.url)
        .then((response) => response.json())
        .then((json) => {
            console.log('Hasil yang didapat: '+JSON.stringify(json.data.result));
            this.setState({listData:json.data.result});
            
        })
        .catch((error) => {
            console.log(error);
        })

    }

    async klikSimpan(){
        if(this.state.judul == '' || this.state.deskripsi == '') {
            alert('Silahkan masukkan Title dan Content ');
        }else {
            if(this.state)
            var urlAksi = this.url+ "/?op=create";

            fetch(urlAksi, {
                method: 'post',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body:"judul="+this.state.judul+"&deskripsi="+this.state.deskripsi
            })
            .then((response)=>response.json())
            .then((json)=> {
                this.setState({judul:''});
                this.setState({deskripsi: ''});
                alert('Data berhasil diisi');
                this.ambilListData();
                
            })
           
        }
    }

    render() {

        return (
                <View style={style.viewForm}>
                    <TextInput
                    style={style.textInput}
                    placeholder="Title"
                    value={this.state.judul}
                    onChangeText={(text) =>this.setState({judul:text})}>
                    </TextInput>

                    <TextInput
                    style={style.textInput}
                    placeholder="Start Typing..."
                    value={this.state.deskripsi}
                    onChangeText={(text) =>this.setState({deskripsi:text})}>
                    </TextInput>

                    <Button 
                    title="Save" onPress={()=>this.klikSimpan()}
                    ></Button>
                    

                    
            </View>

        )
    }
}

export default DetailScreen;