import React from 'react';
import ChangePasswordForm from '../components/Forms/ChangePasswordForm'
import styled from 'styled-components';


const ProfilePage = styled.section`
    margin-top: 1rem;
    width: 100%;
    height: 100%;
    display:flex;
    justify-content: center;
`

const Profile = () => {
    return (
        <ProfilePage>
            <ChangePasswordForm />
        </ProfilePage>
    )
}

export default Profile