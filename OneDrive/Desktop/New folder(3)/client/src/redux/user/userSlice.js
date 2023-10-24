import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    loading:false,
    error:null,
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            console.log(action.payload);
            state.currentUser=action.payload,
            state.loading=false;
            state.error=null;
            //console.log(state);
        },
        signInFailure:()=>{
            state.error=action.payload;
            state.loading=false;
        }
    }
})


export const{signInFailure,signInStart,signInSuccess}=userSlice.actions;
export default userSlice.reducer;