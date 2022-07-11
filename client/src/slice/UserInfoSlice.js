import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    users :null
}


export const UserSlice = createSlice({
    name:'userInfo',
    initialState,
    reducers:{
        storingUserInfo:(state,action)=>{
            state.users = action.payload
            console.log(action.payload)
            localStorage.setItem('token', JSON.stringify(action.payload))
        }
    }
})

export const {storingUserInfo} = UserSlice.actions

export default UserSlice.reducer
