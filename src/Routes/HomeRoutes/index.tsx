import { Navigate, Route, Routes } from "react-router-dom";
import Sports from "../../pages/Trading/News";
import News from "../../pages/Trading/Blogs";
import Politics from "../../pages/Trading/Videos";
import Dashboard from "../../pages/Dashboard";


const HomeRoutes = () => {

    

    return (
        <Routes>
          
            <Route path={"*" } element={<Navigate to="/admin/dashboard" replace />} />
            {/* Dashboard */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/news" element={<Sports />} />
            <Route path="/admin/blogs" element={<News />} />
            <Route path="/admin/video" element={<Politics />} />
          

        </Routes>

    )
}

export default HomeRoutes