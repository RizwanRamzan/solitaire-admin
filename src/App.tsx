// import ApplcationRoutes from './Config/ApplicationRoutes'
import HomeRoutes from './Routes/HomeRoutes'
import Layout from './Component/Layout/Layout';
import { useSelector } from "react-redux";
import AuthRoutes from './Routes/AuthRoutes';

function App() {

  const token = useSelector((state: any) => state.authReducer.user);


  return (
    <>
      {
        token?.email ?
          <Layout>< HomeRoutes /></Layout >
          :
          <AuthRoutes />
      }
    </>
  )
}

export default App
