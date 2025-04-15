-- CreateTable
CREATE TABLE "Study" (
    "id" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "studyName" TEXT NOT NULL,
    "introduce" TEXT NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 0,
    "background" TEXT NOT NULL DEFAULT 'green',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthKey" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emojis" (
    "id" TEXT NOT NULL,
    "emojiIcon" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studyId" TEXT NOT NULL,

    CONSTRAINT "Emojis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'noName',
    "monday" BOOLEAN NOT NULL DEFAULT false,
    "tuesday" BOOLEAN NOT NULL DEFAULT false,
    "wendnesday" BOOLEAN NOT NULL DEFAULT false,
    "thursday" BOOLEAN NOT NULL DEFAULT false,
    "friday" BOOLEAN NOT NULL DEFAULT false,
    "saturday" BOOLEAN NOT NULL DEFAULT false,
    "sunday" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studyId" TEXT NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todayHabit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "todayHabit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todayHabitCheck" (
    "id" TEXT NOT NULL,
    "habitId" TEXT NOT NULL,
    "checkDate" TIMESTAMP(3) NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "todayHabitCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "todayHabit_name_key" ON "todayHabit"("name");

-- AddForeignKey
ALTER TABLE "AuthKey" ADD CONSTRAINT "AuthKey_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emojis" ADD CONSTRAINT "Emojis_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todayHabitCheck" ADD CONSTRAINT "todayHabitCheck_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "todayHabit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
