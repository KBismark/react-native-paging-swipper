
export const getGestureData = ():GestureData=>{
    return {
        direction: 'horizontal',
        cursor: 1,
    } as any
}

export type GestureData = {
    direction: 'horizontal'|'vertical';
    cursor: number;
    screens: number;
    width: number;
    height:number;
    scrollToIndex?:(index:number,options?:{animate:boolean})=>void
}
