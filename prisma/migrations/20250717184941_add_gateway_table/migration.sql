-- CreateTable
CREATE TABLE "gateways" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "gateways_id_key" ON "gateways"("id");

-- CreateIndex
CREATE INDEX "gateways_is_active_idx" ON "gateways"("is_active");

-- CreateIndex
CREATE INDEX "gateways_type_idx" ON "gateways"("type");
