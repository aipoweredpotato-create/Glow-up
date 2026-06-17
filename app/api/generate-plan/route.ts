import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, age, heightFt, heightIn, weightLbs, bodyFat, goals, equipment, daysPerWeek, sessionDuration, wakeTime, sleepTime } = body

    const systemPrompt = `You are an elite personal transformation coach, nutritionist, skincare expert, and aesthetics specialist with 20+ years experience.

CRITICAL: Return ONLY valid JSON. Zero markdown. Zero explanation. Zero text outside JSON. Just raw, parseable JSON starting with { and ending with }.

Return this exact JSON structure filled with specific, expert, personalized advice based on the user's data:
{
  "userName": "${name}",
  "generatedAt": "${new Date().toISOString()}",
  "audit": {
    "bmi": <number>,
    "bmiCategory": "<Normal Weight|Overweight|Underweight|Obese>",
    "bodyFatCategory": "<Essential Fat|Athlete|Fitness|Average|Obese>",
    "maintenanceCalories": <integer>,
    "targetCalories": <integer>,
    "proteinTarget": "<Xg per day>",
    "keyInsights": ["<insight 1>","<insight 2>","<insight 3>","<insight 4>","<insight 5>"],
    "priorityAreas": ["<area 1>","<area 2>","<area 3>"]
  },
  "schedule": {
    "dailyRoutine": [{"time":"HH:MM","activity":"<name>","duration":"<X min>","notes":"<brief note>"}],
    "weeklyStructure": ["<Mon>","<Tue>","<Wed>","<Thu>","<Fri>","<Sat>","<Sun>"],
    "morningRitual": ["<step 1>","<step 2>","<step 3>","<step 4>","<step 5>"],
    "eveningRitual": ["<step 1>","<step 2>","<step 3>","<step 4>","<step 5>"]
  },
  "products": {
    "skincare": [{"name":"<product>","purpose":"<purpose>","howToUse":"<instructions>","timing":"AM|PM|Both"}],
    "supplements": [{"name":"<supplement>","dosage":"<Xmg/g>","timing":"<when>","benefit":"<why>"}],
    "tools": [{"name":"<tool>","use":"<how>"}]
  },
  "skincare": {
    "morningRoutine": [{"step":1,"product":"<product>","technique":"<how to apply>","duration":"<time>"}],
    "eveningRoutine": [{"step":1,"product":"<product>","technique":"<how to apply>","duration":"<time>"}],
    "weeklyTreatments": [{"treatment":"<name>","frequency":"<X/week>","benefit":"<benefit>"}],
    "skinType": "<skin type>",
    "keyIngredients": ["<ing 1>","<ing 2>","<ing 3>","<ing 4>"],
    "avoid": ["<avoid 1>","<avoid 2>","<avoid 3>"]
  },
  "bodyHair": {
    "hairCareRoutine": [{"step":1,"action":"<action>","product":"<product>","frequency":"<freq>"}],
    "bodyCare": [{"area":"<area>","routine":"<routine>","frequency":"<freq>"}],
    "groomingSchedule": [{"task":"<task>","frequency":"<daily|weekly|monthly>"}],
    "hairGrowthTips": ["<tip 1>","<tip 2>","<tip 3>","<tip 4>"]
  },
  "faceGym": {
    "exercises": [{"name":"<exercise>","targetArea":"<jaw|cheeks|eyes|neck|forehead>","reps":"<X reps>","sets":3,"technique":"<how to do it>"}],
    "dailyRoutineMins": 15,
    "weeklySchedule": "<when to do face gym>",
    "tools": ["<tool 1>","<tool 2>"],
    "benefits": ["<benefit 1>","<benefit 2>","<benefit 3>","<benefit 4>"]
  },
  "food": {
    "dailyMealPlan": {
      "breakfast": {"meal":"<name>","macros":{"calories":0,"protein":0,"carbs":0,"fat":0},"prepTime":"<X min>"},
      "morningSnack": {"meal":"<name>","macros":{"calories":0,"protein":0,"carbs":0,"fat":0},"prepTime":"<X min>"},
      "lunch": {"meal":"<name>","macros":{"calories":0,"protein":0,"carbs":0,"fat":0},"prepTime":"<X min>"},
      "afternoonSnack": {"meal":"<name>","macros":{"calories":0,"protein":0,"carbs":0,"fat":0},"prepTime":"<X min>"},
      "dinner": {"meal":"<name>","macros":{"calories":0,"protein":0,"carbs":0,"fat":0},"prepTime":"<X min>"}
    },
    "hydration": "<daily water target and strategy>",
    "foodsToEat": ["<food 1>","<food 2>","<food 3>","<food 4>","<food 5>","<food 6>","<food 7>","<food 8>"],
    "foodsToAvoid": ["<food 1>","<food 2>","<food 3>","<food 4>","<food 5>"],
    "mealPrepTips": ["<tip 1>","<tip 2>","<tip 3>","<tip 4>"]
  },
  "recipes": [
    {"name":"<recipe>","category":"breakfast","prepTime":"<X min>","calories":0,"macros":{"protein":0,"carbs":0,"fat":0},"ingredients":["<ing 1>","<ing 2>"],"instructions":["<step 1>","<step 2>","<step 3>"],"glowUpTip":"<special tip>"},
    {"name":"<recipe>","category":"lunch","prepTime":"<X min>","calories":0,"macros":{"protein":0,"carbs":0,"fat":0},"ingredients":["<ing 1>","<ing 2>"],"instructions":["<step 1>","<step 2>","<step 3>"],"glowUpTip":"<special tip>"},
    {"name":"<recipe>","category":"dinner","prepTime":"<X min>","calories":0,"macros":{"protein":0,"carbs":0,"fat":0},"ingredients":["<ing 1>","<ing 2>"],"instructions":["<step 1>","<step 2>","<step 3>"],"glowUpTip":"<special tip>"},
    {"name":"<recipe>","category":"snack","prepTime":"<X min>","calories":0,"macros":{"protein":0,"carbs":0,"fat":0},"ingredients":["<ing 1>","<ing 2>"],"instructions":["<step 1>","<step 2>"],"glowUpTip":"<special tip>"}
  ],
  "workout": {
    "weeklyPlan": [
      {"day":"<Day>","focus":"<muscle group>","exercises":[{"name":"<exercise>","sets":4,"reps":"6-8","rest":"3 min","notes":"<form tip>"}],"warmup":["<warmup 1>","<warmup 2>"],"cooldown":["<cooldown 1>","<cooldown 2>"]}
    ],
    "progressionModel": "<how to progress over time>",
    "deloadProtocol": "<deload schedule and approach>",
    "keyLifts": ["<lift 1>","<lift 2>","<lift 3>","<lift 4>"]
  },
  "calisthenics": {
    "skillProgression": [{"skill":"<skill>","currentLevel":"beginner","progressionSteps":["<step 1>","<step 2>","<step 3>"],"timelineWeeks":12}],
    "dailyMovement": [{"exercise":"<exercise>","sets":3,"reps":"10-15","notes":"<note>"}],
    "mobilityWork": ["<mobility 1>","<mobility 2>","<mobility 3>","<mobility 4>","<mobility 5>"],
    "fundamentals": ["<fundamental 1>","<fundamental 2>","<fundamental 3>","<fundamental 4>"]
  },
  "progress": {
    "weeklyCheckIns": ["<metric 1>","<metric 2>","<metric 3>","<metric 4>"],
    "monthlyMilestones": [
      {"month":1,"targets":["<target 1>","<target 2>"],"assessments":["<assessment 1>","<assessment 2>"]},
      {"month":2,"targets":["<target 1>","<target 2>"],"assessments":["<assessment 1>","<assessment 2>"]},
      {"month":3,"targets":["<target 1>","<target 2>"],"assessments":["<assessment 1>","<assessment 2>"]}
    ],
    "photos": ["<photo tip 1>","<photo tip 2>","<photo tip 3>"],
    "metrics": [
      {"metric":"<metric>","baseline":"<starting value>","target":"<goal>","trackingMethod":"<how to track>"}
    ],
    "mindsetCues": ["<cue 1>","<cue 2>","<cue 3>","<cue 4>"]
  }
}`

    const userPrompt = `Create a full personalized transformation blueprint for:
- Name: ${name}
- Age: ${age} years
- Height: ${heightFt}'${heightIn}"
- Weight: ${weightLbs} lbs
- Body Fat: ${bodyFat}%
- Goals: ${Array.isArray(goals) ? goals.join(', ') : goals}
- Equipment: ${Array.isArray(equipment) ? equipment.join(', ') : equipment}
- Training: ${daysPerWeek} days/week, ${sessionDuration} min sessions
- Schedule: Wake ${wakeTime}, Sleep ${sleepTime}

Make every recommendation highly specific to these stats. Return ONLY the JSON.`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 8000,
    })

    let content = completion.choices[0]?.message?.content || ''
    content = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
    const firstBrace = content.indexOf('{')
    const lastBrace = content.lastIndexOf('}')
    if (firstBrace !== -1 && lastBrace !== -1) {
      content = content.slice(firstBrace, lastBrace + 1)
    }

    const plan = JSON.parse(content)
    return NextResponse.json({ success: true, plan })
  } catch (error) {
    console.error('Plan generation error:', error)
    return NextResponse.json({ success: false, error: 'Failed to generate plan. Please try again.' }, { status: 500 })
  }
}
