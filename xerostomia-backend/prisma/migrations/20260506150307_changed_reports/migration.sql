/*
  Warnings:

  - You are about to drop the column `result` on the `Report` table. All the data in the column will be lost.
  - Added the required column `file1` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file2` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file3` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file4` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result1` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result2` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result3` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result4` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result_total` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "result",
ADD COLUMN     "file1" TEXT NOT NULL,
ADD COLUMN     "file2" TEXT NOT NULL,
ADD COLUMN     "file3" TEXT NOT NULL,
ADD COLUMN     "file4" TEXT NOT NULL,
ADD COLUMN     "result1" TEXT NOT NULL,
ADD COLUMN     "result2" TEXT NOT NULL,
ADD COLUMN     "result3" TEXT NOT NULL,
ADD COLUMN     "result4" TEXT NOT NULL,
ADD COLUMN     "result_total" DOUBLE PRECISION NOT NULL;
