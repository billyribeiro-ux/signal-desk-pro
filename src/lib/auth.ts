import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            memberships: {
              include: { organization: true },
              take: 1,
            },
          },
        });

        if (!user) return null;

        // In production: verify password hash with bcrypt
        // For demo/dev: accept any password for seeded users
        if (process.env.NODE_ENV === "development" || process.env.NEXTAUTH_DEMO === "true") {
          const membership = user.memberships[0];
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            organizationId: membership?.organizationId ?? null,
            role: membership?.role ?? "CLIENT",
          };
        }

        // Production: validate passwordHash
        // const valid = await bcrypt.compare(credentials.password, user.passwordHash ?? "");
        // if (!valid) return null;

        const membership = user.memberships[0];
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          organizationId: membership?.organizationId ?? null,
          role: membership?.role ?? "CLIENT",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const u = user as unknown as { organizationId?: string | null; role?: string };
        token.organizationId = u.organizationId ?? null;
        token.role = u.role ?? "CLIENT";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as Record<string, unknown>).id = token.id;
        (session.user as Record<string, unknown>).organizationId = token.organizationId;
        (session.user as Record<string, unknown>).role = token.role;
      }
      return session;
    },
  },
};

// Type augmentation for NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      organizationId: string | null;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    organizationId: string | null;
    role: string;
  }
}
