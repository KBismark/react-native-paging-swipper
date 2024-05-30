import { ScreenHeight, ScreenWidth } from "../utils/window";
import { GetScrollRatio } from "../utils/scrolldata";
import { useEffect, useRef } from "react";
import { FlatListProps, ScrollView, ScrollViewProps, View, ViewProps } from "react-native"
import { ScrollView as ScrollableView, GestureHandlerRootView, FlatList as FlatListView, Swipeable, NativeViewGestureHandlerProps } from "react-native-gesture-handler";
import { Screen } from "./screen";
import { type GestureData } from "../utils/gesturedata";
import { onDoneScrolling } from "./scrollview";







export type ContainerProps<ItemT> = {
    // children: React.ReactNode|React.JSX.Element;
    gestureData: GestureData;
    sharableTopComponent?: React.ReactNode|React.JSX.Element;
    sharableBottomComponent?: React.ReactNode|React.JSX.Element;
    // ref: any;
    /**
     * 
     * @param index Screen is indexed starting from the number `1`
     */
    onScreen?:(index:number)=>void
}&(
    {
        horizontal: true;
        /** The width of a horizontal scrallable is always equals the full width of the screen */
        width?: 1;
        /** A Double between the range `0.{x} - 1`. `1` means 100% height. Default `1` */
        height?: number;
    }|
    {
        horizontal: false;
        /** A Double between the range `0.{x} - 1`. `1` means 100% width. Default `1` */
        width?: number;
        
        /** The height of a vertical scrallable is always equals the full height of the screen */
        height?: 1;
    }
)& React.PropsWithChildren<FlatListProps<ItemT> & React.RefAttributes<FlatListView<ItemT>> & NativeViewGestureHandlerProps>


export function ScreenContainer<ItemT = any>({
    horizontal, 
    gestureData, width,
    height, sharableBottomComponent,
    sharableTopComponent, onScreen,
    renderItem, 
    ...rest
}:ContainerProps<ItemT>){
    const ref = useRef<FlatListView>(null);
    const preCursor = gestureData.cursor;
    useEffect(()=>{
        (gestureData as any).width = width;
        (gestureData as any).height = height;
        gestureData.scrollToIndex = (index,options)=>{
            if(!ref.current){return}
            const screens = gestureData.screens;
            if(index>screens){
                index = screens;
            }else if(index<1){
                index = 1;
            }
            gestureData.cursor = index;
            automaticscroll = true;
            const animate = options&&options.animate;
            ref.current.scrollToIndex(
                horizontal?
                {animated:animate,index: index-1}:
                {animated:animate,index: index-1}
            );
        };
        if(gestureData.cursor!==preCursor&&gestureData.screens<=preCursor){
            gestureData.scrollToIndex(preCursor,{animate: false})
        }
    },[]);
    gestureData.screens = rest.data?.length||1;
    if(!width||width>1){
        width = 1;
    }
    if(!height||height>1){
        height = 1;
    }
    if(!horizontal){
        gestureData.direction = 'vertical';
        height = ScreenHeight;
        width = width * ScreenWidth;
    }else{
        gestureData.direction = 'horizontal';
        height = height * ScreenHeight;
        width = ScreenWidth;
    }
    gestureData.width = width;
    gestureData.height = height;
    let automaticscroll = false;
    let scrollData: ReturnType<typeof GetScrollRatio> = {} as any;
    let timeout:any = undefined;
    
    const activateScrollEndCallback = () => {
                
        onScreen&&onScreen( gestureData.cursor )
        automaticscroll = false;
    }
    const onDoneScrollingCallback = (data:any)=>{
        automaticscroll = true;
        data.index = gestureData.cursor-1;
        data.animated = !false;
        // ref.current?.scrollToIndex(data);
        // timeout = setTimeout(activateScrollEndCallback, 10);
        activateScrollEndCallback()
    }
    
    const onScrollEnd = horizontal? (e: any)=>{
        if(automaticscroll){ return}
        clearTimeout(timeout);
        scrollData = GetScrollRatio(e); 
        // timeout = setTimeout(()=>{
            onDoneScrolling({
                length:width,direction:'x',gestureData:gestureData,
                offset:scrollData.offset,callback: onDoneScrollingCallback
            })
        // }, 0);
    }
    : (e:any)=>{
        if(automaticscroll){ return}
        clearTimeout(timeout);
        scrollData = GetScrollRatio(e);
        // timeout = setTimeout(()=>{
            onDoneScrolling({
                length:height,direction:'y',gestureData:gestureData,
                offset:scrollData.offset,callback: onDoneScrollingCallback
            })

        // }, 0);
    };
    const RenderItem = renderItem;
    const EmptyScren = ()=>{
        return <Screen gestureData={gestureData}></Screen>
    }
    if((rest as any).isNested){
        return (
            <View style={{height: height, width: width, position:'relative'}}>
                {sharableTopComponent}
                <FlatListView 
                    {...rest}
                    renderItem={
                        RenderItem?
                        (props)=>{
                            return <Screen gestureData={gestureData}><RenderItem {...props} /></Screen>
                        }:
                        EmptyScren
                    }
                    showsHorizontalScrollIndicator={false} 
                    showsVerticalScrollIndicator={false}
                    ref={ref as any} 
                    decelerationRate={'fast'} 
                    horizontal={horizontal} 
                    snapToInterval={horizontal?width:height}
                    onMomentumScrollEnd={onScrollEnd}
                />
                {sharableBottomComponent}
            </View>
        )
    }
    return (
        <GestureHandlerRootView style={{height: height, width: width, position:'relative'}}>
            {sharableTopComponent}
            <FlatListView 
                {...rest}
                renderItem={
                    RenderItem?
                    (props)=>{
                        return <Screen gestureData={gestureData}><RenderItem {...props} /></Screen>
                    }:
                    EmptyScren
                }
                showsHorizontalScrollIndicator={false} 
                showsVerticalScrollIndicator={false}
                ref={ref as any} 
                decelerationRate={'fast'} 
                horizontal={horizontal} 
                snapToInterval={horizontal?width:height}
                onMomentumScrollEnd={onScrollEnd}
            />
            {sharableBottomComponent}
        </GestureHandlerRootView>
    )
}


