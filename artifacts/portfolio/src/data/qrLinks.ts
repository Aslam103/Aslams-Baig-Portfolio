export interface QRLink {
  id: string;
  label: string;
  url: string; // The base URL. If empty, the component will use window.location
  useWindowLocation?: boolean;
}

export const qrLinks: QRLink[] = [
  {
    id: "portfolio",
    label: "Portfolio",
    url: "",
    useWindowLocation: true
  },
  {
    id: "youtube-apex",
    label: "YouTube — Apex Aslam",
    url: "https://youtube.com/@apex_aslam"
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    url: "https://wa.me/919423292087"
  }
];