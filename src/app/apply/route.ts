import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const requestedAmount = Number(body.requestedAmount);
    if (isNaN(requestedAmount)) {
      return NextResponse.json({ error: 'Invalid requested amount' }, { status: 400 });
    }

    let decision: string;

    if (requestedAmount > 50000) {
      decision = 'Declined';
    } else if (requestedAmount === 50000) {
      decision = 'Undecided';
    } else {
      decision = 'Approved';
    }

    return NextResponse.json({ decision });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
