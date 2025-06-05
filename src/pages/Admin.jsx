import AdminPanel from '../components/AdminPanel';
import PrivateRoute from '../components/PrivateRoute';

const Admin = () => {
  return (
    <PrivateRoute>
      <AdminPanel />
    </PrivateRoute>
  );
};

export default Admin;