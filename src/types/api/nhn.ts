export type TNHNValidationReturn = {
  header: {
    resultCode: number;
    resultMessage: string;
    isSuccessful: boolean;
  };
  data: {
    similarity: number;
    face: {
      bbox: {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
      };
      confidence: number;
      faceId: string;
      imageId: string;
      externalImageId: string;
    };
    sourceFace: {
      bbox: {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
      };
      landmarks: {
        type: string;
        x: number;
        y: number;
      }[];
      orientation: {
        x: number;
        y: number;
        z: number;
      };
      mask: boolean;
      spoofing: boolean;
      confidence: number;
    };
  };
};

export type TNHNSearchReturn = {
  header: {
    resultCode: number;
    resultMessage: string;
    isSuccessful: boolean;
  };
  data: {
    matchFaceCount: number;
    matchFaces: {
      face: {
        faceId: string;
        imageId: string;
        externalImageId: string;
        bbox: {
          x0: number;
          y0: number;
          x1: number;
          y1: number;
        };
        confidence: number;
      };
      similarity: number;
    }[];
    sourceFace: {
      bbox: {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
      };
      landmarks: {
        type: string;
        x: number;
        y: number;
      }[];
      orientation: {
        x: number;
        y: number;
      };
      mask: boolean;
      spoofing: boolean;
      confidence: number;
    };
  };
};

export type TNHNAntiSpoofingReturn = {
  header: {
    resultCode: number;
    resultMessage: string;
    isSuccessful: boolean;
  };
  data: {
    faceDetailCount: number;
    faceDetails: {
      bbox: {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
      };
      landmarks: {
        type: string;
        x: number;
        y: number;
      }[];
      spoofing: boolean;
      confidence: number;
    }[];
  };
};
