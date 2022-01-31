/*
  Warnings:

  - A unique constraint covering the columns `[geo]` on the table `sectors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sectors_geo_key" ON "sectors"("geo");
