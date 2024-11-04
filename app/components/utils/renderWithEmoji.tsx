import React, { Fragment, type ReactNode } from "react";
import { Text } from "react-native";
import createEmojiRegex from "emoji-regex";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const emojiRegex = createEmojiRegex();

/**
 * Without this, the `line-height` goes off when
 * an emoji is included in the text
 * @param stringNode
 * @returns React.JSX.Element
 */
export function renderStringWithEmoji(stringNode: ReactNode) {
  const { styles } = useStyles(stylesheet);
  const strings = Array.isArray(stringNode) ? stringNode : [stringNode];
  return (
    <Fragment>
      {strings.map((string) => {
        if (typeof string !== "string") {
          return string;
        }

        const emojis = string.match(emojiRegex);
        if (emojis === null) return string;

        return string.split(emojiRegex).map((stringPart, index) => (
          <Fragment key={`emoji-${stringPart}`}>
            {stringPart}
            {emojis[index] ? (
              <Text style={styles.emoji}>{emojis[index]}</Text>
            ) : null}
          </Fragment>
        ));
      })}
    </Fragment>
  );
}

const stylesheet = createStyleSheet(() => ({
  emoji: {
    color: "black",
    fontFamily: "System",
  },
}));
