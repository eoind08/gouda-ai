export async function POST(request) {
  console.log('=== CHAT ROUTE HIT ===')

  try {
    const body = await request.json()

    console.log('Request body:', body)

    const {
      message,
      model_name = 'Gruyere-1.0-r1',
      max_tokens = 256,
    } = body

    console.log('Sending to Gouda API:', {
      model_name,
      message,
      max_tokens,
    })

    const backendResponse = await fetch(
      'http://138.199.215.250:8000/chat/stream',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model_name,
          message,
          max_tokens,
        }),
      }
    )

    console.log('Backend status:', backendResponse.status)

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text()
      console.error('Backend error:', errorText)

      return new Response(
        JSON.stringify({
          message: 'Backend service error',
          error: errorText,
        }),
        {
          status: backendResponse.status,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    console.log('Backend stream received')

    return new Response(backendResponse.body, {
      status: backendResponse.status,
      headers: {
        'Content-Type':
          backendResponse.headers.get('Content-Type') ||
          'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
      },
    })

  } catch (error) {
    console.error('=== CHAT ROUTE ERROR ===')
    console.error(error)

    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        error: error instanceof Error
          ? error.message
          : String(error),
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}