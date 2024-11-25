/*
  Warnings:

  - You are about to drop the `todayHabit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `todayHabitCheck` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuthKey" DROP CONSTRAINT "AuthKey_studyId_fkey";

-- DropForeignKey
ALTER TABLE "Emojis" DROP CONSTRAINT "Emojis_studyId_fkey";

-- DropForeignKey
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_studyId_fkey";

-- DropForeignKey
ALTER TABLE "todayHabitCheck" DROP CONSTRAINT "todayHabitCheck_habitId_fkey";

-- DropTable
DROP TABLE "todayHabit";

-- DropTable
DROP TABLE "todayHabitCheck";

-- AddForeignKey
ALTER TABLE "AuthKey" ADD CONSTRAINT "AuthKey_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emojis" ADD CONSTRAINT "Emojis_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;
