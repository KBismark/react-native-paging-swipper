import { type ContainerProps, ScreenContainer as ScrollViewScreen } from "./components/scrollview";
import { Screen } from "./components/screen";
import { getGestureData } from "./utils/gesturedata";
import { ScreenContainer as FlatListScreen, ContainerProps as FlatListContainerProps } from "./components/flatlist";

export const Scrollable = {
    getGestureData,
    NestedScrollScreenContainer(props: ContainerProps){
        return <ScrollViewScreen {...props} isNested={true} />
    },
    NestedFlatListScreenContainer<T=any>(props: FlatListContainerProps<T>){
        return <FlatListScreen {...props} isNested={true} />
    },
    Screen: Screen,
    FlatListScreenContainer: FlatListScreen,
    ScrollViewScreenContainer: ScrollViewScreen
}


