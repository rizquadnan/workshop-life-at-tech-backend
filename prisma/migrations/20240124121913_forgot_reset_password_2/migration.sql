/*
  Warnings:

  - A unique constraint covering the columns `[email,passwordResetToken]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,passwordResetToken]` on the table `Trainer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Customer_email_passwordResetToken_idx" ON "Customer"("email", "passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_passwordResetToken_key" ON "Customer"("email", "passwordResetToken");

-- CreateIndex
CREATE INDEX "Trainer_email_passwordResetToken_idx" ON "Trainer"("email", "passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_email_passwordResetToken_key" ON "Trainer"("email", "passwordResetToken");
