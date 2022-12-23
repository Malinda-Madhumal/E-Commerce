import { View } from "react-native";
import React from "react";
import Skeleton from "./Skeleton";

export default function Loading() {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "space-between",
        marginBottom: 10
      }}
    >
      <Skeleton width={160} height={220} />
      <Skeleton width={160} height={220} />
      <Skeleton width={160} height={220} />
      <Skeleton width={160} height={220} />
      <Skeleton width={160} height={220} />
      <Skeleton width={160} height={220} />
      <Skeleton width={160} height={220} />
      <Skeleton width={160} height={220} />
      <Skeleton width={160} height={220} />
      <Skeleton width={160} height={220} />
      <Skeleton width={160} height={220} />
      <Skeleton width={160} height={220} />
    </View>
  );
}
