import { StreamClientScrcpy } from './googDevice/client/StreamClientScrcpy';
import { MsePlayer } from './player/MsePlayer';
import { TouchHandlerListener } from './touchHandler/FeaturedTouchHandler';
import VideoSettings from './VideoSettings';
import { StreamReceiverScrcpy } from './googDevice/client/StreamReceiverScrcpy';
import { BasePlayer } from './player/BasePlayer';

export default class Device {
    private streamClient: StreamClientScrcpy;

    constructor(serial: string, ws: string, fitToScreen?: boolean, videoSettings?: VideoSettings, streamReceiver?: StreamReceiverScrcpy, player?: BasePlayer) {
        const parsedQuery = {
            action: 'stream',
            udid: serial,
            player: 'mse',
            ws: ws,
        };
        StreamClientScrcpy.registerPlayer(MsePlayer);
        this.streamClient = StreamClientScrcpy.clientInit(parsedQuery, streamReceiver, player, fitToScreen, videoSettings);
    }

    public getStreamClient(): StreamClientScrcpy {
        return this.streamClient;
    }

    public setTouchListener(): void {
        this.streamClient.attachTouchListeners();
    }

    public addMultipleListeners(...listener: TouchHandlerListener[]): void {
        this.streamClient.attachMultipleTouchListeners(...listener);
    }

    public addClients(...clients: StreamClientScrcpy[]): void {
        this.streamClient.attachMultipleClient(...clients);
    }

    public clientRun(fitToScreen?: boolean, videoSettings?: VideoSettings, player?: BasePlayer) {
        this.streamClient.fetchSteam(fitToScreen, videoSettings, player);
    }

    public getDeviceElement(): HTMLDivElement {
        return this.streamClient.getDeviceView();
    }

    public shutdown(ev?: string | Event): void {
        this.streamClient.shutdown(ev);
    }

    public getPlayer(): BasePlayer | undefined {
        return this.streamClient.getPlay();
    }


}


