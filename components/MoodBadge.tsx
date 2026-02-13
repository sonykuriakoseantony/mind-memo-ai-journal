type MoodType = "positive" | "neutral" | "stressed" | "reflective" | "sad" | "energetic" | "excited";

interface ModdBadgeProps {
  sentiment: string;
  emoji?: string;
}

const emojiMap: Record<MoodType, string> = {
  positive: "😊",
  neutral: "😐",
  sad: "😢",
  reflective: "🤔",
  stressed: "😣",
  energetic: "🔥",
  excited: "🤩",
};

export function MoodBadge({ sentiment, emoji }: ModdBadgeProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "bg-mood-positive/15 text-mood-positive border-mood-positive/30";
      case "stressed":
        return "bg-mood-stressed/15 text-mood-stressed border-mood-stressed/30";
      case "neutral":
        return "bg-mood-neutral/15 text-mood-neutral border-mood-neutral/30";
      case "reflective":
        return "bg-mood-neutral/15 text-mood-neutral border-mood-neutral/30";
      case "energetic":
        return "bg-orange-200/15 text-orange-500 border-orange-800/30";
      case "excited":
        return "bg-purple-300/15 text-purple-600 border-purple-300/30";
      case "sad":
        return "bg-mood-sad/15 text-mood-sad border-mood-sad/30";

      default:
        return "bg-orange-200/15 text-orange-700 border-orange-800/30";
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 ${getSentimentColor(sentiment)}`}
    >
      <span className="text-base">{emoji}</span>
      <span>{sentiment}</span>
    </span>
  );
}
