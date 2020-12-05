import React from "react";
import { View, ActivityIndicator } from "react-native";

import { useUser } from "./contexts/user";

import UserRoutes from "./routes/user.routes";
import AppRoutes from "./routes/app.routes";

const Routes = () => {
  const { signed, loading } = useUser();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <UserRoutes />;
};

export default Routes;