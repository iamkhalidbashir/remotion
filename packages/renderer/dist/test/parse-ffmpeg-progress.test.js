"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_ffmpeg_progress_1 = require("../parse-ffmpeg-progress");
test('Should be able to parse FFMPEG progress', () => {
    const result = (0, parse_ffmpeg_progress_1.parseFfmpegProgress)('anything');
    expect(result).toBe(undefined);
    expect((0, parse_ffmpeg_progress_1.parseFfmpegProgress)('frame=   34 fps=5.7 q=0.0 size=       0kB time=00:00:00.15 bitrate=  27.0kbits/s speed=0.0253x')).toBe(34);
});
test('Should be able to parse 5 digits progress', () => {
    expect((0, parse_ffmpeg_progress_1.parseFfmpegProgress)('frame=10234 fps=5.7 q=0.0 size=       0kB time=00:00:00.15 bitrate=  27.0kbits/s speed=0.0253x')).toBe(10234);
});
//# sourceMappingURL=parse-ffmpeg-progress.test.js.map