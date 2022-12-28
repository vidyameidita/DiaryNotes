import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, TextInput  } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import { style } from "./Style";

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            judul: '',
            deskripsi: '',
            listData:[],
            idEdit:null,

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

    klikSimpan(){
        if(this.state.judul == '' || this.state.deskripsi == '') {
            alert('Silahkan masukkan Title dan Content ');
        }else {
            if(this.state.idEdit){
                var urlAksi = this.url+"/?op=update&id="+this.state.idEdit;
            }else{
                var urlAksi = this.url+ "/?op=create";
            }
        

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
    async klikEdit(id) {
        await fetch(this.url+"/?op=detail&id="+id)
        .then ((response)=>response.json())
        .then((json)=> {
            this.setState({judul:json.data.result[0].judul});
            this.setState({deskripsi:json.data.result[0].deskripsi});
            this.setState({idEdit:id});
        })

    }
    async klikDelete(id) {
        await fetch(this.url+"/?op=delete&id="+id)
        .then((response)=>response.json())
        .then((json)=> {
            alert("Data Berhasil dihapus");
            this.ambilListData();
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    render() {
        return (
            <View style={style.viewWrapper}>
                <View style={style.viewData}>
                    {
                        this.state.listData.map((val,index)=> (
                            <View style={style.viewList} key={index}>
                                <Text style={style.textListJudul}
                                >{val.judul}</Text>
                                <Text style={style.textListEdit} 
                                onPress={()=>this.klikEdit(val.id)}>Edit</Text>
                                <Text style={style.textListDelete} 
                                onPress={()=>this.klikDelete(val.id)}>Delete</Text>

                            </View>
                        ))
                    }
                </View>
                <View style={style.viewForm}>
                    <TextInput
                    style={style.textInput}
                    placeholder="Title"
                    value={this.state.judul}
                    onChangeText={(text) =>this.setState({judul:text})}>
                    </TextInput>

                    <TextInput
                    style={{flex:1, marginBottom:5, backgroundColor: '#dedede',
                    borderRadius: 15, borderWidth:1,}}
                    placeholder="Start Typing..."
                    value={this.state.deskripsi}
                    onChangeText={(text) =>this.setState({deskripsi:text})}>
                    </TextInput>


                    <Button 
                    title="Save" onPress={()=>this.klikSimpan()}
                    ></Button>
                    
            </View>
            </View>
        )
    }
}

export default HomeScreen;