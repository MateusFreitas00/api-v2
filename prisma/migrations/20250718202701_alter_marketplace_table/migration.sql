/*
  Warnings:

  - You are about to drop the column `status` on the `marketplaces` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "marketplaces_status_idx";

-- AlterTable
ALTER TABLE "marketplaces" DROP COLUMN "status",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "marketplaces_is_active_idx" ON "marketplaces"("is_active");

-- CreateIndex
CREATE INDEX "marketplaces_created_at_idx" ON "marketplaces"("created_at");
