-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('ACTIVE', 'IN_ACTIVE');

-- DropIndex
DROP INDEX "Contract_trainerId_customerId_key";

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "contractStatus" "ContractStatus" NOT NULL DEFAULT 'ACTIVE';
