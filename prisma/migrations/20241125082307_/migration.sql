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
ALTER TABLE "todayHabitCheck" ADD CONSTRAINT "todayHabitCheck_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "todayHabit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
