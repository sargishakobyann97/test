import { Input, Button, Alert } from 'antd'
import { UserOutlined, SmallDashOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux';
import { isLoginAsync, isRegisterAsync } from '../../redux/features/userSlice';

function Login() {

    const [userData, setUserData] = useState({ email: '', password: '', confirmPassword: '', userName: '' })
    const [isRegister, setIsRegister] = useState(true)
    const dispatch = useDispatch()
    const { loginError } = useSelector(state => state.user)

    const switchStatus = () => setIsRegister(!isRegister)
    const changeUserData = e => setUserData({ ...userData, [e.target.getAttribute('data-value')]: e.target.value })
    const handleClick = e => {
        if (userData.email && userData.password && ((userData.password === userData.confirmPassword && userData.userName) || !isRegister)) {
            if (isRegister) {
                dispatch(isRegisterAsync({ endpoint: 'test', data: userData }))
            } else {
                dispatch(isLoginAsync({ endpoint: 'test', data: userData }))
            }
        } else alert('Please fill out the form correctly')
    }

    return (
        <div className='login-wrapper'>
            <div className='login-container'>
                <h1>{isRegister ? "Registration Page" : "Login Page"}</h1>
                <p>The site is designed to create your tasks</p>
                {loginError && <Alert
                    message="Error !!!"
                    description={loginError}
                    type="error"
                    closable
                />}
                {isRegister && <Input
                    data-value="userName"
                    size="large"
                    placeholder=" User name"
                    prefix={<UserOutlined />}
                    onChange={changeUserData}
                />}
                <Input
                    data-value="email"
                    size="large"
                    placeholder=" E - mail"
                    prefix={<UserOutlined />}
                    onChange={changeUserData}
                />
                <Input
                    data-value="password"
                    type="password"
                    size="large"
                    placeholder=" Password"
                    prefix={<SmallDashOutlined />}
                    onChange={changeUserData}
                />
                {isRegister &&
                    <Input
                        data-value="confirmPassword"
                        size="large"
                        type="password"
                        placeholder=" Confirm password"
                        prefix={<SmallDashOutlined />}
                        onChange={changeUserData}
                    />}
                <Button type="primary" onClick={handleClick}>{isRegister ? "Next" : "Login"}</Button>
                <span className='switch-is-login' onClick={switchStatus}>
                    {isRegister ? "Login Page" : "Registration Page"}
                </span>
            </div>
        </div>
    )
}

export default Login