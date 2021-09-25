"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const get_audio_channels_1 = require("../assets/get-audio-channels");
test('Get audio channels for video', async () => {
    const videoWithoutAudio = path_1.default.join(__dirname, '..', '..', '..', 'example', 'src', 'resources', 'framer-music.mp4');
    expect((0, fs_1.existsSync)(videoWithoutAudio)).toBe(true);
    const channels = await (0, get_audio_channels_1.getAudioChannels)(videoWithoutAudio);
    expect(channels).toBe(2);
});
test('Get audio channels for video without music', async () => {
    const videoWithAudio = path_1.default.join(__dirname, '..', '..', '..', 'example', 'src', 'resources', 'framer.mp4');
    expect((0, fs_1.existsSync)(videoWithAudio)).toBe(true);
    const channels = await (0, get_audio_channels_1.getAudioChannels)(videoWithAudio);
    expect(channels).toBe(0);
});
test('Get audio channels for video without music', async () => {
    const audio = path_1.default.join(__dirname, '..', '..', '..', 'example', 'src', 'resources', 'sound1.mp3');
    expect((0, fs_1.existsSync)(audio)).toBe(true);
    const channels = await (0, get_audio_channels_1.getAudioChannels)(audio);
    expect(channels).toBe(2);
});
test('Throw error if parsing a non video file', async () => {
    const tsFile = path_1.default.join(__dirname, '..', 'ffmpeg-flags.ts');
    expect((0, fs_1.existsSync)(tsFile)).toBe(true);
    expect(() => (0, get_audio_channels_1.getAudioChannels)(tsFile)).rejects.toThrow(/Invalid data found when processing input/);
});
//# sourceMappingURL=get-audio-channels.test.js.map