/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 */

'use strict';
import type {Node} from 'React';
import {View, Text, StyleSheet, Switch} from 'react-native';
import React, {useState, useCallback} from 'react';
import ErrorBoundary from './ErrorBoundary';
import NativeLogModule from './NativeLogModule';


const SECTIONS = [
  {
    title: 'Logging',
    examples: [
      {
        title: 'Native Log Warning',
        onPressHandler: () => {
          NativeLogModule.showWarning(); 
        },
      },
      {
        title: 'Native Log Error',
        onPressHandler: () => {
          NativeLogModule.showError();
        },
      },
      {
        title: 'Native Log Fatal',
        onPressHandler: () => {
          //todo: fatal? No such level found in RNLog, is the app supposed to crash? 
        },
      },
      {
        title: 'Console Warning',
        onPressHandler: () => {
          console.warn('Warning!!');
        },
      },
      {
        title: 'Console Error',
        onPressHandler: () => {
          console.error('Error!!');
        },
      },
      {
        title: 'React Warning',
        customRender: () => <ReactWarningExample key="react-warning-example" />,
      },
    ],
  },
  {
    title: 'Syntax Errors',
    examples: [
      {
        title: 'LogBox Syntax Error',
        onPressHandler: () => {
          const message = `TransformError SyntaxError: /path/to/RKJSModules/Apps/CrashReact/CrashReactApp.js: '${'im' +
            'port'} and 'export' may only appear at the top level (199:0)
      
        197 | });
        198 |
      > 199 | export default CrashReactApp;
            | ^
        200 |`;
          const syntaxError: ExtendedError = new Error(message);
          syntaxError.preventSymbolication = true;
          throw syntaxError;
        },
      },
      {
        title: 'Native Syntax Error',
        onPressHandler: () => {
            //RedBoxDialog is not a public class, can't wrap in a module too..
            //Maybe create a new child class to access RedBox
        }
      },
    ],
  },
  {
    title: 'JavaScript Errors',
    examples: [
      {
        title: 'Unhandled JavaScript Error',
        onPressHandler: () => {
          throw new Error('Unhandled JavaScript Error');
        },
      },

      {
        title: 'Throw JS Errror In Render',
        customRender: () => (
          <ReactErrorBoundaryExample key="react-error-boundary-example" />
        ),
      },
    ],
  },
  {
    title: 'Native Crashes',
    examples: [
      //Todo: Add various examples
      {
        title: 'Native Module Error',
        onPressHandler: () => {},
      },
    ],
  },
];

const ReactWarningExample = () => {
  const [showFruitList, setShowFruitList] = useState(false);

  const FruitListWithMissingKeys = () => (
    <View style={{display: 'none'}}>
      {['Apple', 'Banana'].map(fruit => (
        <Text>{fruit}</Text>
      ))}
    </View>
  );

  return (
    <View style={styles.itemContainer}>
      {showFruitList && <FruitListWithMissingKeys />}
      <Text
        style={styles.itemTitle}
        onPress={() => setShowFruitList(!showFruitList)}>
        React Warning
      </Text>
    </View>
  );
};

const ReactErrorBoundaryExample = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('App crashed in render!');
  }
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle} onPress={() => setThrowError(true)}>
        Throw JS Error In Render
      </Text>
    </View>
  );
};

const SectionHeader = ({title}) => (
  <View>
    <Text style={styles.sectionHeader}>{title}</Text>
  </View>
);

const Item = ({item}) => {
  if (item.customRender) {
    return item.customRender();
  }
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle} onPress={item.onPressHandler}>
        {item.title}
      </Text>
    </View>
  );
};

const Settings = ({renderErrorBoundary, toggleErrorBoundary}) => (
  <View>
    <SectionHeader title="Settings" />
    <View style={styles.itemContainer}>
      <View style={styles.errorBoundarySwitch}>
        <Text style={styles.itemTitle} onPress={toggleErrorBoundary}>
          Error Boundary
        </Text>
        <Switch
          onValueChange={toggleErrorBoundary}
          value={renderErrorBoundary}
        />
      </View>
    </View>
  </View>
);

const ItemsList = () =>
  SECTIONS.map(section => {
    return (
      <View key={section.title}>
        <SectionHeader title={section.title} />

        <View>
          {section.examples.map(item => (
            <Item key={item.title} item={item} />
          ))}
        </View>
      </View>
    );
  });

const CrashExampleScreen = () => {
  const [renderErrorBoundary, setRenderErrorBoundary] = useState(true);

  const toggleErrorBoundary = useCallback(() => {
    setRenderErrorBoundary(!renderErrorBoundary);
  }, [renderErrorBoundary]);

  const Container = renderErrorBoundary ? ErrorBoundary : View;

  return (
    <Container>
      <Settings
        renderErrorBoundary={renderErrorBoundary}
        toggleErrorBoundary={toggleErrorBoundary}
      />
      <ItemsList />
    </Container>
  );
};

exports.framework = 'React';
exports.title = 'Crash';
exports.description = 'Crash examples.';
exports.examples = [
  {
    title: 'Crash Examples',
    render(): Node {
      return <CrashExampleScreen />;
    },
  },
];

const styles = StyleSheet.create({
  itemContainer: {
    padding: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemTitle: {
    fontSize: 14,
  },
  sectionHeader: {
    fontSize: 18,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  errorBoundarySwitch: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
