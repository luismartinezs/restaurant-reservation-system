import React from "react";
import { Box, Text } from "@mantine/core";
import { FaStar } from "react-icons/fa";

export const Star = ({ rating, index }: { rating: number; index: number }) => {
  const fillPercentage = Math.min(
    Math.max(((rating as number) - index) * 100, 0),
    100
  );

  return (
    <Box key={index} style={{ position: "relative", display: "inline-block" }}>
      <Text c="gray">
        <FaStar />
      </Text>
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${fillPercentage}%`,
          overflow: "hidden",
        }}
      >
        <Text c="red">
          <FaStar />
        </Text>
      </Box>
    </Box>
  );
};
