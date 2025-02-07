import { auth, currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";




export default async function Dashboard() {


  // const { userId } = await auth();



  // if(!userId) {
  //   return (
  //     <div>
  //       <p className="text-3xl font-medium text-sky-700">Dashboard</p>
  //       <Link href="/sign-in">
  //         <Button variant="destructive">SignIn</Button>
  //       </Link>
  //     </div>
  //   );
  // }

  // const user = await currentUser();

  // return (
  //   <div>
  //     <p className="text-3xl font-medium text-sky-700">Dashboard</p>
  //     {user && (
  //       <p className="text-lg font-medium text-sky-700">
  //         Hello {user.fullName}
  //       </p>
  //     )}
  //   </div>
  // );

  return (
    <header
      style={{ display: "flex", justifyContent: "space-between", padding: 20 }}
    >
      <h1>My App</h1>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </header>
  );


}
