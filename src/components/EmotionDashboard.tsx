import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Activity, ArrowLeft } from "lucide-react";

type EmotionType = "happy" | "calm" | "sad" | "stressed";

interface EmotionState {
  emoji: string;
  name: string;
  color: string;
  glowColor: string;
  message: string;
  suggestion: string;
  actionLabel: string;
  bgGradient: string;
}

const emotions: Record<EmotionType, EmotionState> = {
  happy: {
    emoji: "😄",
    name: "Happy",
    color: "hsl(var(--emotion-happy))",
    glowColor: "rgba(250, 204, 21, 0.3)",
    message: "You seem in great spirits today!",
    suggestion: "Your positive energy is contagious. Keep spreading joy!",
    actionLabel: "Share Mood",
    bgGradient: "from-yellow-500/20 to-orange-500/20",
  },
  calm: {
    emoji: "😌",
    name: "Calm",
    color: "hsl(var(--emotion-calm))",
    glowColor: "rgba(20, 184, 166, 0.3)",
    message: "Your stress level is stable. Keep it up 💜",
    suggestion: "Maintain this peaceful state with a short meditation session.",
    actionLabel: "Start Meditation",
    bgGradient: "from-teal-500/20 to-cyan-500/20",
  },
  sad: {
    emoji: "😢",
    name: "Sad",
    color: "hsl(var(--emotion-sad))",
    glowColor: "rgba(59, 130, 246, 0.3)",
    message: "I sense you're feeling low. Let's take a short break.",
    suggestion: "Talk to a crew member or engage in a comforting activity.",
    actionLabel: "Connect with Crew",
    bgGradient: "from-blue-500/20 to-indigo-500/20",
  },
  stressed: {
    emoji: "😫",
    name: "Stressed",
    color: "hsl(var(--emotion-stressed))",
    glowColor: "rgba(239, 68, 68, 0.3)",
    message: "High stress detected — let's try deep breathing.",
    suggestion: "Take 5 minutes for breathing exercises to restore balance.",
    actionLabel: "Start Breathing Exercise",
    bgGradient: "from-red-500/20 to-pink-500/20",
  },
};

export default function EmotionDashboard() {
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType>("calm");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const emotion = emotions[currentEmotion];

  const handleEmotionChange = (newEmotion: EmotionType) => {
    setCurrentEmotion(newEmotion);
    setLastUpdate(new Date());
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/30 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 text-muted-foreground hover:text-foreground"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Emotion Dashboard</h1>
          </div>
          <p className="text-muted-foreground">AI-detected emotional state in real time</p>
        </div>

        {/* Device Status */}
        <Card className="mb-6 p-4 bg-card/50 backdrop-blur-sm border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-primary animate-pulse" />
              <span className="font-medium">Device Status</span>
            </div>
            <Badge className="bg-primary text-primary-foreground">Connected</Badge>
          </div>
        </Card>

        {/* Main Emotion Display */}
        <Card
          className={`mb-6 p-8 md:p-12 bg-gradient-to-br ${emotion.bgGradient} backdrop-blur-sm border-2 transition-all duration-500`}
          style={{
            borderColor: emotion.color,
            boxShadow: `0 0 40px ${emotion.glowColor}`,
          }}
        >
          <div className="text-center">
            {/* Emoji with glow effect */}
            <div
              className="inline-block mb-6 text-9xl animate-pulse-glow"
              style={{
                filter: `drop-shadow(0 0 30px ${emotion.glowColor})`,
              }}
            >
              {emotion.emoji}
            </div>

            {/* Emotion Name */}
            <h2
              className="text-5xl font-bold mb-4"
              style={{ color: emotion.color }}
            >
              {emotion.name}
            </h2>

            {/* Status Message */}
            <p className="text-xl text-foreground/90 mb-2">{emotion.message}</p>

            {/* Last Updated */}
            <p className="text-sm text-muted-foreground">
              Last updated: {formatTime(lastUpdate)}
            </p>
          </div>
        </Card>

        {/* AI Suggestion Card */}
        <Card className="mb-6 p-6 bg-card/60 backdrop-blur-sm border-primary/20">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AstroMate Suggestion</h3>
              <p className="text-muted-foreground">{emotion.suggestion}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
              style={{
                boxShadow: `0 0 20px ${emotion.glowColor}`,
              }}
            >
              {emotion.actionLabel}
            </Button>
            <Button variant="outline">Dismiss</Button>
          </div>
        </Card>

        {/* Emotion Switcher (Demo) */}
        <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20">
          <h3 className="text-lg font-semibold mb-4">Simulate Emotion (Demo)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(Object.keys(emotions) as EmotionType[]).map((key) => (
              <Button
                key={key}
                onClick={() => handleEmotionChange(key)}
                variant={currentEmotion === key ? "default" : "outline"}
                className="flex flex-col items-center gap-2 h-auto py-4"
                style={
                  currentEmotion === key
                    ? {
                        backgroundColor: emotions[key].color,
                        borderColor: emotions[key].color,
                      }
                    : {}
                }
              >
                <span className="text-3xl">{emotions[key].emoji}</span>
                <span className="text-sm">{emotions[key].name}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
