/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+react_native
 * @format
 */

/* global device, element, by, expect */
const {
  openComponentWithLabel,
  openExampleWithTitle,
} = require('../e2e-helpers');

describe('TextInput', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
    await openComponentWithLabel(
      '<TextInput>',
      '<TextInput> A foundational component for inputting text into the app via a keyboard.',
    );
  });

  it('TextInput should accept input', async () => { 
    await openExampleWithTitle("TextInput with autoFocus={true}"); 

    await element(by.id('rewrite_sp_underscore_input')).typeText(
      'this is a long sentence',
    );

    await expect(element(by.id('rewrite_sp_underscore_input'))).toHaveText('this_is_a_long_sentence');
  });

  it('TextInput with maxLength should not exceed maximum length', async () => {
    await openExampleWithTitle("TextInput with maxLength={limit}"); 

    await element(by.id('max_length_input')).typeText(
      'this is a very long sentence.'
    );

    await expect(element(by.id('max_length_input'))).toHaveText('this is a very long ');
  })

  it("TextInput should be cleared by tapping 'Clear' button", async () => { 
    await openExampleWithTitle("TextInput along with 'Clear' button"); 
    await element(by.id('clear_text_input')).typeText('this text needs to be cleared'); 
    await element(by.id('rewrite_clear_button')).tap(); 

    await expect(element(by.id('clear_text_input'))).toHaveText('');
  })
});
