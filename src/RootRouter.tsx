import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import {
  Login,
  Register,
  Dashboard,
  Customer,
  Account,
  Transaction,
} from "src/screens";
import { AuthenticationOutput } from "./graphql-codegen/graphql";

export default function RootRouter() {
  return (
    <AuthProvider>
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/customers"
            element={
              <RequireAuth>
                <Customer />
              </RequireAuth>
            }
          />
          <Route
            path="/accounts"
            element={
              <RequireAuth>
                <Account />
              </RequireAuth>
            }
          />
          <Route
            path="/transactions"
            element={
              <RequireAuth>
                <Transaction />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

interface AuthContextType {
  user: AuthenticationOutput | null;
  login: (user: AuthenticationOutput, callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<AuthenticationOutput | null>(null);

  let localUser = localStorage.getItem("user")! ?? "";

  if (localUser.trim() !== "" && user === null) {
    const userObj: AuthenticationOutput = JSON.parse(localUser);
    setUser(userObj);
  }

  let login = (newUser: AuthenticationOutput, callback: VoidFunction) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    callback();
  };

  let logout = (callback: VoidFunction) => {
    setUser(null);
    localStorage.clear();
    callback();
  };

  let value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
