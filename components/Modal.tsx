import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, ModalProps, Platform, StyleSheet, View } from "react-native";

interface IProps extends ModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  isClose?: boolean;
  shadow?: boolean;
}

const CustomModal = ({
  visible,
  setVisible,
  children,
  animationType,
  isClose = true,
  presentationStyle,
  shadow = presentationStyle ? false : true,
  ...rest
}: IProps) => {
  return (
    <Modal
      {...rest}
      animationType={animationType || presentationStyle ? "slide" : "fade"}
      transparent={presentationStyle ? false : true}
      visible={visible}
      presentationStyle={presentationStyle}
      onRequestClose={() => setVisible(false)}
    >
      <View
        style={[styles.centeredView, !presentationStyle && styles.halfScreen]}
      >
        <View style={[styles.modalView, shadow && styles.shadow]}>
          {isClose && (
            <View style={styles.button}>
              <Ionicons
                name="md-close"
                size={30}
                onPress={() => setVisible(false)}
                color="#f63f6d"
              />
            </View>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 0 : 22,
  },
  halfScreen: {
    backgroundColor: "#00000060",
    justifyContent: "center",
  },
  modalView: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default CustomModal;
