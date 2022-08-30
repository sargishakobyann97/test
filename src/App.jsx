import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home';
import Loading from './components/Loading';
import Login from './components/Login';
import { isLoginForTokenAsync } from './redux/features/userSlice';

function App() {
  const { isLogin, loading } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {

    // Sa erb usern login exaca u refresha anum uremn petqa login exac mna
    // es jamanak vercnum em tokenn u tokenov tesnum em tenc user ka te che, ete ha login em anum (redux-um nayeq)

    const token = localStorage.getItem('token')
    token && dispatch(isLoginForTokenAsync({ endpoint: 'test', data: { token } }))
  }, [])

  // skzbic isLoginn bnakanabar false u inqn @nknuma Login component, skseq dranic nayel

  return (
    <div className="App">
      {isLogin ? <Home /> : <Login />}
      {loading && <Loading />}
    </div>
  );
}

export default App;
