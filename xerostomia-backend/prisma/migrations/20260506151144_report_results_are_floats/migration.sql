/*
  Warnings:

  - Changed the type of `result1` on the `Report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `result2` on the `Report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `result3` on the `Report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `result4` on the `Report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "result1",
ADD COLUMN     "result1" DOUBLE PRECISION NOT NULL,
DROP COLUMN "result2",
ADD COLUMN     "result2" DOUBLE PRECISION NOT NULL,
DROP COLUMN "result3",
ADD COLUMN     "result3" DOUBLE PRECISION NOT NULL,
DROP COLUMN "result4",
ADD COLUMN     "result4" DOUBLE PRECISION NOT NULL;
