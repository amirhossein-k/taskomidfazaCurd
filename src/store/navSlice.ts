import { createSlice, PayloadAction } from "@reduxjs/toolkit"



interface navState{
    navOpen :boolean

}


const initialState : navState={
    navOpen:false
}

const navSlice = createSlice({
    name:'nav',
    initialState,
    reducers:{
        setNavOpen : (state,action:PayloadAction<boolean>)=>{
            state.navOpen = action.payload
        }
    }
})


export const {
    setNavOpen
}= navSlice.actions

export default navSlice.reducer