import { ImageBackground, StyleSheet } from "react-native";


export const style = StyleSheet.create({
    viewWrapper: {
        flex: 1,
        backgroundColor: '#FF9999'
    },
    viewForm:{
        flex:2,
        padding:10
    },
    viewData: {
        flex:4,
        margin: 20,
        shadowColor: '#470000',
        shadowOffset: {width:0, height:12},
        shadowOpacity:0.2
    },
    textInput: {
        padding:10,
        fontSize: 15,
        borderRadius: 15,
        borderWidth:1,
        borderColor: '#CCCCC',
        marginBottom:10,
        backgroundColor: '#dedede'
    },
    viewList:{
        flexDirection: 'row',
        padding:7,
        borderBottomWidth:3,
        marginBottom: 5,
        borderBottomColor: '#dedede'
    },
    textListJudul:{
        flex:3,
        fontSize:19,
        fontWeight:'bold'
    },
    textListEdit: {
        color: 'blue',
        marginRight:20
    },
    textListDelete: {
        color: 'red'
    }
})