import { View, ViewProps } from "react-native"
import { type ContainerProps, type GestureData, ScreenContainer } from "@/components/scrollview";

export const Scrollable = {
    getGestureData(): GestureData{
        return {
            direction: 'horizontal',
            cursor: 1,
        } as any
    },
    ScreenContainer,
    NestedScreenContainer(props: ContainerProps){
        (props as any).isNested = true;
        return <ScreenContainer {...props}/>
    },
    Screen: (props: ViewProps&{
        gestureData: GestureData;
    })=>{

        return (
            <View {...props} style={[props.style,{width: props.gestureData.width, height: props.gestureData.height, }]}>
                {props.children}
            </View>
        )
    },
    FlatListScreen: undefined,
    NestedScrollViewScreen: undefined,
    NestedFlatListScreen: undefined,
}


