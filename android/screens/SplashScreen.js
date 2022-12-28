import React, {Component} from "react";
import { View, Text, ImageBackground } from "react-native";
import { StackActions } from "@react-navigation/native";

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.dispatch(StackActions.replace('Home'));

        }, 3000);
    }

    render() {
        return (
            <View>
                <ImageBackground source={require('../screens/images/notesdiary.png')} style={{width: '100%', height: '100%', position: "relative"}} />
            </View>
        );
    }

    
}
export default SplashScreen;