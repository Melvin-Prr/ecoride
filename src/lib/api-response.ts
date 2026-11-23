import { NextResponse } from "next/server";

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function errorResponse(
  message: string,
  status: number = 400,
  errors?: Record<string, string>
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(errors && { errors }),
    },
    { status }
  );
}

export function validationErrorResponse(errors: Record<string, string>) {
  return NextResponse.json(
    {
      success: false,
      errors,
    },
    { status: 422 }
  );
}

export function unauthorizedResponse(message: string = "Non autorisé") {
  return errorResponse(message, 401);
}

export function forbiddenResponse(
  message: string = "Accès interdit"
) {
  return errorResponse(message, 403);
}

export function notFoundResponse(message: string = "Ressource non trouvée") {
  return errorResponse(message, 404);
}
