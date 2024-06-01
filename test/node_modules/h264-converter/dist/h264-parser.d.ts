import H264Remuxer from './h264-remuxer';
import NALU from './util/NALU';
export interface SEIMessage {
    type: number;
}
export declare type SPS = {
    profile_idc: number;
    constraint_set_flags: number;
    level_idc: number;
    seq_parameter_set_id: number;
    pic_width_in_mbs_minus1: number;
    pic_height_in_map_units_minus1: number;
    frame_mbs_only_flag: number;
    frame_crop_left_offset: number;
    frame_crop_right_offset: number;
    frame_crop_top_offset: number;
    frame_crop_bottom_offset: number;
    sar: [number, number];
};
export default class H264Parser {
    private remuxer;
    private track;
    constructor(remuxer: H264Remuxer);
    private parseSEI;
    private parseSPS;
    private parsePPS;
    parseNAL(unit: NALU): boolean;
    private static skipScalingList;
    private static readSPS;
    static parseSPS(data: Uint8Array): SPS;
    private static readSEI;
    private static readSEIMessage;
    private static readSEIPayload;
}
