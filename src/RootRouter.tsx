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
          <Route
            path="/login"
            element={
              <CheckAuth>
                <Login />
              </CheckAuth>
            }
          />
          <Route
            path="/register"
            element={
              <CheckAuth>
                <Register />
              </CheckAuth>
            }
          />

          <Route
            path="/"
            element={
              <RequireAuth roles={["banker", "customer"]}>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/customers"
            element={
              <RequireAuth roles={["banker"]}>
                <Customer />
              </RequireAuth>
            }
          />
          <Route
            path="/accounts"
            element={
              <RequireAuth roles={["banker", "customer"]}>
                <Account />
              </RequireAuth>
            }
          />
          <Route
            path="/transactions"
            element={
              <RequireAuth roles={["banker", "customer"]}>
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

export type UserType = "customer" | "banker";

function RequireAuth({
  roles,
  children,
}: {
  roles: Array<UserType>;
  children: JSX.Element;
}) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!roles?.includes(auth?.user?.type! as UserType)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

function CheckAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
