import React from "react";
import { SafeAreaView, StatusBar, View, ViewProps } from "react-native";

const Container = ({ children, style, ...rest }: ViewProps) => {
  return (
    <SafeAreaView>
      <View
        style={[
          { marginTop: StatusBar.currentHeight || 0, paddingHorizontal: 10 },
          style,
        ]}
        {...rest}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Container;
