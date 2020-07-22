/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

const React = require('react');

const {StyleSheet, Text, View} = require('react-native');
import {RNTesterThemeContext} from './RNTesterTheme';

type Props = $ReadOnly<{|
  children?: React.Node,
  title?: ?string,
  description?: ?string,
  isDisabled: ?boolean,
|}>;

type State = {|
  description: ?string,
|};

class RNTesterBlock extends React.Component<Props, State> {
  state: State = {description: null};

  render(): React.Node {
    const description = this.props.description ? (
      <RNTesterThemeContext.Consumer>
        {(theme) => {
          return (
            <Text style={[styles.descriptionText, {color: theme.LabelColor}]}>
              {this.props.description}
            </Text>
          );
        }}
      </RNTesterThemeContext.Consumer>
    ) : null;

    return (
      <RNTesterThemeContext.Consumer>
        {(theme) => {
          return (
            <View
              style={[
                styles.container,
                {
                  borderColor: theme.SeparatorColor,
                  backgroundColor: theme.SystemBackgroundColor,
                },
              ]}>
              {/* Show an overlay on top of the container if example is not available on the current platform */}
              {this.props.isDisabled && <View style={styles.disabledOverlay} />}
              <View
                style={[
                  styles.titleContainer,
                  {
                    borderBottomColor: theme.SeparatorColor,
                    backgroundColor: theme.QuaternarySystemFillColor,
                  },
                ]}>
                <Text style={[styles.titleText, {color: theme.LabelColor}]}>
                  {this.props.title}
                </Text>
                {description}
              </View>
              <View style={styles.children}>{this.props.children}</View>
            </View>
          );
        }}
      </RNTesterThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    borderWidth: 0.5,
    margin: 10,
    marginVertical: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 2.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 14,
  },
  children: {
    margin: 10,
  },
  disabledOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#D3D3D3',
    opacity: 0.5,
    top: 0,
    left: 0,
    zIndex: 1,
  },
});

module.exports = RNTesterBlock;
