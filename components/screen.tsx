import { type GestureData } from "@/utils/gesturedata";
import { View, ViewProps } from "react-native";


export const Screen = (props: ViewProps&{
    gestureData: GestureData;
})=>{

    return (
        <View {...props} style={[props.style,{width: props.gestureData.width, height: props.gestureData.height, }]}>
            {props.children}
        </View>
    )
}