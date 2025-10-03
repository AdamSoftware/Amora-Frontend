import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { UserLogoutHelper } from "../helper/user";

export default function TopRight({ currentPage, onSelect }) {
  const [showMenu, setShowMenu] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-8)).current;

  const menuItems = ["Events", "Reminders", "Partners", "Logout"];
  
  const router = useRouter();
  const [page, setPage] = useState(currentPage);


  const openMenu = () => {
    setShowMenu(true);
    fadeAnim.setValue(0);
    slideAnim.setValue(-9);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 280, useNativeDriver: false }),
      Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: false }),
    ]).start();
  };

  const closeMenu = (cb?: () => void) => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: false }),
      Animated.timing(slideAnim, { toValue: -8, duration: 250, useNativeDriver: false }),
    ]).start(() => {
      setShowMenu(false);
      if (typeof cb === "function") cb();
    });
  };

  const toggleMenu = () => {
    if (showMenu) closeMenu();
    else openMenu();
  };

  const changePage = (newPage: string) => {
    setPage(newPage);
    router.replace(`pages/${newPage}`);
    console.log("Navigated to:", newPage);
  };

  const handleMenuItem = (item: string) => {
    if (item === "Logout") {
      UserLogoutHelper.logout();
      closeMenu();
      return;
    }

    if (item !== page) {
      changePage(item);
      if (typeof onSelect === "function") onSelect(item);
    }
    closeMenu();
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={toggleMenu} style={styles.iconButton} activeOpacity={0.7}>
        <Ionicons name="menu" size={30} color="#000" />
      </TouchableOpacity>

      {showMenu && (
        <Animated.View
          style={[
            styles.menu,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {menuItems.map((item, idx) => {
            const isActive = page === item;

            return (
              <View key={item}>
                <TouchableOpacity
                  onPress={() => !isActive && handleMenuItem(item)}
                  style={[styles.menuRow, isActive && styles.disabledRow]}
                  activeOpacity={isActive ? 1 : 0.7}
                  disabled={isActive}
                >
                  <Text
                    style={[
                      styles.menuItem,
                      item === "Logout" && styles.logoutText,
                      isActive && styles.disabledText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
                {idx < menuItems.length - 1 && <View style={styles.separator} />}
              </View>
            );
          })}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 36,
    right: 20,
    zIndex: 2000,
    alignItems: "flex-end",
  },
  iconButton: {
    padding: 8,
    borderRadius: 6,
  },
  menu: {
    zIndex: 4000,
    position: "absolute",
    top: 42, 
    right: -15,
    backgroundColor: "#3B2F2F",
    borderRadius: 22,
    paddingVertical: 1,
    paddingHorizontal: 15,
    minWidth: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 9,
    elevation: 10,
  },
  menuRow: {
    paddingVertical: 15,
    zIndex: 4001,
  },
  menuItem: {
    color: "#E7D8C9",
    fontSize: 15,
    textAlign: "center",
  },
  logoutText: {
    color: "#FF6B6B",
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginTop: 10,
  },
  disabledRow: {
    opacity: 0.5,
  },
  disabledText: {
    color: "#A78C7B",
    fontWeight: "600",
  },
});

