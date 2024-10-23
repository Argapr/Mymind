import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Terminal from "./pages/component/Terminal";
import Login from "./pages/component/Login";
import Upload from "./pages/component/UploadToken";
import { ProtectedRoute } from "./pages/component/ProtectedRoute";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/upload"
                    element={
                        <ProtectedRoute>
                            <Upload />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/terminal"
                    element={
                        <ProtectedRoute>
                            <Terminal />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
