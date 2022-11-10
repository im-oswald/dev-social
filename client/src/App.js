import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileForm from './components/profile-form/ProfileForm';
import ExperienceForm from './components/profile-form/ExperienceForm';
import EducationForm from './components/profile-form/EducationForm';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  })

  return <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Alert />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/profiles' element={<Profiles />} />
          <Route exact path='/profile/:id' element={<Profile />} />
          <Route exact path='/dashboard' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route exact path='/create-profile' element={
            <PrivateRoute>
              <ProfileForm edit={false} />
            </PrivateRoute>
          } />
          <Route exact path='/edit-profile' element={
            <PrivateRoute>
              <ProfileForm edit={true} />
            </PrivateRoute>
          } />
          <Route exact path='/add-experience' element={
            <PrivateRoute>
              <ExperienceForm />
            </PrivateRoute>
          } />
          <Route exact path='/add-education' element={
            <PrivateRoute>
              <EducationForm />
            </PrivateRoute>
          } />
          <Route exact path='/posts' element={
            <PrivateRoute>
              <Posts />
            </PrivateRoute>
          } />                                                                    
        </Routes>
      </Fragment>
    </Router>
  </Provider>
}

export default App;
