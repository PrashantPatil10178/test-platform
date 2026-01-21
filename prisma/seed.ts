import { PrismaClient, Difficulty } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Update existing subjects to use correct codes
  const existingPhysics = await prisma.subject.findFirst({
    where: { OR: [{ name: "Physics" }, { code: "PHY" }] },
  });
  if (existingPhysics) {
    await prisma.subject.update({
      where: { id: existingPhysics.id },
      data: { code: "PHYS", name: "Physics" },
    });
    console.log("Updated Physics subject code to PHYS");
  }

  const existingMath = await prisma.subject.findFirst({
    where: { OR: [{ name: "Mathematics" }, { code: "MATH" }] },
  });
  if (existingMath) {
    await prisma.subject.update({
      where: { id: existingMath.id },
      data: { code: "MATHS_1", name: "Mathematics I" },
    });
    console.log("Updated Mathematics subject code to MATHS_1");
  }

  // Create Subjects with correct enum codes
  const physics = await prisma.subject.upsert({
    where: { code: "PHYS" },
    update: { name: "Physics", isActive: true },
    create: { name: "Physics", code: "PHYS" },
  });

  const chemistry = await prisma.subject.upsert({
    where: { code: "CHEM" },
    update: { name: "Chemistry", isActive: true },
    create: { name: "Chemistry", code: "CHEM" },
  });

  const maths1 = await prisma.subject.upsert({
    where: { code: "MATHS_1" },
    update: { name: "Mathematics I", isActive: true },
    create: { name: "Mathematics I", code: "MATHS_1" },
  });

  const maths2 = await prisma.subject.upsert({
    where: { code: "MATHS_2" },
    update: { name: "Mathematics II", isActive: true },
    create: { name: "Mathematics II", code: "MATHS_2" },
  });

  const biology = await prisma.subject.upsert({
    where: { code: "BIO" },
    update: { name: "Biology", isActive: true },
    create: { name: "Biology", code: "BIO" },
  });

  console.log("Subjects created/verified.");

  // Create Chapters
  const mechanics = await prisma.chapter.upsert({
    where: { subjectId_code: { subjectId: physics.id, code: "PHYS-01" } },
    update: {},
    create: {
      subjectId: physics.id,
      name: "Mechanics",
      code: "PHYS-01",
    },
  });

  const organicChem = await prisma.chapter.upsert({
    where: { subjectId_code: { subjectId: chemistry.id, code: "CHEM-01" } },
    update: {},
    create: {
      subjectId: chemistry.id,
      name: "Organic Chemistry",
      code: "CHEM-01",
    },
  });

  const calculus = await prisma.chapter.upsert({
    where: { subjectId_code: { subjectId: maths1.id, code: "MATHS1-01" } },
    update: {},
    create: {
      subjectId: maths1.id,
      name: "Calculus",
      code: "MATHS1-01",
    },
  });

  const cellBiology = await prisma.chapter.upsert({
    where: { subjectId_code: { subjectId: biology.id, code: "BIO-01" } },
    update: {},
    create: {
      subjectId: biology.id,
      name: "Cell Biology",
      code: "BIO-01",
    },
  });

  console.log("Chapters created/verified.");

  // Create sample questions for each subject (Class 11 and Class 12)
  // Physics Questions
  await prisma.question.upsert({
    where: { id: "seed-phys-q1" },
    update: {},
    create: {
      id: "seed-phys-q1",
      subjectId: physics.id,
      chapterId: mechanics.id,
      class: 12,
      questionText: "What is the law of conservation of energy?",
      option1: "Energy cannot be created or destroyed",
      option2: "Energy can be created and destroyed",
      option3: "Energy is always increasing",
      option4: "Energy is always decreasing",
      correctOption: 1,
      difficulty: Difficulty.EASY,
      marks: 4,
      negativeMarks: 1,
    },
  });

  await prisma.question.upsert({
    where: { id: "seed-phys-q2" },
    update: {},
    create: {
      id: "seed-phys-q2",
      subjectId: physics.id,
      chapterId: mechanics.id,
      class: 11,
      questionText: "What is Newton's first law of motion?",
      option1: "F = ma",
      option2: "An object at rest stays at rest unless acted upon",
      option3: "For every action there is an equal reaction",
      option4: "Energy is conserved",
      correctOption: 2,
      difficulty: Difficulty.EASY,
      marks: 4,
      negativeMarks: 1,
    },
  });

  // Chemistry Questions
  await prisma.question.upsert({
    where: { id: "seed-chem-q1" },
    update: {},
    create: {
      id: "seed-chem-q1",
      subjectId: chemistry.id,
      chapterId: organicChem.id,
      class: 12,
      questionText: "What is the main component of natural gas?",
      option1: "Butane",
      option2: "Propane",
      option3: "Methane",
      option4: "Ethane",
      correctOption: 3,
      difficulty: Difficulty.MEDIUM,
      marks: 4,
      negativeMarks: 1,
    },
  });

  await prisma.question.upsert({
    where: { id: "seed-chem-q2" },
    update: {},
    create: {
      id: "seed-chem-q2",
      subjectId: chemistry.id,
      chapterId: organicChem.id,
      class: 11,
      questionText: "What is the atomic number of Carbon?",
      option1: "4",
      option2: "6",
      option3: "8",
      option4: "12",
      correctOption: 2,
      difficulty: Difficulty.EASY,
      marks: 4,
      negativeMarks: 1,
    },
  });

  // Mathematics Questions
  await prisma.question.upsert({
    where: { id: "seed-math-q1" },
    update: {},
    create: {
      id: "seed-math-q1",
      subjectId: maths1.id,
      chapterId: calculus.id,
      class: 12,
      questionText: "What is the integral of 1/x?",
      option1: "ln(x)",
      option2: "x^2",
      option3: "1/x^2",
      option4: "e^x",
      correctOption: 1,
      difficulty: Difficulty.MEDIUM,
      marks: 4,
      negativeMarks: 1,
    },
  });

  await prisma.question.upsert({
    where: { id: "seed-math-q2" },
    update: {},
    create: {
      id: "seed-math-q2",
      subjectId: maths1.id,
      chapterId: calculus.id,
      class: 11,
      questionText: "What is the derivative of x^2?",
      option1: "x",
      option2: "2x",
      option3: "x^2",
      option4: "2",
      correctOption: 2,
      difficulty: Difficulty.EASY,
      marks: 4,
      negativeMarks: 1,
    },
  });

  // Biology Questions
  await prisma.question.upsert({
    where: { id: "seed-bio-q1" },
    update: {},
    create: {
      id: "seed-bio-q1",
      subjectId: biology.id,
      chapterId: cellBiology.id,
      class: 12,
      questionText: "What is the powerhouse of the cell?",
      option1: "Nucleus",
      option2: "Mitochondria",
      option3: "Ribosome",
      option4: "Endoplasmic Reticulum",
      correctOption: 2,
      difficulty: Difficulty.EASY,
      marks: 4,
      negativeMarks: 1,
    },
  });

  await prisma.question.upsert({
    where: { id: "seed-bio-q2" },
    update: {},
    create: {
      id: "seed-bio-q2",
      subjectId: biology.id,
      chapterId: cellBiology.id,
      class: 11,
      questionText: "What is the basic unit of life?",
      option1: "Atom",
      option2: "Molecule",
      option3: "Cell",
      option4: "Tissue",
      correctOption: 3,
      difficulty: Difficulty.EASY,
      marks: 4,
      negativeMarks: 1,
    },
  });

  console.log("Sample questions created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
