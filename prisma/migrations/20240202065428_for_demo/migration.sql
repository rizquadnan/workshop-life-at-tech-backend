/*
  Warnings:

  - You are about to drop the column `exerciseStatus` on the `Exercises` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercises" DROP COLUMN "exerciseStatus";

-- DropEnum
DROP TYPE "ExerciseStatus";
