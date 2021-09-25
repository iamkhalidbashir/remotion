"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculate_atempo_1 = require("../assets/calculate-atempo");
describe('Calculate atempo', () => {
    test('Basic atempo', () => {
        expect((0, calculate_atempo_1.calculateATempo)(0.5)).toBe('atempo=0.50000');
    });
    test('Below 0.5', () => {
        expect((0, calculate_atempo_1.calculateATempo)(0.25)).toBe('atempo=0.50000,atempo=0.50000');
    });
    test('Above 2', () => {
        expect((0, calculate_atempo_1.calculateATempo)(6)).toBe('atempo=1.56508,atempo=1.56508,atempo=1.56508,atempo=1.56508');
    });
    test('Extreme value', () => {
        expect((0, calculate_atempo_1.calculateATempo)(0.0000001)).toBe('atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430');
    });
});
//# sourceMappingURL=calculate-atempo.test.js.map