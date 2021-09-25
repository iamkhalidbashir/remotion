"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_asset_file_name_1 = require("../get-asset-file-name");
describe('get asset file name test', () => {
    const testStrings = [
        ['assets/images/sample.png', 'sample.png'],
        ['assets\\images\\sample.png', 'sample.png'],
        ['sample.png', 'sample.png'],
    ];
    testStrings.forEach((entry) => test(`test for ${entry[0]}`, () => {
        expect((0, get_asset_file_name_1.getAssetFileName)(entry[0])).toEqual(entry[1]);
    }));
});
//# sourceMappingURL=get-asset-file-name.test.js.map