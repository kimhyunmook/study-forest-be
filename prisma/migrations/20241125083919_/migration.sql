-- DropForeignKey
ALTER TABLE "AuthKey" DROP CONSTRAINT "AuthKey_studyId_fkey";

-- DropForeignKey
ALTER TABLE "Emojis" DROP CONSTRAINT "Emojis_studyId_fkey";

-- DropForeignKey
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_studyId_fkey";

-- AddForeignKey
ALTER TABLE "AuthKey" ADD CONSTRAINT "AuthKey_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emojis" ADD CONSTRAINT "Emojis_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
