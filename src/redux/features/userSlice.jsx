import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const API_URL = 'https://62e7898a93938a545bd3a5e4.mockapi.io/'
// NAX PETQA CANOTANAQ REDUX TOOLKITIN !!!!!!!

const initialState = {
    isLogin: false,
    loading: false,
    loginError: '',
    data: []
}

export const isRegisterAsync = createAsyncThunk(
    'user/isRegisterAsync',
    async (props) => {
        const usersResponse = await fetch(API_URL + props.endpoint, { method: 'GET' })
        const data = await usersResponse.json()
        if (data.every(elem => elem.email !== props.data.email)) {
            const response = await fetch(API_URL + props.endpoint, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(props.data),
            })
            const data = await response.json()
            return data
        } else {
            throw new Error('This email already exist !')
        }
    }
)

export const isLoginAsync = createAsyncThunk(
    'user/isLoginAsync',
    async (props) => {
        const usersResponse = await fetch(API_URL + props.endpoint, { method: 'GET' })
        const data = await usersResponse.json()
        let email = false
        const result = data.reduce((accumulator, currentValue) => {
            if (currentValue.email === props.data.email) {
                email = true
                if (currentValue.password === props.data.password) {
                    accumulator = currentValue
                }
            }
            return accumulator
        }, false)
        if (email) {
            if (result) {
                return result
            } else {
                throw new Error('Wrong password !')
            }

        } else {
            throw new Error('Email does not exist !')
        }
    }
)

export const isLoginForTokenAsync = createAsyncThunk(
    'user/isLoginForTokenAsync',
    async (props) => {
        const usersResponse = await fetch(API_URL + props.endpoint, { method: 'GET' })
        const data = await usersResponse.json()
        const result = data.reduce((accumulator, currentValue) => {
            if (currentValue.token === props.data.token) {
                accumulator = currentValue
            }
            return accumulator
        }, false)
        if (result) return result
        else throw new Error('No login')
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // stex erb skseq todon grel petqa reducernern stex linen , kam ete nor slice sarqeq entex
    },
    extraReducers: builder => {
        builder
            .addCase(isRegisterAsync.pending, (state) => {
                state.loading = true;
                state.loginError = ''
            })
            .addCase(isRegisterAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.isLogin = true;
                state.data = action.payload;
            })
            .addCase(isRegisterAsync.rejected, (state, action) => {
                state.loading = false;
                state.loginError = action.error.message;
            })
            .addCase(isLoginAsync.pending, (state) => {
                state.loading = true;
                state.loginError = ''
            })
            .addCase(isLoginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.isLogin = true;
                state.data = action.payload;
            })
            .addCase(isLoginAsync.rejected, (state, action) => {
                state.loading = false;
                state.loginError = action.error.message;
            })
            .addCase(isLoginForTokenAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(isLoginForTokenAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.isLogin = true;
                state.data = action.payload;
            })
            .addCase(isLoginForTokenAsync.rejected, (state, action) => {
                state.loading = false;
            })

    }

})
export const { a } = userSlice.actions

export default userSlice.reducer;
