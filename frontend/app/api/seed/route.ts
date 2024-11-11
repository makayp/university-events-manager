import { dummyEvents } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function POST() {
  const flaskApiUrl = `${process.env.SERVER_ENDPOINT}/events/create`;

  const events = dummyEvents;

  try {
    const results = await Promise.all(
      events.map(async (event) => {
        const response = await fetch(flaskApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHBpcnkiOiIyMDI0LTExLTI1VDE2OjI3OjMzLjk4NjM4MyswMDowMCJ9.rb79dJSEH3BIzFbgQcF-4KkWBRyAiy31hznJGlYfi-A`, // Replace with a valid token
          },
          body: JSON.stringify(event),
        });

        if (!response.ok) {
          throw new Error(`Failed to seed event: ${event.event_name}`);
        }

        return response.json();
      })
    );

    return NextResponse.json({
      success: true,
      message: 'Dummy events seeded successfully',
      results,
    });
  } catch (error) {
    console.error('Error seeding events:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to seed events',
      },
      { status: 500 }
    );
  }
}
