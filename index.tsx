import { type ContainerProps, ScreenContainer as ScrollViewScreen } from "./components/scrollview";
import { Screen } from "./components/screen";
import { getGestureData } from "./utils/gesturedata";
import { ScreenContainer as FlatListScreen, ContainerProps as FlatListContainerProps } from "./components/flatlist";

export const Scrollable = {
    getGestureData,
    NestedScrollScreenContainer(props: ContainerProps){
        (props as any).isNested = true;
        return <ScrollViewScreen {...props}/>
    },
    NestedFlatListScreenContainer<T=any>(props: FlatListContainerProps<T>){
        (props as any).isNested = true;
        return <FlatListScreen {...props}/>
    },
    Screen: Screen,
    FlatListScreenContainer: FlatListScreen,
    ScrollViewScreenContainer: ScrollViewScreen
}


