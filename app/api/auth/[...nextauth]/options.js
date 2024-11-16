import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";
import Ticket from "@/app/(models)/Ticket";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("Profile GitHub: ", profile);

        let userRole = "GitHub User";
        if (profile?.email == "iampratik70@gmail.com") {
          userRole = "Artist";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);

        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();

          if (foundUser) {
            console.log("User Exists");
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              console.log("Good Pass");
              delete foundUser.password;

              console.log("User Email:", foundUser.email);
              if (
                foundUser.email === "iampratik@gmail.com" ||
                foundUser.email === "pratik@gmail.com"
              ) {
                console.log("Setting role to Artist");
                foundUser["role"] = "Artist";
              } else if (foundUser.email === "patrick@gmail.com") {
                console.log("Setting role to user");
                foundUser["role"] = "user";
              } else {
                console.log("Setting role to Guest");
                foundUser["role"] = "Guest";
              }

              // if (foundUser.job === "artist") {
              //   foundUser["job"] = "Artist";
              // }
              // if (foundUser.job === "user") {
              //   foundUser["job"] = "User";
              // }
              // if (foundUser.job === "guest") {
              //   foundUser["job"] = "Guest";
              // }

              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
    // async userjob({ userjob, token }) {
    //   if (userjob?.user) userjob.user.job = token.userjob;
    //   return userjob;
    // },
  },
};
