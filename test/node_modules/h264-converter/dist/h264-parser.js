"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bit_stream_1 = require("./util/bit-stream");
var debug = require("./util/debug");
var NALU_1 = require("./util/NALU");
var H264Parser = (function () {
    function H264Parser(remuxer) {
        this.remuxer = remuxer;
        this.track = remuxer.mp4track;
    }
    H264Parser.prototype.parseSEI = function (sei) {
        var messages = H264Parser.readSEI(sei);
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var m = messages_1[_i];
            switch (m.type) {
                case 0:
                    this.track.seiBuffering = true;
                    break;
                case 5:
                    return true;
                default:
                    break;
            }
        }
        return false;
    };
    H264Parser.prototype.parseSPS = function (sps) {
        var config = H264Parser.readSPS(sps);
        this.track.width = config.width;
        this.track.height = config.height;
        this.track.sps = [sps];
        this.track.codec = 'avc1.';
        var codecArray = new DataView(sps.buffer, sps.byteOffset + 1, 4);
        for (var i = 0; i < 3; ++i) {
            var h = codecArray.getUint8(i).toString(16);
            if (h.length < 2) {
                h = '0' + h;
            }
            this.track.codec += h;
        }
    };
    H264Parser.prototype.parsePPS = function (pps) {
        this.track.pps = [pps];
    };
    H264Parser.prototype.parseNAL = function (unit) {
        if (!unit) {
            return false;
        }
        var push = false;
        switch (unit.type()) {
            case NALU_1.default.NDR:
            case NALU_1.default.IDR:
                push = true;
                break;
            case NALU_1.default.SEI:
                push = this.parseSEI(unit.getData().subarray(4));
                break;
            case NALU_1.default.SPS:
                this.parseSPS(unit.getData().subarray(4));
                debug.log(" Found SPS type NALU frame.");
                if (!this.remuxer.readyToDecode && this.track.pps.length > 0 && this.track.sps.length > 0) {
                    this.remuxer.readyToDecode = true;
                }
                break;
            case NALU_1.default.PPS:
                this.parsePPS(unit.getData().subarray(4));
                debug.log(" Found PPS type NALU frame.");
                if (!this.remuxer.readyToDecode && this.track.pps.length > 0 && this.track.sps.length > 0) {
                    this.remuxer.readyToDecode = true;
                }
                break;
            default:
                debug.log(" Found Unknown type NALU frame. type=" + unit.type());
                break;
        }
        return push;
    };
    H264Parser.skipScalingList = function (decoder, count) {
        var lastScale = 8;
        var nextScale = 8;
        for (var j = 0; j < count; j++) {
            if (nextScale !== 0) {
                var deltaScale = decoder.readEG();
                nextScale = (lastScale + deltaScale + 256) % 256;
            }
            lastScale = (nextScale === 0) ? lastScale : nextScale;
        }
    };
    H264Parser.readSPS = function (data) {
        var _a = this.parseSPS(data), pic_width_in_mbs_minus1 = _a.pic_width_in_mbs_minus1, frame_crop_left_offset = _a.frame_crop_left_offset, frame_crop_right_offset = _a.frame_crop_right_offset, frame_mbs_only_flag = _a.frame_mbs_only_flag, pic_height_in_map_units_minus1 = _a.pic_height_in_map_units_minus1, frame_crop_top_offset = _a.frame_crop_top_offset, frame_crop_bottom_offset = _a.frame_crop_bottom_offset, sar = _a.sar;
        var sarScale = sar[0] / sar[1];
        return {
            width: Math.ceil((((pic_width_in_mbs_minus1 + 1) * 16) - frame_crop_left_offset * 2 - frame_crop_right_offset * 2) * sarScale),
            height: ((2 - frame_mbs_only_flag) * (pic_height_in_map_units_minus1 + 1) * 16) -
                ((frame_mbs_only_flag ? 2 : 4) * (frame_crop_top_offset + frame_crop_bottom_offset)),
        };
    };
    H264Parser.parseSPS = function (data) {
        var decoder = new bit_stream_1.default(data);
        var frame_crop_left_offset = 0;
        var frame_crop_right_offset = 0;
        var frame_crop_top_offset = 0;
        var frame_crop_bottom_offset = 0;
        decoder.readUByte();
        var profile_idc = decoder.readUByte();
        var constraint_set_flags = decoder.readUByte();
        var level_idc = decoder.readBits(8);
        var seq_parameter_set_id = decoder.readUEG();
        if (profile_idc === 100 ||
            profile_idc === 110 ||
            profile_idc === 122 ||
            profile_idc === 244 ||
            profile_idc === 44 ||
            profile_idc === 83 ||
            profile_idc === 86 ||
            profile_idc === 118 ||
            profile_idc === 128 ||
            profile_idc === 138 ||
            profile_idc === 139 ||
            profile_idc === 134) {
            var chromaFormatIdc = decoder.readUEG();
            if (chromaFormatIdc === 3) {
                decoder.skipBits(1);
            }
            decoder.skipUEG();
            decoder.skipUEG();
            decoder.skipBits(1);
            if (decoder.readBoolean()) {
                var scalingListCount = (chromaFormatIdc !== 3) ? 8 : 12;
                for (var i = 0; i < scalingListCount; ++i) {
                    if (decoder.readBoolean()) {
                        if (i < 6) {
                            H264Parser.skipScalingList(decoder, 16);
                        }
                        else {
                            H264Parser.skipScalingList(decoder, 64);
                        }
                    }
                }
            }
        }
        decoder.skipUEG();
        var picOrderCntType = decoder.readUEG();
        if (picOrderCntType === 0) {
            decoder.readUEG();
        }
        else if (picOrderCntType === 1) {
            decoder.skipBits(1);
            decoder.skipEG();
            decoder.skipEG();
            var numRefFramesInPicOrderCntCycle = decoder.readUEG();
            for (var i = 0; i < numRefFramesInPicOrderCntCycle; ++i) {
                decoder.skipEG();
            }
        }
        decoder.skipUEG();
        decoder.skipBits(1);
        var pic_width_in_mbs_minus1 = decoder.readUEG();
        var pic_height_in_map_units_minus1 = decoder.readUEG();
        var frame_mbs_only_flag = decoder.readBits(1);
        if (frame_mbs_only_flag === 0) {
            decoder.skipBits(1);
        }
        decoder.skipBits(1);
        if (decoder.readBoolean()) {
            frame_crop_left_offset = decoder.readUEG();
            frame_crop_right_offset = decoder.readUEG();
            frame_crop_top_offset = decoder.readUEG();
            frame_crop_bottom_offset = decoder.readUEG();
        }
        var vui_parameters_present_flag = decoder.readBoolean();
        var aspect_ratio_info_present_flag = false;
        var sar = [1, 1];
        if (vui_parameters_present_flag) {
            aspect_ratio_info_present_flag = decoder.readBoolean();
            if (aspect_ratio_info_present_flag) {
                var aspectRatioIdc = decoder.readUByte();
                switch (aspectRatioIdc) {
                    case 1:
                        sar = [1, 1];
                        break;
                    case 2:
                        sar = [12, 11];
                        break;
                    case 3:
                        sar = [10, 11];
                        break;
                    case 4:
                        sar = [16, 11];
                        break;
                    case 5:
                        sar = [40, 33];
                        break;
                    case 6:
                        sar = [24, 11];
                        break;
                    case 7:
                        sar = [20, 11];
                        break;
                    case 8:
                        sar = [32, 11];
                        break;
                    case 9:
                        sar = [80, 33];
                        break;
                    case 10:
                        sar = [18, 11];
                        break;
                    case 11:
                        sar = [15, 11];
                        break;
                    case 12:
                        sar = [64, 33];
                        break;
                    case 13:
                        sar = [160, 99];
                        break;
                    case 14:
                        sar = [4, 3];
                        break;
                    case 15:
                        sar = [3, 2];
                        break;
                    case 16:
                        sar = [2, 1];
                        break;
                    case 255: {
                        sar = [decoder.readUByte() << 8 | decoder.readUByte(), decoder.readUByte() << 8 | decoder.readUByte()];
                        break;
                    }
                    default: {
                        debug.error("  H264: Unknown aspectRatioIdc=" + aspectRatioIdc);
                    }
                }
            }
            if (decoder.readBoolean()) {
                decoder.skipBits(1);
            }
            if (decoder.readBoolean()) {
                decoder.skipBits(4);
                if (decoder.readBoolean()) {
                    decoder.skipBits(24);
                }
            }
            if (decoder.readBoolean()) {
                decoder.skipUEG();
                decoder.skipUEG();
            }
            if (decoder.readBoolean()) {
                if (decoder.bitsAvailable > 64) {
                    var unitsInTick = decoder.readUInt();
                    var timeScale = decoder.readUInt();
                    var fixedFrameRate = decoder.readBoolean();
                    var frameDuration = timeScale / (2 * unitsInTick);
                    debug.log("timescale: " + timeScale + "; unitsInTick: " + unitsInTick + "; " +
                        ("fixedFramerate: " + fixedFrameRate + "; avgFrameDuration: " + frameDuration));
                }
                else {
                    debug.log("Truncated VUI (" + decoder.bitsAvailable + ")");
                }
            }
        }
        return {
            profile_idc: profile_idc,
            constraint_set_flags: constraint_set_flags,
            level_idc: level_idc,
            seq_parameter_set_id: seq_parameter_set_id,
            pic_width_in_mbs_minus1: pic_width_in_mbs_minus1,
            pic_height_in_map_units_minus1: pic_height_in_map_units_minus1,
            frame_mbs_only_flag: frame_mbs_only_flag,
            frame_crop_left_offset: frame_crop_left_offset,
            frame_crop_right_offset: frame_crop_right_offset,
            frame_crop_top_offset: frame_crop_top_offset,
            frame_crop_bottom_offset: frame_crop_bottom_offset,
            sar: sar,
        };
    };
    H264Parser.readSEI = function (data) {
        var decoder = new bit_stream_1.default(data);
        decoder.skipBits(8);
        var result = [];
        while (decoder.bitsAvailable > 3 * 8) {
            result.push(this.readSEIMessage(decoder));
        }
        return result;
    };
    H264Parser.readSEIMessage = function (decoder) {
        function get() {
            var result = 0;
            while (true) {
                var value = decoder.readUByte();
                result += value;
                if (value !== 0xff) {
                    break;
                }
            }
            return result;
        }
        var payloadType = get();
        var payloadSize = get();
        return this.readSEIPayload(decoder, payloadType, payloadSize);
    };
    H264Parser.readSEIPayload = function (decoder, type, size) {
        var result;
        switch (type) {
            default:
                result = { type: type };
                decoder.skipBits(size * 8);
        }
        decoder.skipBits(decoder.bitsAvailable % 8);
        return result;
    };
    return H264Parser;
}());
exports.default = H264Parser;
