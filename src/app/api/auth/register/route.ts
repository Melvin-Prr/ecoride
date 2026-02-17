import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, validatePasswordStrength, generateToken } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, pseudo, password } = body;

    // Validation
    const errors: Record<string, string> = {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email invalide";
    }

    if (!pseudo || pseudo.length < 3) {
      errors.pseudo = "Le pseudo doit contenir au moins 3 caractères";
    }

    if (!password) {
      errors.password = "Le mot de passe est requis";
    } else {
      const passwordValidation = validatePasswordStrength(password);
      if (!passwordValidation.valid) {
        errors.password = passwordValidation.message || "Mot de passe invalide";
      }
    }

    if (Object.keys(errors).length > 0) {
      return validationErrorResponse(errors);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { pseudo }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return errorResponse("Cet email est déjà utilisé", 409);
      }
      if (existingUser.pseudo === pseudo) {
        return errorResponse("Ce pseudo est déjà utilisé", 409);
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user with 20 initial credits
    const user = await prisma.user.create({
      data: {
        email,
        pseudo,
        password: hashedPassword,
        credits: 20,
        role: "PASSENGER",
      },
      select: {
        id: true,
        email: true,
        pseudo: true,
        role: true,
        credits: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return successResponse(
      {
        user,
        token,
      },
      201
    );
  } catch (error) {
    console.error("Registration error:", error);
    return errorResponse("Erreur lors de l'inscription", 500);
  }
}
