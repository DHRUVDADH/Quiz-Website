import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const StudentRoute = ({children}) => {
    const { token } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.profile);
    
    if ((token !== null) && user.usertype=='student' ) {
      return children;
    } else {
      return (
        <>
          <Navigate to={`/${user.usertype}`} replace={true} />
        </>
      );
    }
}

export default StudentRoute