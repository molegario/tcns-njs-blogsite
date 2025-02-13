import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // Apply an (optional) custom config:
  // config: {
  //   uploadthingId: process.env.UPLOADTHING_APP_ID,
  //   uploadthingSecret: process.env.UPLOADTHING_SECRET,
  //   callbackUrl: "http://10.5.0.2:3000/api/uploadthing",
  // },
});
