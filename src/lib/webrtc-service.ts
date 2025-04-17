import { resolve } from "path";

enum WebRTCEvents {
    "OFFER",
    "ANSWER",
    "ICE_CANDIDATE",
    "USER_JOINED",
    "USER_LEFT",
    "DATA_MESSAGE",
    "ERROR",
}

interface Message {
    type: WebRTCEvents;
    from: number;
    name?: string;
    to: number;
    data: any;
}

export interface Participant {
    id: number,
    name?: string,
    peerConnection?: RTCPeerConnection,
    audio: MediaStreamTrack | null,
    video: MediaStreamTrack | null,
    screen: MediaStreamTrack | null,
}

export class WebRTCService {
    // Initialize with default STUN servers
    private readonly configuration = {
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" }
        ],
    }
    private peerConnection: Map<number, RTCPeerConnection>;
    private dataChannel: RTCDataChannel | null = null;
    private socket: WebSocket | null = null
    private stream: MediaStream | null = null;
    private roomId: string | null = null


    // Callbacks
    private onParticipantLeaveCallback: ((id: number) => void) | null = null
    private getMediaStreamCallback: ((id: number, stream: MediaStream | null) => void) | null = null
    private getParticipantsCallback: ((participants: Participant) => void) | null = null

    // Singleton instance
    private static instance: WebRTCService | null = null
    public static getInstance(): WebRTCService {
        if (!WebRTCService.instance) {
            WebRTCService.instance = new WebRTCService();
        }
        return WebRTCService.instance
    }

    constructor() {
        this.peerConnection = new Map<number, RTCPeerConnection>();
    }

    // Connect to signaling server
    public async connect(roomId: string): Promise<void> {
        this.roomId = roomId
        const serverUrl = process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL || "ws://localhost:8080"

        return new Promise((resolve, reject) => {
            try {
                this.socket = new WebSocket(`${serverUrl}?roomId=${roomId}`)

                this.socket.onopen = () => {
                    console.log("Connected to signaling server")
                    this.getParticipants
                    resolve()
                }

                this.socket.onmessage = this.handleSignalingMessage.bind(this)

                this.socket.onerror = (error) => {
                    console.error("WebSocket error:", error);
                    reject(error)
                }

                this.socket.onclose = () => {
                    console.log("WebSocket connection closed")
                }
            } catch (error) {
                console.error("Error connecting to signaling server:", error)
                reject(error)
            }
        })
    }

    public getMediaStreams(callback: (id: number, stream: MediaStream | null) => void): void {
        this.getMediaStreamCallback = callback;
    }

    public async sendMediaStream(): Promise<MediaStream | null> {
        console.log("Sending stream...")
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        stream.getTracks().forEach(track => {
            this.peerConnection.forEach((pc) => pc.addTrack(track, stream));
        });
        this.stream = stream;
        this.getMediaStreamCallback && this.getMediaStreamCallback(-1, stream);
        return stream;
    }

    public getParticipants(callback: (participant: Participant) => void): void {
        this.getParticipantsCallback = callback;
        callback({
            id: -1,
            name: "Hulk",
            audio: null,
            video: null,
            screen: null,
        })
    }

    public onParticipantLeave(callback: (id: number) => void): void {
        this.onParticipantLeaveCallback = callback
    }

    public stopMediaStream(): void {
        this.peerConnection.forEach((pc) => {
            pc.getSenders().forEach((sender) => {
                const track = sender.track;
                if (track) {
                    track.stop();
                    pc.removeTrack(sender);
                }
            });
        });
        this.stream?.getTracks().forEach(track => track.stop());
        this.stream = null;
    }

    // Start local media
    // public async startLocalMedia(videoEnabled = true, audioEnabled = true): Promise<MediaStream> {
    //     try {
    //         const constraints = {
    //             video: videoEnabled,
    //             audio: audioEnabled,
    //         }

    //         this.localStream = await navigator.mediaDevices.getUserMedia(constraints)

    //         // Add tracks to peer connection
    //         if (this.peerConnection) {
    //             this.localStream.getTracks().forEach((track) => {
    //                 if (this.peerConnection && this.localStream) {
    //                     this.peerConnection.addTrack(track, this.localStream)
    //                 }
    //             })
    //         }

    //         return this.localStream
    //     } catch (error) {
    //         console.error("Error starting local media:", error)
    //         throw error
    //     }
    // }

    // Toggle video
    // public toggleVideo(enabled: boolean): void {
    //     if (this.localStream) {
    //         const videoTracks = this.localStream.getVideoTracks()
    //         videoTracks.forEach((track) => {
    //             track.enabled = enabled
    //         })

    //         // Notify other participants about the change
    //         this.sendDataMessage({
    //             type: "media-state-change",
    //             videoEnabled: enabled,
    //         })
    //     }
    // }

    // // Toggle audio
    // public toggleAudio(enabled: boolean): void {
    //     if (this.localStream) {
    //         const audioTracks = this.localStream.getAudioTracks()
    //         audioTracks.forEach((track) => {
    //             track.enabled = enabled
    //         })

    //         // Notify other participants about the change
    //         this.sendDataMessage({
    //             type: "media-state-change",
    //             audioEnabled: enabled,
    //         })
    //     }
    // }

    // // Start screen sharing
    // public async startScreenSharing(): Promise<MediaStream> {
    //     try {
    //         const screenStream = await navigator.mediaDevices.getDisplayMedia({
    //             video: true,
    //             audio: true,
    //         })

    //         // Replace video track with screen sharing track
    //         if (this.peerConnection && this.localStream) {
    //             const videoTrack = screenStream.getVideoTracks()[0]

    //             const senders = this.peerConnection.getSenders()
    //             const videoSender = senders.find((sender) => sender.track?.kind === "video")

    //             if (videoSender) {
    //                 videoSender.replaceTrack(videoTrack)
    //             }

    //             // Notify other participants about screen sharing
    //             this.sendDataMessage({
    //                 type: "screen-sharing",
    //                 isSharing: true,
    //             })
    //         }

    //         return screenStream
    //     } catch (error) {
    //         console.error("Error starting screen sharing:", error)
    //         throw error
    //     }
    // }

    // // Stop screen sharing
    // public async stopScreenSharing(): Promise<void> {
    //     try {
    //         if (this.peerConnection && this.localStream) {
    //             // Get original video track from local stream
    //             const videoTrack = this.localStream.getVideoTracks()[0]

    //             const senders = this.peerConnection.getSenders()
    //             const videoSender = senders.find((sender) => sender.track?.kind === "video")

    //             if (videoSender && videoTrack) {
    //                 videoSender.replaceTrack(videoTrack)
    //             }

    //             // Notify other participants about stopping screen sharing
    //             this.sendDataMessage({
    //                 type: "screen-sharing",
    //                 isSharing: false,
    //             })
    //         }
    //     } catch (error) {
    //         console.error("Error stopping screen sharing:", error)
    //         throw error
    //     }
    // }

    // Send a message through the data channel
    public sendDataMessage(message: Message): void {
        if (this.dataChannel && this.dataChannel.readyState === "open") {
            this.dataChannel.send(JSON.stringify(message))
        } else {
            console.error("No open data channel or WebSocket connection")
        }
    }

    // Leave the meeting
    public leave(): void {
        // Close WebSocket
        if (this.socket) {
            this.socket.close()
        }

        // Close data channel
        if (this.dataChannel) {
            this.dataChannel.close()
        }

        // Close peer connection
        this.peerConnection.forEach((pc) => {
            pc.getSenders().forEach((sender) => sender.track?.stop())
            pc.close()
        })
        this.peerConnection.clear()

        // Stop local media stream
        this.stream?.getTracks().forEach((track) => track.stop())

        // Clear state
        this.dataChannel = null
        this.stream = null
        this.socket = null
    }

    // Private methods
    private async setupPeerConnectionListeners(data: Message): Promise<RTCPeerConnection> {
        const pc = new RTCPeerConnection(this.configuration);
        this.peerConnection.set(data.from as number, pc);

        pc.onnegotiationneeded = async () => {
            console.log("Negotiation needed")
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                console.log("Sending negotiation request")
                this.createOffer(pc, ({
                    type: WebRTCEvents.OFFER,
                    from: data.from,
                    to: data.from,
                    data: null,
                }))
            }
        }

        pc.ontrack = async ({ streams }) => {
            streams[0].addEventListener("removetrack", (event) => {
                this.getMediaStreamCallback?.(data.from, null);
            });
            this.getMediaStreamCallback?.(data.from, streams[0]);
        };

        pc.onicecandidate = ({ candidate }) => {
            if (candidate && this.socket?.readyState === WebSocket.OPEN) {
                console.log("Sending ICE candidate")
                this.sendMessage({
                    type: WebRTCEvents.ICE_CANDIDATE,
                    from: data.to,
                    to: data.from,
                    data: candidate,
                })
            }
        }
        // Handle disconnection
        pc.onconnectionstatechange = () => {
            if (
                pc.connectionState === "disconnected" ||
                pc.connectionState === "failed" ||
                pc.connectionState === "closed"
            ) {
                console.log("Peer connection disconnected or failed")
            }

            if (pc.connectionState === "connected") {
                console.log("Peer connection established")
            }
        }

        return pc;
    }

    // private setupDataChannel(): void {
    //     if (!this.dataChannel) return

    //     this.dataChannel.onopen = () => {
    //         console.log("Data channel opened")
    //     }

    //     this.dataChannel.onclose = () => {
    //         console.log("Data channel closed")
    //     }

    //     this.dataChannel.onmessage = (event) => {
    //         try {
    //             const message = JSON.parse(event.data)
    //         } catch (error) {
    //             console.error("Error parsing data channel message:", error)
    //         }
    //     }
    // }

    private async handleSignalingMessage(event: MessageEvent): Promise<void> {
        try {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case WebRTCEvents.OFFER:
                    await this.handleOffer(data)
                    break
                case WebRTCEvents.ANSWER:
                    await this.handleAnswer(data)
                    break
                case WebRTCEvents.ICE_CANDIDATE:
                    await this.handleICECandidate(data)
                    break
                case WebRTCEvents.USER_JOINED:
                    this.handleUserJoined(data);
                    break
                case WebRTCEvents.USER_LEFT:
                    this.peerConnection.get(data.from)?.close()
                    this.peerConnection.delete(data.from)
                    this.onParticipantLeaveCallback && this.onParticipantLeaveCallback(data.from)
                    break;
                case WebRTCEvents.DATA_MESSAGE:
                    this.handleDataMessage(data)
                    break
                default:
                    console.log("Unknown message type:", data.type)
            }
        } catch (error) {
            console.error("Error handling signaling message:", error)
        }
    }

    private async handleOffer(data: Message): Promise<void> {
        try {
            let pc: RTCPeerConnection;
            if (this.peerConnection.has(data.from)) {
                pc = this.peerConnection.get(data.from)!;
            } else {
                pc = await this.setupPeerConnectionListeners(data);
                this.getParticipantsCallback && this.getParticipantsCallback({
                    id: data.from,
                    name: data.name,
                    audio: null,
                    video: null,
                    screen: null,
                })
            }

            if (this.stream) {
                this.stream.getTracks().forEach((track) => {
                    pc.addTrack(track, this.stream!)
                })
            }
            await pc.setRemoteDescription(data.data)

            const answer = await pc.createAnswer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
                iceRestart: true,
            })
            await pc.setLocalDescription(answer)

            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                console.log("Sending answer")
                this.socket.send(
                    JSON.stringify({
                        type: WebRTCEvents.ANSWER,
                        roomId: this.roomId,
                        to: data.from,
                        data: answer,
                    }),
                )
            }
        } catch (error) {
            console.error("Error handling offer", error)
        }
    }

    private async handleAnswer(data: Message): Promise<void> {
        try {
            console.log("Received answer")
            await this.peerConnection.get(data.from)?.setRemoteDescription(new RTCSessionDescription(data.data))
        } catch (error) {
            console.error("Error handling answer:", error)
        }
    }

    private async handleICECandidate(data: Message): Promise<void> {
        try {
            await this.peerConnection.get(data.from)?.addIceCandidate(new RTCIceCandidate(data.data))
        } catch (error) {
            console.error("Error handling ICE candidate:", error);
        }
    }

    private async handleUserJoined(data: Message): Promise<void> {
        let pc: RTCPeerConnection;
        if (this.peerConnection.has(data.from)) {
            pc = this.peerConnection.get(data.from)!;
        } else {
            pc = await this.setupPeerConnectionListeners(data);
            this.getParticipantsCallback && this.getParticipantsCallback({
                id: data.from,
                name: data.name,
                audio: null,
                video: null,
                screen: null,
            })
        }
        if (this.stream) {
            this.stream.getTracks().forEach((track) => {
                pc.addTrack(track, this.stream!)
            })
        }
        this.createOffer(pc, data)
    }

    private handleDataMessage(data: any): void {
    }

    // private createDataChannel(): void {

    //     try {
    //         this.dataChannel = this.peerConnection.createDataChannel("data")
    //         this.setupDataChannel()
    //     } catch (error) {
    //         console.error("Error creating data channel:", error)
    //     }
    // }

    private async createOffer(pc: RTCPeerConnection, data: Message): Promise<void> {
        try {
            const offer = await pc.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
                iceRestart: true,
            })
            await pc.setLocalDescription(offer)

            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                console.log("Sending offer")
                this.sendMessage({
                    type: WebRTCEvents.OFFER,
                    from: -1,
                    to: data.from,
                    data: offer,
                })
            }
        } catch (error) {
            console.error("Error creating offer:", error)
        }
    }

    private sendMessage(message: Message): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message))
        } else {
            console.error("WebSocket is not open")
        }
    }
}