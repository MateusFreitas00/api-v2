-- AlterTable
ALTER TABLE "gateways" ADD CONSTRAINT "gateways_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "gateways_id_key";
