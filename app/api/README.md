# API Routes

Next.js API routes following the App Router convention.

## Structure

Each API endpoint is a folder with a `route.ts` file that exports HTTP method handlers.

```
app/api/
├── optimize/
│   └── route.ts          # POST /api/optimize
├── upload/
│   └── route.ts          # POST /api/upload
└── [id]/
    └── route.ts          # GET /api/[id]
```

## Route Handler Example

```typescript
// app/api/optimize/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Your logic here
    const result = await processImage(body);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process image" },
      { status: 500 }
    );
  }
}

// Optional: Configure route segment config
export const runtime = "edge"; // 'nodejs' (default) | 'edge'
export const dynamic = "force-dynamic"; // 'auto' | 'force-dynamic' | 'force-static'
```

## Supported HTTP Methods

- `GET` - Retrieve data
- `POST` - Create new resources
- `PUT` - Update resources
- `PATCH` - Partial updates
- `DELETE` - Remove resources
- `HEAD` - Get headers only
- `OPTIONS` - CORS preflight

## Best Practices

1. Use TypeScript for type safety
2. Validate input data
3. Handle errors gracefully
4. Return appropriate HTTP status codes
5. Use middleware for authentication
6. Keep handlers focused and testable
