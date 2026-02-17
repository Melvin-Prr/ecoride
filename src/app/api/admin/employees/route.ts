import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken, hashPassword, validatePasswordStrength } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return apiError("Token manquant", 401);
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return apiError("Token invalide", 401);
    }

    // Verify user is admin
    const admin = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!admin || admin.role !== "ADMIN") {
      return apiError("Accès refusé. Espace réservé aux administrateurs.", 403);
    }

    // Get request body
    const body = await req.json();
    const { email, pseudo, password } = body;

    // Validation
    const errors: Record<string, string> = {};

    if (!email || !email.trim()) {
      errors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "L'email n'est pas valide";
    }

    if (!pseudo || !pseudo.trim()) {
      errors.pseudo = "Le pseudo est requis";
    } else if (pseudo.length < 3) {
      errors.pseudo = "Le pseudo doit contenir au moins 3 caractères";
    }

    if (!password) {
      errors.password = "Le mot de passe est requis";
    } else if (!validatePasswordStrength(password)) {
      errors.password = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial";
    }

    if (Object.keys(errors).length > 0) {
      return apiError("Erreurs de validation", 400, errors);
    }

    // Check if email or pseudo already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email.toLowerCase() }, { pseudo }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        errors.email = "Cet email est déjà utilisé";
      }
      if (existingUser.pseudo === pseudo) {
        errors.pseudo = "Ce pseudo est déjà utilisé";
      }
      return apiError("Email ou pseudo déjà utilisé", 400, errors);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create employee user
    const employee = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        pseudo,
        password: hashedPassword,
        role: "EMPLOYEE",
        credits: 0, // Employees start with 0 credits
      },
    });

    // Remove password from response
    const { password: _, ...employeeWithoutPassword } = employee;

    return apiSuccess({
      employee: employeeWithoutPassword,
      message: "Compte employé créé avec succès",
    }, 201);
  } catch (error) {
    console.error("Create employee error:", error);
    return apiError("Erreur lors de la création du compte employé", 500);
  }
}
