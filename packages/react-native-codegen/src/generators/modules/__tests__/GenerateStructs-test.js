/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+react_native
 * @flow strict-local
 * @format
 */

'use strict';

const fixtures = require('../__test_fixtures__/structFixtures.js');
const generator = require('../ObjCppUtils/GenerateStructs.js');

describe('GenerateStructs', () => {
  Object.keys(fixtures)
    .sort()
    .forEach(fixtureName => {
      const fixture = fixtures[fixtureName];

      it(`can generate fixture ${fixtureName}`, () => {
        expect(
          generator
            .translateObjectsForStructs(fixture, fixtureName)
            .replace(/::_MODULE_NAME_::/g, 'SampleTurboModule'),
        ).toMatchSnapshot();
      });
    });
});
