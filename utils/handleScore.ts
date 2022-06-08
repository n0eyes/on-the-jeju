import { ScoreDto } from "../fetcher/destination";

export const mappingScore = (score: number) => (score * 5).toFixed(1);

export const getScoreAvg = (scoreDto: ScoreDto): string => {
  let sum = 0;
  const keyList = Object.keys(scoreDto).filter((key) => key.includes("Score"));
  keyList.forEach((key) => (sum += +mappingScore(scoreDto[key])));

  return (sum / keyList.length).toFixed(1);
};

export const mappingName = (name: string) => {
  switch (name) {
    case "뷰": {
      return "viewScore";
    }
    case "가격": {
      return "priceScore";
    }
    case "편의시설": {
      return "facilityScore";
    }
    case "서비스": {
      return "surroundScore";
    }
    default: {
      return "";
    }
  }
};
