import { createSlice, PayloadAction } from "@reduxjs/toolkit"



interface authState{
    name:string

}


const initialState : authState={
    name:''
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuth : (state,action:PayloadAction<string>)=>{
            state.name = action.payload
        }
    }
})


export const {
    setAuth
}= authSlice.actions

export default authSlice.reducer