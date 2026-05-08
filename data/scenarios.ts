export const PM_FALLBACK_SCENARIOS = [
  {
    scene: "Day 1, 9:32 AM — Your team's flagship app is being trashed on Twitter. Users say it crashes every 10 minutes. Engineering says a fix will delay your big launch by 2 weeks. Your CEO is in the next meeting. What do you do?",
    options: [
      "Delay the launch by 2 weeks to fix the bug properly",
      "Ship a partial fix now, full fix in v1.1",
      "Launch on time — focus on marketing instead",
    ],
  },
  {
    scene: "11:47 AM — A designer just sent you 3 Figma options for the onboarding screen. The data team says Option B converts 12% better, but the CEO loves Option A. The team is split. What's your call?",
    options: [
      "Go with data — pick Option B",
      "Run a 50/50 A/B test for one week",
      "Pick CEO's favorite — keep him happy",
    ],
  },
  {
    scene: "2:15 PM — A senior engineer DMs you: 'I'm leaving the company in 2 weeks.' He's the only one who understands the payment system. Your launch is in 10 days.",
    options: [
      "Pause his exit & negotiate a counter-offer",
      "Pair him with 2 engineers to transfer knowledge fast",
      "Let him go — hire a replacement immediately",
    ],
  },
  {
    scene: "4:48 PM — A school kid emails: 'Your app helped me start my first business. Thank you.' Same time, an investor messages: 'Your DAU dropped 8% — should we worry?'",
    options: [
      "Reply to the kid first, then the investor",
      "Forward kid's email to your team, jump on investor call",
      "Schedule both for tomorrow",
    ],
  },
  {
    scene: "End of Day, 7:30 PM — Your team is exhausted. The launch is tomorrow. One last call: do you push the team for a final review or trust the work and go home?",
    options: [
      "One final 30-min review — better safe than sorry",
      "Trust the team, send everyone home early",
      "Stay alone & review everything yourself till midnight",
    ],
  },
];

export const SE_FALLBACK_SCENARIOS = [
  {
    scene: "9:00 AM — You just found a critical security vulnerability in production. It's exposing user data. Fixing it properly takes 4 hours. The big demo is in 2 hours. What do you do?",
    options: [
      "Patch it immediately — delay the demo",
      "Quick temporary fix now, proper fix after demo",
      "Inform the team lead and let them decide",
    ],
  },
  {
    scene: "11:00 AM — You've been assigned a legacy codebase with zero documentation. Your manager wants a new feature in 3 days. What's your approach?",
    options: [
      "Dive deep into the code for 2 days, then build",
      "Build the feature and document as you go",
      "Request a 1-week extension to do it properly",
    ],
  },
  {
    scene: "2:00 PM — Code review: a junior dev's code works but is inefficient. Fixing it properly would take you 3 hours. The release is tomorrow.",
    options: [
      "Merge it — it works, optimise later",
      "Stay late and fix it tonight",
      "Give detailed feedback and ask them to fix it",
    ],
  },
  {
    scene: "4:30 PM — Your team disagrees on architecture: microservices vs monolith for the new feature. You have an opinion but you're the junior. What do you do?",
    options: [
      "Speak up confidently with data to back you up",
      "Stay quiet and go with the senior's call",
      "Suggest a proof-of-concept to test both",
    ],
  },
  {
    scene: "7:00 PM — Production is down. 50,000 users affected. You found the bug but the fix might break 3 other things. The CTO is on standby.",
    options: [
      "Deploy the fix immediately — downtime is worse",
      "Test the fix for 30 mins, then deploy",
      "Rollback to the previous version first",
    ],
  },
];
