import { type NativeScrollEvent, type NativeSyntheticEvent } from "react-native";


export function GetScrollRatio(e: NativeSyntheticEvent<NativeScrollEvent>): {
    minX: number;
    minY: number;
    x: number;
    y: number;
    width: number;
    height: number;
    offset:{
        x: number;
        y: number;
    }
}{
    
    const eventData = e.nativeEvent;
    const {x,y} = eventData.contentOffset;
    const {width: visibleWidth,height: visibleHeight} = eventData.layoutMeasurement;
    const {width: contentWidth, height: contentHeight} = eventData.contentSize;
    const data = {
        minX: undefined,
        minY: undefined,
        x: undefined,
        y: undefined,
        offset: {x,y},
        width: contentWidth,
        height: contentHeight
    } as any
    // Horizontal
    let scrolledWidthRatio = data.minX = visibleWidth/contentWidth;
    if(x>=0){
        scrolledWidthRatio = (x + visibleWidth)/contentWidth;
        if(scrolledWidthRatio>1){
            scrolledWidthRatio = 1;
        }
    }
    data.x = scrolledWidthRatio;
    // Vertical
    let scrolledHeightRatio = data.minY = visibleHeight/contentHeight;
    if(x>=0){
        scrolledHeightRatio = (y + visibleHeight)/contentHeight;
        if(scrolledHeightRatio>1){
            scrolledHeightRatio = 1;
        }
    }
    data.y = scrolledHeightRatio;
    
    return data;
}