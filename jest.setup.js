import '@testing-library/jest-dom'

// jest.setup.js

// Polyfill for TextEncoder and TextDecoder
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

Object.assign(global, { TextDecoder, TextEncoder });