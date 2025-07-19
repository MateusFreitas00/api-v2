-- CreateTable
CREATE TABLE "marketplaces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT,
    "parent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "marketplaces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "marketplaces_status_idx" ON "marketplaces"("status");

-- CreateIndex
CREATE INDEX "marketplaces_parent_id_idx" ON "marketplaces"("parent_id");

-- AddForeignKey
ALTER TABLE "marketplaces" ADD CONSTRAINT "marketplaces_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "marketplaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;
