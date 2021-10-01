import React, { ReactNode } from "react";
import { SafeAreaView, StatusBar, View, ViewProps } from "react-native";

interface IProps extends ViewProps {
  children: ReactNode;
}

const Container = ({ children, style, ...rest }: IProps) => {
  return (
    <SafeAreaView>
      <View
        style={[
          { marginTop: StatusBar.currentHeight || 0, paddingHorizontal: 7 },
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
