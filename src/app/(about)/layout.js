import InsightRoll from "@/src/components/About/InsightRoll";


const insights = [
    "5+ Projects Completed",
    "2+ Years of Experience",
    "99% Client Satisfaction",
    "9K+ Followers on LinkedIn",
    "Participated in Hackathon Secured Place in Top 100 🏆",
  ];

export default function AboutLayout({ children }) {
  return (
    <main className="w-full flex flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      {children}
    </main>
  );
}
