import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { city, population, climateZone, surfaceType, greenSpace, trafficDensity, industrialPresence, targetTemperatureReduction, description } = await req.json();

    const prompt = `You are an AI urban climate and heat island mitigation expert. Analyze the following urban area parameters and provide a comprehensive Urban Heat Island (UHI) mitigation plan.

Urban Area Profile:
- City: ${city}
- Population: ${population}
- Climate Zone: ${climateZone}
- Dominant Surface Type: ${surfaceType}
- Green Space Coverage: ${greenSpace}%
- Traffic Density: ${trafficDensity}
- Industrial Presence: ${industrialPresence}
- Target Temperature Reduction: ${targetTemperatureReduction}°C
- Additional Notes: ${description}

Please provide a comprehensive Urban Heat Island Mitigation Plan including:

1. **UHI Intensity Assessment** (estimated temperature differential between urban core and surrounding rural areas)
2. **Hotspot Identification** (areas with highest heat retention: parking lots, industrial zones, dense urban cores)
3. **Cool Roof Strategy** (albedo modification, green roofs, Cool Roof Rating Council standards)
4. **Urban Green Infrastructure Plan** (tree canopy expansion, urban forests, parks, green corridors, bioswales)
5. **Cool Pavement Solutions** (permeable pavements, reflective coatings, shade structures)
6. **Water-Based Cooling Interventions** (fountains, misting systems, urban water bodies, permeable canals)
7. **Building-Scale Interventions** (shading, ventilation, thermal mass optimization)
8. **Priority Intervention Zones** (ranked list of areas needing most urgent mitigation)
9. **Estimated Cooling Impact** (°C reduction per intervention type)
10. **Energy Savings Projection** (from reduced air conditioning demand)
11. **Public Health Co-Benefits** (heat-related illness reduction, air quality improvement)
12. **Implementation Cost-Benefit Analysis** and funding opportunities (IRA, HUD grants, etc.)
13. **Timeline & Phasing** (short-term wins vs. long-term infrastructure changes)

Format with clear sections, estimated figures, and actionable implementation steps.`;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1800,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: 'DeepSeek API error', details: error }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'No response generated.';

    return NextResponse.json({ result: content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Server error', details: message }, { status: 500 });
  }
}
