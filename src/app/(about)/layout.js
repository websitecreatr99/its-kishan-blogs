import InsightRoll from "@/src/components/About/InsightRoll";


const insights = [
    "5+ Projects Completed",
    "3+ Years of Experience",
    "99% Client Satisfaction",
    "15k+ Followers on LinkedIn",
    "Participated in Hackathon 🏆",
  ];

export default function AboutLayout({ children }) {
  return (
    <main className="w-full flex flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      {children}
    </main>
  );
}
