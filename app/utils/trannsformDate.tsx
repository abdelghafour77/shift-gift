interface DurationInfo {
  formatted: string;
  hours: number;
}

export const extractDate = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  return date.toISOString().split("T")[0]; // => "2025-08-05"
};

export const extractTime = (dateTimeString: string): string => {
  if (!dateTimeString) return "-";

  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (hours === 0 && minutes === 0) {
    return "-";
  }

  return `${String(hours).padStart(2, "0")}h${String(minutes).padStart(2, "0")}`;
};

export function parseDuration(duration: string): DurationInfo {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)(?:\.\d+)?S)?/;
  const matches = duration.match(regex);

  const hours = matches?.[1] ? parseInt(matches[1], 10) : 0;
  const minutes = matches?.[2] ? parseInt(matches[2], 10) : 0;

  return {
    formatted: `${hours}h ${minutes}min`,
    hours: hours + minutes / 60,
  };
}
