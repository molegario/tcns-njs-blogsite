const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  //1 - seed categories in DB
  try {
    await database.category.createMany({
      data: [
        { name: "Movies" },
        { name: "Shows" },
        { name: "Hardware" },
        { name: "Software" },
        { name: "Fashion" },
        { name: "Sports" },
        { name: "Music" },
        { name: "Food" },
        { name: "Health" },
        { name: "Anime" },
        { name: "Art" },
        { name: "Books" },
        { name: "Business" },
        { name: "Design" },
        { name: "Education" },
        { name: "Entertainment" },
        { name: "Fitness" },
        { name: "Gaming" },
        { name: "History" },
        { name: "Lifestyle" },
        { name: "Marketing" },
        { name: "Motivation" },
        { name: "News" },
        { name: "Philosophy" },
        { name: "Photography" },
        { name: "Politics" },
        { name: "Science" },
        { name: "Travel" },
        { name: "Technology" },
        { name: "Web Development" },
        { name: "Writing" },
        { name: "Uncategorized" },
      ],
    });
    console.log("Success seeding categories!");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Failed to seed DB.");
    }
  } finally {
    await database.$disconnect();
  }
}

main();
