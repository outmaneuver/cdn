interface ShareXConfig {
  Version: string;
  Name: string;
  DestinationType: string;
  RequestMethod: string;
  RequestURL: string;
  Headers: {
    Authorization: string;
  };
  Body: string;
  FileFormName: string;
  URL: string;
  ThumbnailURL: string;
  DeletionURL: string;
}

export const generateShareXConfig = (token: string): ShareXConfig => {
  const baseUrl = window.location.origin;
  
  return {
    Version: "13.7.0",
    Name: "CDN Upload",
    DestinationType: "ImageUploader",
    RequestMethod: "POST",
    RequestURL: `${baseUrl}/api/upload`,
    Headers: {
      Authorization: `Bearer ${token}`
    },
    Body: "MultipartFormData",
    FileFormName: "file",
    URL: "$json:url$",
    ThumbnailURL: "$json:url$",
    DeletionURL: `${baseUrl}/api/upload/$json:filename$`
  };
};

export const downloadShareXConfig = (token: string) => {
  const config = generateShareXConfig(token);
  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cdn-sharex.sxcu';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}; 