/*
  Warnings:

  - A unique constraint covering the columns `[trainerId,customerId]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exerciseStatus` to the `Exercises` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExerciseStatus" AS ENUM ('ACTIVE', 'PENDING', 'FINISHED');

-- AlterTable
ALTER TABLE "Exercises" ADD COLUMN     "exerciseStatus" "ExerciseStatus" NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Contract_trainerId_customerId_idx" ON "Contract"("trainerId", "customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_trainerId_customerId_key" ON "Contract"("trainerId", "customerId");
